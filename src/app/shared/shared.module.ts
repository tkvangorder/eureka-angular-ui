import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Environment } from './environment';
import { EnvironmentService } from './environment.service';
import { MessageService } from './message.service';
import { Message } from './message';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    EnvironmentService,
    MessageService
  ]
})
export class SharedModule { }
