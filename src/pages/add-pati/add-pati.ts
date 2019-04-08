import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from "../../providers/constant/constant";

// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-pati',
  templateUrl: 'add-pati.html',
})
export class AddPatiPage {
  // 表单
  bindUsrForm: FormGroup

  // 当前正在编辑的患者
  public currEditUsr: object = null
  // 当前操作类型
  public actType: string


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public Http:HttpClient,
    public Constant:ConstantProvider,
    public ss: SessionStorageProvider,
    public loadingCtrl: LoadingController
  ) {
    this.currEditUsr = navParams.get('usr')
    this.actType = navParams.get('type')

    this.bindUsrForm = new FormGroup({
      username: new FormControl(this.currEditUsr['username'], [Validators.required]),
      idCardNo: new FormControl(this.currEditUsr['idcard'], [Validators.required]),
      pId: new FormControl(this.currEditUsr['cardNo'], [Validators.required])
    })
  }



  ionViewWillEnter() {
    this.hideTabBar()
  }

  ionViewDidLeave() {
    this.showTabBar()
    this.currEditUsr = null
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

  loadingOpt = {
    create: (config: object) => {
      let loading = this.loadingCtrl.create(config)
      loading.present();

      return loading
    },
    dismiss: (obj) => {
      obj.dismiss()
      obj = null
    }
  }


  /**
   * 确定绑定
   */
  bind = function () {

    var loadIns = this.loadingOpt.create({
      content: this.actType == 'add' ?  '绑定中...' : '保存中...',
      showBackdrop: true
    })

    this.Http.post(this.Constant.BackstageUrl+'/wechat/patient/save',this.currEditUsr)
      .subscribe((res)=>{
        if(this.currEditUsr.type == '1') {
          this.ss.set('patientId', res.data.patientId)
          this.ss.set('defaultPati', res.data)
        }


        setTimeout(() => {
          this.loadingOpt.dismiss(loadIns)

          this.navCtrl.pop();
        }, 1500);
      }, (error) => {
        this.loadingOpt.dismiss(loadIns)
      });
  }


}
