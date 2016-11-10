import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Environment} from '../shared/environment';
import { EnvironmentService } from '../shared/environment.service';
import { MessageService } from '../shared/message.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']  
})
export class SearchBarComponent implements OnInit {

  constructor(environmentService:EnvironmentService, messageService:MessageService) {
    this.environmentService = environmentService;
    this.messageService = messageService;
  }

  ngOnInit() {
  }

  @Output() onSearch = new EventEmitter<SearchEvent>();
  searchEvent: SearchEvent = new SearchEvent();
  
  environmentService : EnvironmentService;
  messageService : MessageService;
  
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
    this.onSearch.emit(this.searchEvent);
    this.addAlert("Environment : " + this.searchEvent.environment + ", hostname = '" + this.searchEvent.hostname + "', applicationName= '" + this.searchEvent.applicationName, "info");
  }
}

export class SearchEvent {
  environment: string;
  hostname: string;
  applicationName: string;
}
