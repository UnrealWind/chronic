import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController,AlertController} from 'ionic-angular';
import { BindUserPage} from "../bind-user/bind-user";
import { BindDevicePage} from "../bind-device/bind-device";
import { DeviceListPage} from "../device-list/device-list";
import {BasicProvider} from "../../providers/basic/basic";
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from "../../providers/constant/constant";
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import * as $ from 'jquery';


@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  code; //获取code用于给后台换取access_token，openid等信息，这两个信息用于换取用户所有信息，这里官方文档说是安全级别较高，所以要在后台进行换取，不允许客户端进行请求
  userInfo; //这个东西就存放后台通过一些列操作返回的用户信息咯
  params; //账号绑定页面绑定信息
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private BasicProvider:BasicProvider,
              public Http:HttpClient,
              public Constant:ConstantProvider,
              public alertCtrl: AlertController,
              public api: ApiServiceProvider
              ) {
    this.params = {};

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

  ionViewDidEnter(): void {
    var that = this;
    this.code = this.BasicProvider.getQueryString('code');
    !this.code?(function () {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid='+ that.Constant.AppId +
        '&redirect_uri='+ that.Constant.redirect_url +
        '&response_type=code&' +
        'scope=snsapi_userinfo#wechat_redirect';
    })():(function () {
      that.userInfo = JSON.parse(sessionStorage.getItem('wechatUserInfo'))
      that.setPatientId()
    })()
  };

  setPatientId = function(){
    var that = this;
    var wechatUserInfo = JSON.parse(sessionStorage.getItem('wechatUserInfo'))
    that.params['openId'] = wechatUserInfo.openId;
    that.Http.get(that.Constant.BackstageUrl+'/wechat/patient/openid/'+wechatUserInfo.openId,{})
      .subscribe((res)=>{
        if(res.data != null) {
          that.params = res.data,sessionStorage.setItem('patientId',res.data.patientId)
          // 获取用户所在护理组
          that.getPatiGroup()
        } else {
          (function () {
            const alert = that.alertCtrl.create({
              title: '警告',
              subTitle: '请先进行账号绑定操作！',
              buttons: [{
                text: '前往绑定',
                handler: data => {
                  that.navCtrl.push(BindUserPage,{params:that.params})
                }
              }],
              enableBackdropDismiss: false
            });
            alert.present();
            return;
          })();
        }

        console.log(res.data)
      });
  }

  /**
   * 获取患者所在护理组
   */
  getPatiGroup = function() {
    var that = this;
    this.api.userInfo.getGroup()
        .subscribe((msg) => {
          that.setPatiGroup(msg.data[0])
        })
  }

  /**
   * 存储患者所在护理组
   */
  setPatiGroup = function(currGroup) {
    sessionStorage.setItem('currGroup', JSON.stringify(currGroup))
  }

  bind = function (type) {
    type == 'user'?this.navCtrl.push(BindUserPage,{params:this.params}):
      this.navCtrl.push(DeviceListPage)
  }
}
