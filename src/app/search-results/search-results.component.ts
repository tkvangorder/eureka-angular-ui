import { Component, OnInit } from '@angular/core';
import { EurekaDataService } from '../shared/eureka-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  constructor(
    private eurekaDataService:EurekaDataService) {
  }

  ngOnInit() {
  }
  public sort(expression:string) {
    this.eurekaDataService.setSortExpress(expression);
    this.eurekaDataService.fetchEurekaInstances();
  } 
}
