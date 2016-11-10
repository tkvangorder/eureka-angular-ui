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
 private application: string;

  constructor(private http: Http, private messageService: MessageService) {
    this.eurekaUrl = "/eureka/apps";
    this._eurekaInstances =  <BehaviorSubject<EurekaInstance[]>>new BehaviorSubject([]);        
  }

  public get eurekaInstances() {
    return this._eurekaInstances.asObservable();
  }

  public fetchEurekaInstances(environment: string, hostname:string, application:string) {
    this.environment = environment;
    this.hostname = hostname;
    this.application = application;

    let url = this.eurekaUrl;
    if (application != null && application.length > 0) {
      url = url + "/" + application;
    }
    let headers = new Headers({'Accept' : 'application/json'});
    this.http.get(this.eurekaUrl,{headers: headers}).map(this.extractData).subscribe(
      data => this.filterResults(data),
      error => this.handleError(error));
  }

  private filterResults(applications:any) {
    //Extract matching instances from each application:
    let instances = new Array<EurekaInstance>();
    applications.forEach(application => 
      instances = instances.concat(
        application.instance.filter(item => {
        if (this.environment != null && this.environment.length > 0) {
          if (item.metadata == null || item.metadata.environment == null || item.metadata.environment != this.environment) {
            //Environment does not match filter.
            return false;
          }
        }
        if (this.hostname != null && this.hostname.length > 0) {

          if (item.metadata == null || item.metadata.hostname == null || item.metadata.hostname != this.hostname) {
            return false;
          }
        }
        return true;
      }
      )));
    
    this._eurekaInstances.next(instances); 
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
