import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-exam-detail',
  templateUrl: 'exam-detail.html',
})
export class ExamDetailPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  back = function () {
    this.navCtrl.pop();
  }
}