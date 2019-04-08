import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { BindUserPage} from "../bind-user/bind-user";
import { DeviceListPage} from "../device-list/device-list";
import * as $ from 'jquery';

// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";


@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  private wechatUsrInfo: object
  private usrs: object[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private ss: SessionStorageProvider,
              public viewCtrl: ViewController) {

    $(function() {
      if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
          window.history.pushState('forward', null, '#');
          window.history.forward();
        });
      }
      window.history.pushState('forward', null, '#'); //在IE中必须得有这两行
      window.history.forward();
    })

  }

  ionViewWillEnter() {
    this.showTabBar()
  }

  /**
   * 页面初始，不是 ionic page 的生命周期
   */
  init(event) {
    this.usrs = event
    this.wechatUsrInfo = this.ss.get('wechatUsrInfo')
  }


  bind = function (type) {
    type == 'user'? this.navCtrl.push(BindUserPage,{
      usrs: this.usrs,
      openId: this.wechatUsrInfo['openId']
    }):
      this.navCtrl.push(DeviceListPage)
  }

  /**
   * 隐藏 tab 栏
   */
  hideTabBar(): void {
    var _tabNativeEle = this.viewCtrl._nav.parent._tabbar.nativeElement
    _tabNativeEle['hidden'] = true
  }

  /**
   * 显示 tab 栏
   */
  showTabBar(): void {
    var _tabNativeEle = this.viewCtrl._nav.parent._tabbar.nativeElement
    _tabNativeEle['hidden'] = false
  }
}
