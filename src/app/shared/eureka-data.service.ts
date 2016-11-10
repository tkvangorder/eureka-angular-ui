import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from './message.service';

@Injectable()
export class EurekaDataService {

  private eurekaUrl: string;

  constructor(private http: Http, private messageService: MessageService) {
    this.eurekaUrl = "http://eureka-test-1.build.internal:8761/eureka/apps";
  }

  public fetchEurekaInstances():Object[] {
    let headers = new Headers({'Accept' : 'application/json'});
    let instances:Object[];
    this.http.get(this.eurekaUrl,{headers: headers}).map(this.extractData).subscribe(
      data => instances = data,
      error => this.handleError(error));
    return instances;
  }

 private extractData(response: Response) {
    let body = response.json();
    return body.data || { };
  }

  private handleError (error: Response | any) {
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
