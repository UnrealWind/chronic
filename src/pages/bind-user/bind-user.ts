import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { HealthyIndexPage} from "../healthy-index/healthy-index";
import { UserInfoPage} from "../user-info/user-info";
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from "../../providers/constant/constant";


/*@IonicPage({
  segment:"bind-user",
})*/

@Component({
  selector: 'page-bind-user',
  templateUrl: 'bind-user.html',
})
export class BindUserPage {
  code; //获取code用于给后台换取access_token，openid等信息，这两个信息用于换取用户所有信息，这里官方文档说是安全级别较高，所以要在后台进行换取，不允许客户端进行请求
  userInfo; //这个东西就存放后台通过一些列操作返回的用户信息咯

  params;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Http:HttpClient,
              public viewCtrl: ViewController,
              public Constant:ConstantProvider,) {
      this.params = this.navParams.get('params')
      this.params.cardType = 1;
  }

  bind = function () {
    this.Http.post(this.Constant.BackstageUrl+'/wechat/patient/save',this.params)
      .subscribe((res)=>{
        sessionStorage.setItem('patientId',res.data.patientId);
        this.navCtrl.pop();
      });
  }


}
