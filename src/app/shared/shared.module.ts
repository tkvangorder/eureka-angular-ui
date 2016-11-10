import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentService } from './environment.service';
import { EurekaDataService } from './eureka-data.service';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    EnvironmentService,
    EurekaDataService,
    MessageService
  ]
})
export class SharedModule { }
