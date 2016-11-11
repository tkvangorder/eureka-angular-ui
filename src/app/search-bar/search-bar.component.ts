import { Component, OnInit } from '@angular/core';
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

  environment: string;
  hostname: string;
  applicationName: string;

  constructor(
    private environmentService:EnvironmentService,
    private messageService:MessageService,
    private eurekaDataService:EurekaDataService) {
      this.environment = "";
  }

  ngOnInit() {
    this.filterResults();
  }
  
  public closeAlert(i:number):void {
    this.messageService.closeAlert(i);
  }

  public addAlert(message: string, type: string):void {
    this.messageService.addAlert(message, type);
  }

  public filterResults() {
    this.eurekaDataService.setAndFetchEurekaInstances(this.environment, this.hostname, this.applicationName);
  }
  
}
