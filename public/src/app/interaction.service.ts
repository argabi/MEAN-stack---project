import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class InteractionService {

  private _loginSource = new Subject<any>();
  login$ = this._loginSource.asObservable();
  constructor() { }

  notify(data: any) {
    this._loginSource.next(data);
  }
}
