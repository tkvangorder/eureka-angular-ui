import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './message.service';
import { EurekaInstance } from './eureka-instance';

@Injectable()
export class EurekaDataService {

 private _eurekaInstances : BehaviorSubject<EurekaInstance[]>;

 private eurekaUrl: string;
 private environment: string;
 private hostname: string;
 private applicationName: string;

  constructor(private http: Http, private messageService: MessageService) {
    this.eurekaUrl = "/eureka/apps";
    this._eurekaInstances =  <BehaviorSubject<EurekaInstance[]>>new BehaviorSubject([]);        
  }

  public get eurekaInstances() {
    return this._eurekaInstances.asObservable();
  }

  public fetchEurekaInstances(environment: string, hostname:string, applicationName:string) {
    this.environment = environment;
    this.hostname = hostname;
    this.applicationName = applicationName;

    let headers = new Headers({'Accept' : 'application/json'});
    this.http.get(this.eurekaUrl,{headers: headers}).map(this.extractData).subscribe(
      data => this.filterResults(data),
      error => this.handleError(error));
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
          //Match if the eureka host name includes the host name the user has typed.
          if (item.metadata == null || item.metadata.localHostName == null ||
            !item.metadata.localHostName.toLowerCase().includes(this.hostname.toLowerCase())) {
            return false;
          }
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
        instance.environment = item.metadata.environment;
        if (item.metadata.localHostName != null) {
          instance.hostName = instance.hostName + " (" + item.metadata.localHostName + ")";
        }
        instance.version = item.metadata.version;
      }
      return instance;
    });


    this._eurekaInstances.next(filterInstances); 
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
