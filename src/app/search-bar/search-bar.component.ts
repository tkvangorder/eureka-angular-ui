import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Environment } from '../shared/model/Environment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']  
})
export class SearchBarComponent implements OnInit {

  @Output() onSearch = new EventEmitter<SearchEvent>();
  searchEvent: SearchEvent = new SearchEvent();

  environmentList : Environment[] = Environment.allEnvironment;

  public alerts:Array<Object> = [
    {
      type: 'info',
      message: 'Enter Criteria to find matching services.'
    }
  ];

  public closeAlert(i:number):void {
    this.alerts.splice(i, 1);
  }

  public addAlert(message: String, type: String):void {
    this.alerts.push({message: message, type: type, closable: true});
  }
  constructor() { }

  ngOnInit() {
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
