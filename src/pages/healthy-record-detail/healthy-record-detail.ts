import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckDetailPage} from "../check-detail/check-detail";
import { ExamDetailPage} from "../exam-detail/exam-detail";

@IonicPage()
@Component({
  selector: 'page-healthy-record-detail',
  templateUrl: 'healthy-record-detail.html',
})
export class HealthyRecordDetailPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }

  goDetail = function (mark) {
    mark == 'te'?this.navCtrl.push(CheckDetailPage):this.navCtrl.push(ExamDetailPage);
  }

  back = function () {
    this.navCtrl.pop();
  }

}
