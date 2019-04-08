import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { ConstantProvider} from "../../providers/constant/constant";

// service
import { UtilsProvider } from "../../providers/utils/utils";
// sessionStorage
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";

import { FormGroup, FormControl, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-bind-device',
  templateUrl: 'bind-device.html',
})
export class BindDevicePage {
  params;

  // 表单
  deviceForm: FormGroup

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Http:HttpClient,
              public Constant:ConstantProvider,
              public viewCtrl: ViewController,
              public ss: SessionStorageProvider,
              public load: LoadingController,
              public utils: UtilsProvider) {

    this.params = {
      deviceId:null,
      type:'利安',
      patientId:this.ss.get('patientId')
    }

    this.deviceForm = new FormGroup({
      deviceId: new FormControl(this.params['deviceId'], [Validators.required]),
    })
  }

  ionViewWillEnter() {
    this.hideTabBar()
  }


  bind = function () {
    var bindLoad = this.loadingOpt.create({
      content: '绑定中...'
    })

    this.Http.get(this.Constant.BackstageUrl+'/lian/save/corresponding/save?deviceId='+this.params.deviceId
    +'&type='+this.params.type+'&patientId='+this.params.patientId)
      .subscribe((res)=>{
        this.loadingOpt.dismiss(bindLoad)

        // 绑定成功或失败的提示文字
        var rstLoad = null

        if(this.utils.getSafe(() => res.status, null) == 'ok') {

          if(res.data == 0) {
            rstLoad = this.loadingOpt.create({
              content: '绑定成功！',
              duration: 1000
            })

            rstLoad.onDidDismiss(() => {
              this.navCtrl.pop();
            });
          } else {
            rstLoad = this.loadingOpt.create({
              content: '绑定失败！',
              duration: 1000
            })
          }
        } else {
          rstLoad = this.loadingOpt.create({
            content: '绑定失败！',
            duration: 1000
          })
        }
      }, (error) => {
        var rstLoad = null
        rstLoad = this.loadingOpt.create({
          content: '绑定失败！',
          duration: 1000
        })
      });
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

  /**
   * 创建 loading
   */
  loadingOpt = {
    create: (config: object) => {
      let loading = this.load.create(config)
      loading.present();

      return loading
    },
    dismiss: (obj) => {
      obj.dismiss()
      obj = null
    }
  }
}
