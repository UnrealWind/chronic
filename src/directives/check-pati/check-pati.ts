import { Directive, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {NavController, AlertController, ViewController} from 'ionic-angular';
// app 常量
import { ConstantProvider } from '../../providers/constant/constant';
// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";
import { BasicProvider } from "../../providers/basic/basic";

// page
import { AddPatiPage } from '../../pages/add-pati/add-pati';

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

  constructor(openId: string) {
    this.openId = openId
    this.type = '1'
  }
}


@Directive({
  selector: 'check-pati'
})
export class CheckPatiDirective {
  // 检查通过触发父 component 的主逻辑
  @Output() checkPassed = new EventEmitter()

  // 获取code用于给后台换取access_token，openid等信息，这两个信息用于换取用户所有信息，这里官方文档说是安全级别较高，所以要在后台进行换取，不允许客户端进行请求
  private code: string

  // 微信账户信息
  public wechatUsrInfo: object

  constructor(
    public http: HttpClient,
    public constant: ConstantProvider,
    public BasicProvider: BasicProvider,
    public ss: SessionStorageProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public viewCtrl: ViewController
  ) {
    this.main()
  }

  main() {
    this.code = this.BasicProvider.getQueryString('code');

    // 没有 code 跳转获取 code
    if(!this.code) {
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.constant.AppId}&redirect_uri=${this.constant.redirect_url}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
      return
    }

    // 检查是否缓存过微信用户信息
    if(this.ss.get('wechatUsrInfo')) {
      this.wechatUsrInfo = this.ss.get('wechatUsrInfo')
      this.doGetUsrBindedPatis()
    } else {
      this.getUsrWechatInfo(this.code)
        .subscribe((msg) => {
          if(msg) {
            this.wechatUsrInfo = msg
            this.ss.set('wechatUsrInfo', msg)
            this.doGetUsrBindedPatis()
          } else {
            let alert = this.alertCtrl.create({
              title: '获取微信用户信息失败！',
              enableBackdropDismiss: false,
              subTitle: '无法获取当前微信账户信息，可重新尝试。',
              buttons: [
                {
                  text: '重试',
                  handler: () => {
                    this.main()
                  }
                }
              ]
            });
            alert.present();
            alert = null
          }

        }, (error) =>  {
          let alert = this.alertCtrl.create({
            title: '获取微信用户信息失败！',
            enableBackdropDismiss: false,
            subTitle: '无法获取当前微信账户信息，可重新尝试。',
            buttons: [
              {
                text: '重试',
                handler: () => {
                  this.main()
                }
              }
            ]
          });
          alert.present();
          alert = null

          return
        })
    }
  }

  /**
   * 执行 getUsrBindedPatis()
   * 之所以由嵌套一层是因为起初 getUsrBindedPatis 是写在 api service 里的，但是现在为了将 check-pati 的逻辑封装在一起，于是迁移到了这个文件
   * 因为有多处调用 getUsrBindedPatis ，故又嵌套了一层
   */
  doGetUsrBindedPatis() {
    // 利用获取到的微信用户的 openId 来检验当前微信用户名下是否存在绑定的病人
    this.getUsrBindedPatis(this.wechatUsrInfo['openId'])
    .subscribe((msg) => {
      if(msg === null) {
        let alert = this.alertCtrl.create({
          title: '未绑定患者',
          subTitle: '检测到当前微信账户未绑定过患者，请先绑定！',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: '前往绑定',
              handler: () => {
                this.navCtrl.push(AddPatiPage, {
                  type: 'add',
                  usr: new PatientInfo(this.wechatUsrInfo['openId'])
                })
              }
            }
          ],
        });

        alert.present();
        alert = null
      } else if(msg.length > 0) {
        // 设置当前选中患者
        var defaultPati = null
        msg.forEach((ele) => {
          if(ele.type == '1') {
            defaultPati = ele
            this.ss.set('patientId', ele.patientId)
            this.ss.set('defaultPati', ele)
          }
        })
        this.checkPassed.emit(msg)
      }
    }, (error) => {
      let alert = this.alertCtrl.create({
        title: '获取患者信息错误！',
        enableBackdropDismiss: false,
        buttons: ['确定']
      });
      alert.present();
      alert = null

      return
    })
  }



  /**
   * 获取当前微信用户的用户信息
   * @param wechatCode 微信验证码，连接的第一个参数 ?code = 132#
   */
  getUsrWechatInfo<T>(wechatCode: string): Observable<any> {
    var obs = new Observable((observe) => {
      this.http.get(`${this.constant.BackstageUrl}/wechat/oauth2/get/user?code=${wechatCode}`)
        .subscribe(function success(msg) {
          if(msg['status'] === 'ok') observe.next(msg['data'] as T[])
          else if(msg['status'] === 'blank') observe.next(null)
          else observe.error('请求出错了')
        }, function(error) {
          observe.error('请求出错了')
        })
    })

    return obs
  }

  /**
   * 获取当前微信账户下绑定的患者基本信息
   * @param wechatOpenId  wechatInfo 中的 openId
   */
  getUsrBindedPatis<T>(wechatOpenId: string): Observable<any> {
    var obs = new Observable((observe) => {
      this.http.get(`${this.constant.BackstageUrl}/wechat/patient/openid/${wechatOpenId}`)
        .subscribe(function success(msg) {
          if(msg['status'] === 'ok') observe.next(msg['data'] as T[])
          else if(msg['status'] === 'blank') observe.next(null as T)
          else observe.error('请求出错了')
        }, function error() {
          observe.error('请求出错了')
        })
    })

    return obs
  }
}
