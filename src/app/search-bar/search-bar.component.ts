import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']  
})
export class SearchBarComponent implements OnInit {

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

}
