import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageAlert } from '../shared/message-alert';

@Injectable()
export class MessageService {

  private _messages : BehaviorSubject<MessageAlert[]>;
  constructor() {
    this._messages =  <BehaviorSubject<MessageAlert[]>>new BehaviorSubject([]);
  }

  public get currentMessages() {
    return this._messages.asObservable();
  }

  public addAlert(message: string, type: string):void {
    var messages:MessageAlert[] = this._messages.getValue(); 
    messages.push(new MessageAlert(message, type, true));
    this._messages.next(messages);
  }

  public closeAlert(i:number):void {
    var messages:MessageAlert[] = this._messages.getValue(); 
    messages.splice(i, 1);
    this._messages.next(messages);
  }
}
