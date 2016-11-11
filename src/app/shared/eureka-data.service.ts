import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './message.service';
import { EurekaInstance } from './eureka-instance';

@Injectable()
export class EurekaDataService {

  public static SORT_EXPRESSION_ENVIRONMENT:string = 'environment';
  public static SORT_EXPRESSION_APPLICATION:string = 'application';
  public static SORT_EXPRESSION_HOSTNAME:string = 'hostname';
  

 private _eurekaInstances : BehaviorSubject<EurekaInstance[]>;

 private eurekaUrl: string;
 private environment: string;
 private hostname: string;
 private applicationName: string;

 sortExpression: string;


  constructor(private http: Http, private messageService: MessageService) {
    this.eurekaUrl = "/eureka/apps";
    this._eurekaInstances =  <BehaviorSubject<EurekaInstance[]>>new BehaviorSubject([]);
    this.sortExpression="environment:A";
  }

  public get eurekaInstances() {
    return this._eurekaInstances.asObservable();
  }

  //No magic here, just brute force.
  public setSortExpress(expression:string) {
    //if the existing expression contains the one passed in, we are just flipping between ascending/descending.
    if (this.sortExpression == expression + ":A") {
      this.sortExpression = expression + ":D";
    } else {
      this.sortExpression = expression + ":A";
    }
  }

  public setAndFetchEurekaInstances(environment: string, hostname:string, applicationName:string) {
    //There is a probably a better way to do this with closures, admittedly I am a JS/Typescript rookie.
    this.environment = environment;
    this.hostname = hostname;
    this.applicationName = applicationName;
    this.fetchEurekaInstances();
  }

  public fetchEurekaInstances() {
    //Set the accept to JSON, otherwise this call will return us XML. bleh.
    let headers = new Headers({'Accept' : 'application/json'});

    //This makes the actual rest call, "extractData()" just parses the response to json.
    //Once the response is returned, either the "filterResults()" or "handleError()" method are called.
    this.http.get(this.eurekaUrl,{headers: headers})
      .map(this.extractData).subscribe(
        data => this.filterResults(data),
        error => this.handleError(error)
      );
  }

  private filterResults(applications:any) {
    //Extract matching instances from each application:
    let instances = new Array<any>();
    applications.forEach(application => 
      instances = instances.concat(
        application.instance.filter(item => {
        if (this.environment != null && this.environment.length > 0) {
          if (item.metadata == null || item.metadata.environment == null || item.metadata.environment.toLowerCase() != this.environment) {
            //Environment does not match filter.
            return false;
          }
        }
        if (this.applicationName != null && this.applicationName.length > 0) {
          //Match if the application name includes the name the user has typed.
          if (item.app == null ||
            !item.app.toLowerCase().includes(this.applicationName.toLowerCase())) {
            return false;
          }
        }
        if (this.hostname != null && this.hostname.length > 0) {
          //This will match against both the instance hostname and the localHostName in the metadata.
          if (item.hostName != null && item.hostName.toLowerCase().includes(this.hostname.toLowerCase())) {
            return true;
          }
          if (item.metadata != null && item.metadata.localHostName != null &&
            item.metadata.localHostName.toLowerCase().includes(this.hostname.toLowerCase())) {
            return true;
          }
          return false;
        }
        return true;
      }
      )));
    
    //We map the instance stucture returned from Eureka into a flattened structure to make it easier to work with.
    let filterInstances:Array<EurekaInstance> = instances.map(item => {
      let instance:EurekaInstance = new EurekaInstance();

      instance.applicationName =item.app;
      instance.instanceId = item.instanceId;
      instance.hostName = item.hostName;
      instance.ipAddress = item.ipAddr;
      instance.homePageUrl = item.homePageUrl;
      instance.statusPageUrl = item.statusPageUrl;
      instance.healthCheckUrl = item.healthCheckUrl;
      if (item.metadata != null) {
        if (item.metadata.localHostName != null) {
          instance.hostName = instance.hostName + " (" + item.metadata.localHostName + ")";
        }
        if (item.metadata.environment != null) {
          instance.environment = item.metadata.environment;
        } 
        if (item.metadata.version != null) {
          //encode version into environment.
          if (instance.environment != null) {
            instance.environment = instance.environment + " (" + item.metadata.version + ")";
          } 
          instance.version = item.metadata.version;
        }
      }
      return instance;
    });

    //Finally, lets sort.
    if (this.sortExpression.endsWith(":D")) {
      filterInstances = filterInstances.sort(this.sortResults.bind(this)).reverse();
    } else {
      filterInstances = filterInstances.sort(this.sortResults.bind(this));      
    }

    this._eurekaInstances.next(filterInstances); 
  }

  private sortResults(instance1: EurekaInstance, instance2: EurekaInstance):number {
    let value1: string;
    let value2: string;
    let secondary1: string;
    let secondary2: string;
    if (this.sortExpression.includes(EurekaDataService.SORT_EXPRESSION_ENVIRONMENT)) {
      value1 = instance1.environment;
      value2 = instance2.environment;
      secondary1 = instance1.applicationName;
      secondary2 = instance2.applicationName;
    } else if (this.sortExpression.includes(EurekaDataService.SORT_EXPRESSION_APPLICATION)) {
      value1 = instance1.applicationName;
      value2 = instance2.applicationName; 
      secondary1 = instance1.environment;
      secondary2 = instance2.environment;
    } else {
      //Sort by hostname.
      value1 = instance1.hostName;
      value2 = instance2.hostName;
      secondary1 = instance1.environment;
      secondary2 = instance2.environment;      
    }

    if (value1 != null && (value2 == null || value1 < value2)) {
      return -1;
    } else if (value2 != null && (value1 == null || value1 > value2)) {
      return 1;
    }

    return secondary1 == secondary2? 0 : secondary1 < secondary2? -1 : 1;
  }
  private extractData(response: Response) {
    let body = response.json();
    return body.applications.application || { };
  }

  private handleError (error: Response | any):Observable<{}> {
    // In a real world app, we might use a remote logging infrastructure
    let errorMessage: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errorMessage = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errorMessage = error.message ? error.message : error.toString();
    }
    this.messageService.addAlert(errorMessage, "error");
    return Observable.throw(errorMessage);
  }
  
}
