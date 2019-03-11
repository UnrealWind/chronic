import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HealthyInputPage} from "../healthy-input/healthy-input";

@IonicPage()
@Component({
  selector: 'page-healthy-record',
  templateUrl: 'healthy-record.html',
})
export class HealthyRecordPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

  goHealthyInput = function () {
    this.navCtrl.push(HealthyInputPage);
  }

  back = function () {
    this.navCtrl.pop();
  }
}
