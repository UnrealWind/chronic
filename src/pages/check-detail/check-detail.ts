import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from '../../providers/constant/constant';

@IonicPage()
@Component({
  selector: 'page-check-detail',
  templateUrl: 'check-detail.html',
})
export class CheckDetailPage {

  // 页面展示的数据
  detailData = null


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Http:HttpClient,
    public Constant:ConstantProvider
  ) {
    this.detailData = this.navParams.get('data')
  }



  /**
   * 返回
   */
  back = function () {
    this.navCtrl.pop();
  }
}
