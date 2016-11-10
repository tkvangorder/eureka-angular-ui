import { Injectable } from '@angular/core';
import { SharedModule } from './shared.module';
import { Environment } from './environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class EnvironmentService {

  private _allEnvironments : BehaviorSubject<Environment[]>;

  constructor() {
     this._allEnvironments =  <BehaviorSubject<Environment[]>>new BehaviorSubject(
       [{value:"", display:"All"},
        {value:"local", display:"Local"},
        {value:"dev", display:"Development"},
        {value:"qa", display:"QA"},
        {value:"test", display:"Test"},
        {value:"train", display:"Training"},
        {value:"staging", display:"Staging"},
        {value:"sandbox", display:"Sandbox"},
        {value:"production", display:"Production"}]
    );
  }

  public get allEnvironments() {
    return this._allEnvironments.asObservable();
  }
}
