import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgAlertService, IMessage, CloseType } from '@theo4u/ng-alert';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'realtimeNgTable';
  message: IMessage;
  private _alertsub: Subscription;
  closeTypes = CloseType;

  constructor(private _ngAlert: NgAlertService) {}
  ngOnInit() {
    this._alertsub = this._ngAlert.getSource().subscribe(message => {
      this.message = message;
    });
  }
  ngOnDestroy() {
    this._alertsub.unsubscribe();
  }
}
