import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController, ItemSliding, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from "../../providers/constant/constant";

// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";
import { ApiServiceProvider } from "../../providers/api-service/api-service";
// page
import { AddPatiPage } from '../add-pati/add-pati';



// 患者信息
class PatientInfo {
  id: number = null
  openId: string
  name: string = null
  idcard: number = null
  cardType: number = 1
  cardNo: number = null
  xlPatientId: string = null
  xlVisitId: string = null
  patientId: string = null
  type: string = null

  constructor(openId: string, type: string) {
    this.openId = openId
    this.type = type
  }
}

@Component({
  selector: 'page-bind-user',
  templateUrl: 'bind-user.html',
})
export class BindUserPage {
  // 上个页面带过来的已绑定账户信息
  usrs: object[]

  // 当前微信用户的 openId
  wechatUsrOpenId: string

  // 当前操作的患者
  currAccount: object

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public Http:HttpClient,
              public Constant:ConstantProvider,
              public ss: SessionStorageProvider,
              public viewCtrl: ViewController,
              public api: ApiServiceProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {

      this.wechatUsrOpenId = this.ss.get('wechatUsrInfo')['openId']
  }

  ionViewDidEnter() {
    this.getPatis(this.wechatUsrOpenId)
  }

  getPatis(wechatOpenId: string) {
    this.Http.get(`${this.Constant.BackstageUrl}/wechat/patient/openid/${wechatOpenId}`)
      .subscribe((msg) => {
        if(msg['status'] === 'ok') {
          this.usrs = msg['data']

          this.usrs.forEach((ele) => {
            // 设置当前选中的用户
            if(ele['type'] == '1') {
              this.currAccount = ele

              this.ss.set('patientId', ele['patientId'])
              this.ss.set('defaultPati', ele)
            }
          })
        }
        else if(msg['status'] === 'blank') {
          this.usrs = []
          this.currAccount = new PatientInfo(this.wechatUsrOpenId, '1')
        }
      }, (error) => {

      })
  }

  /**
   * 设为默认
   * @param usr 选中的患者
   */
  setAsDefault(usr: object): void {
    // 如果当前点击的已经是选中状态，则 return
    if(usr['type'] == '1') {
      let toast = this.toastCtrl.create({
        message: '已经是默认患者，无需切换。',
        duration: 1000,
        position: 'top'
      });

      toast.present();
      return
    }

    let loading = this.loadingCtrl.create({
      content: '切换用户中...'
    });

    loading.present()

    // 获取方案组
    this.api.userInfo.getGroup()
      .subscribe({
        next: (msg) => {
          this.ss.set('currGroup', msg['data'][0])
          // 通知后台更改当前操作用户
          this.doSetDefault(usr['patientId'], loading, usr)
        }
      })
  }

  /** 将当前设置的用户信息传给后台，更改 type 标示，
   * 返回的最新数据更新 usrs
   * 更新 currAccount
   */
  doSetDefault(pId, loading, usr) {
    var openId = this.wechatUsrOpenId
    var pId = pId

    this.api.userInfo.doSetDefault({
      pId: pId,
      openId: openId
    })
    .subscribe({
      next: (msg) => {
        loading.dismiss()
        this.currAccount = usr
        this.usrs = msg

        this.ss.set('patientId', pId)
        this.ss.set('defaultPati', this.currAccount)
      },
      error: (error) => {
        loading.dismiss()
      }
    })
  }




  /**
   * 添加患者
   */
  addUsr(): void {
    this.navCtrl.push(AddPatiPage, {
      type: 'add',
      usr: new PatientInfo(this.wechatUsrOpenId, '0')
    })
  }

  /**
   * 查看患者资料
   * @param usr 患者实体
   * @param event 事件
   */
  viewUsr(usr: object, silde: ItemSliding): void {
    silde.close()


    this.navCtrl.push(AddPatiPage, {
      type: 'view',
      usr: usr
    })
  }


  /**
   * 删除已有患者
   */
  deleUsr(usr: object,  silde: ItemSliding): void {
    silde.close()

    this.presentConfirm({
      title: '确认删除当前患者吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
        },
        {
          text: '删除',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: '删除中...'
            })

            loading.present()

            this.Http.get(`${this.Constant.BackstageUrl}/wechat/patient/delete/user/${usr['id']}`)
              .subscribe((msg) => {
                if(msg['status'] == 'ok') {
                  loading.dismiss()

                  if(msg['data'] == '1') {
                    // 删除失败
                    this.presentConfirm({
                      title: '删除失败',
                      buttons: [
                        {
                          text: '确认',
                          role: 'cancel',
                        }
                      ]
                    })
                  } else if(msg['data'] == '0') {
                    this.usrs.forEach((ele, ind) => {
                      if(usr['id'] == ele['id']) this.usrs.splice(ind, 1)
                    })

                    // 删除成功
                    this.presentConfirm({
                      title: '删除成功',
                      enableBackdropDismiss: false,
                      buttons: [
                        {
                          text: '确认'
                        }
                      ]
                    })
                  } else {
                    // 删除失败
                    this.presentConfirm({
                      title: '删除失败',
                      buttons: [
                        {
                          text: '确认',
                          role: 'cancel',
                        }
                      ]
                    })
                  }
                }
              }, (error) => {
                loading.dismiss()

                // 删除失败
                this.presentConfirm({
                  title: '删除失败',
                  buttons: [
                    {
                      text: '确认',
                      role: 'cancel',
                    }
                  ]
                })
              })
          }
        }
      ]
    })
  }

  /**
   * 确认 alert
   */
  presentConfirm(config) {
    let alert = this.alertCtrl.create(config);
    alert.present();
  }
}
