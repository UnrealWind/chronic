import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-time-clock',
  templateUrl: 'time-clock.html',
})
export class TimeClockPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  save = function () {
    this.navCtrl.pop();
  }


}
