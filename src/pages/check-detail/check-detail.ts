import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-check-detail',
  templateUrl: 'check-detail.html',
})
export class CheckDetailPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  back = function () {
    this.navCtrl.pop();
  }
}
