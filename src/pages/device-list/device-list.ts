import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { ConstantProvider} from "../../providers/constant/constant";
import { BindDevicePage} from "../bind-device/bind-device";

@IonicPage()
@Component({
  selector: 'page-device-list',
  templateUrl: 'device-list.html',
})
export class DeviceListPage {
  list;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Http:HttpClient,
              public Constant:ConstantProvider,) {
    //this.getDeviceList()
  }

  ionViewDidEnter(){
    this.getDeviceList();
  }

  getDeviceList = function () {
    var that = this;
    this.params = {
      patientId:sessionStorage.getItem('patientId')
    }

    this.Http.get(this.Constant.BackstageUrl+'/lian/save/corresponding/get?patientId='+this.params.patientId,)
      .subscribe((res)=>{
        that.list = res.data
      });
  }

  newBind = function () {
    this.navCtrl.push(BindDevicePage);
  }

  back = function () {
    this.navCtrl.pop();
  }

}
