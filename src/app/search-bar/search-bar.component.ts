import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Environment} from '../shared/environment';
import { EnvironmentService } from '../shared/environment.service';
import { MessageService } from '../shared/message.service';
import { EurekaDataService } from '../shared/eureka-data.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']  
})
export class SearchBarComponent implements OnInit {

  constructor(
    private environmentService:EnvironmentService,
    private messageService:MessageService,
    private eurekaDataService:EurekaDataService) {
  }

  ngOnInit() {
  }

  @Output() onSearch = new EventEmitter<SearchEvent>();
  searchEvent: SearchEvent = new SearchEvent();
  
  public alerts:Array<Object> = [
    {
      type: 'info',
      message: 'Enter Criteria to find matching services.'
    }
  ];

  public closeAlert(i:number):void {
    this.messageService.closeAlert(i);
  }

  public addAlert(message: string, type: string):void {
    this.messageService.addAlert(message, type);
  }

  public filterResults() {
    this.addAlert("Environment : " + this.searchEvent.environment + ", hostname = '" + this.searchEvent.hostname + "', applicationName= '" + this.searchEvent.applicationName, "info");
    let instances:Object[] = this.eurekaDataService.fetchEurekaInstances();
  }
}

export class SearchEvent {
  environment: string;
  hostname: string;
  applicationName: string;
}
