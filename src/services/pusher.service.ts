import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private API_KEY = '3ff98b89708f3eacd841';
  private CLUSTER = 'eu';
  private _pusher: any;

  constructor() {
    this._pusher = new Pusher(this.API_KEY, {
      cluster: this.CLUSTER,
      encrypted: true
    });
  }
  // any time it is needed we simply call this method
  getPusher() {
    return this._pusher;
  }
}
