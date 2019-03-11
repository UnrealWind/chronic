import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { ConstantProvider} from "../../providers/constant/constant";

@IonicPage()
@Component({
  selector: 'page-bind-device',
  templateUrl: 'bind-device.html',
})
export class BindDevicePage {
  params;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Http:HttpClient,
              public Constant:ConstantProvider,) {

    this.params = {
      deviceId:null,
      type:'利安',
      patientId:sessionStorage.getItem('patientId')
    }
  }

  bind = function () {
    this.Http.get(this.Constant.BackstageUrl+'/lian/save/corresponding/save?deviceId='+this.params.deviceId
    +'&type='+this.params.type+'&patientId='+this.params.patientId)
      .subscribe((res)=>{
        this.navCtrl.pop();
      });
  }
}
