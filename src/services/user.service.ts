import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PusherService } from './pusher.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/interfaces/iuser';

import { map, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private channel: any;
  private endPoint = 'http://localhost:2000/user';
  constructor(private http: HttpClient, private _pusherService: PusherService) {
    this.channel = this._pusherService.getPusher().subscribe('user');
  }
  getChannel() {
    return this.channel;
  }

  list(): Observable<IUser[]> {
    return this.http.get(this.endPoint).pipe(map(res => <IUser[]>res));
  }

  create(params: IUser): Observable<IUser> {
    return this.http
      .post(this.endPoint, params)
      .pipe(map(res => <IUser>res));
  }
  delete(user: IUser): Observable<IUser> {
    return this.http
      .delete(`${this.endPoint}/${user.id}`)
      .pipe(mapTo(user));
  }
}
