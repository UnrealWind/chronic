import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HealthHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-health-history',
  templateUrl: 'health-history.html'
})
export class HealthHistoryPage {
  historyList: object[] = null
  // 历史记录的类型
  currHisType: number | string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    this.historyList = this.navParams.data.data.length == 0 ? null : this.navParams.data.data
    this.currHisType = this.navParams.data.index
  }

  ionViewDidLoad() {

  }
}
