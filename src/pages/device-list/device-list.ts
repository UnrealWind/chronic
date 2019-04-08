import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { ConstantProvider} from "../../providers/constant/constant";
import { BindDevicePage} from "../bind-device/bind-device";

// service
import { UtilsProvider } from "../../providers/utils/utils";

// sessionStorage
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";
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
              public Constant:ConstantProvider,
              public viewCtrl: ViewController,
              public ss: SessionStorageProvider,
              public load: LoadingController,
              public utils: UtilsProvider) {
  }

  ionViewWillEnter() {
    this.hideTabBar()
    this.getDeviceList();
  }

  getDeviceList = function () {
    var that = this;
    this.params = {
      patientId:this.ss.get('patientId')
    }

    this.Http.get(this.Constant.BackstageUrl+'/lian/save/corresponding/get?patientId='+this.params.patientId,)
      .subscribe((res)=>{
        that.list = res.data
      });
  }

  /**
   * 删除设备
   * @param opt 设备实体
   */
  deleDevice = function(opt) {
    var pati_id = this.ss.get('defaultPati')['id']
    var patiId = this.ss.get('patientId')
    var deviceType = null

    var bindLoad = this.loadingOpt.create({
      content: '删除中...'
    })

    // 1 利安 0 呼吸家
    switch(opt.type) {
      case '呼吸家':
        deviceType = 0
        break
      case '利安':
        deviceType = 1
        break
    }

    this.Http.get(`${this.Constant.BackstageUrl}/wechat/patient/delete/${pati_id}/${patiId}/${deviceType}`)
      .subscribe((res)=>{
        this.loadingOpt.dismiss(bindLoad)

        // 删除成功或失败的提示文字
        var rstLoad = null

        if(this.utils.getSafe(() => res.status, null) == 'ok') {

          if(res.data == 0) {
            rstLoad = this.loadingOpt.create({
              content: '删除成功！',
              duration: 1000
            })

            rstLoad.onDidDismiss(() => {
              this.getDeviceList()
            });
          } else {
            rstLoad = this.loadingOpt.create({
              content: '删除失败！',
              duration: 1000
            })
          }
        } else {
          rstLoad = this.loadingOpt.create({
            content: '删除失败！',
            duration: 1000
          })
        }
      }, (error) => {
        this.loadingOpt.dismiss(bindLoad)

        var rstLoad = null
        rstLoad = this.loadingOpt.create({
          content: '删除失败！',
          duration: 1000
        })
      });
  }


  newBind = function () {
    this.navCtrl.push(BindDevicePage);
  }

  back = function () {
    this.navCtrl.pop();
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
