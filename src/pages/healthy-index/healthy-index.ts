import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController ,AlertController} from 'ionic-angular';
import { HealthyRecordPage} from "../healthy-record/healthy-record";
import { BindUserPage} from "../bind-user/bind-user";
import { TimeClockPage} from "../time-clock/time-clock";
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from "../../providers/constant/constant";
import {BasicProvider} from "../../providers/basic/basic";
import { ApiServiceProvider } from "../../providers/api-service/api-service"
import * as $ from 'jquery';
// 页面
import { HealthHistoryPage } from "../health-history/health-history";

// 引入返回数据的类型定义
import { common } from '../../api-data-struc/api-data-struc'


@IonicPage()
@Component({
  selector: 'page-healthy-index',
  templateUrl: 'healthy-index.html',
})
export class HealthyIndexPage {
  code; //获取code用于给后台换取access_token，openid等信息，这两个信息用于换取用户所有信息，这里官方文档说是安全级别较高，所以要在后台进行换取，不允许客户端进行请求
  userInfo; //这个东西就存放后台通过一些列操作返回的用户信息咯
  params; //账号绑定页面绑定信息

  info;

  // 健康数据
  healthDatas: object[] = null
  // 患者当天个体化方案计划执行情况
  healthPlan: object[] = null
  fixedHealthPlan: object = {}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public load: LoadingController,
    public http:HttpClient,
    public Constant:ConstantProvider,
    private BasicProvider:BasicProvider,
    public api: ApiServiceProvider,
    public totast: ToastController
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
      if(sessionStorage.getItem('wechatUserInfo')) {
        that.userInfo = JSON.parse(sessionStorage.getItem('wechatUserInfo'))
        that.setPatientId();
      } else {
        that.getUserInfo()
      }
    })()
  };

  ionViewDidLeave() {
    // 清除缓存数据
    this.code = null; //获取code用于给后台换取access_token，openid等信息，这两个信息用于换取用户所有信息，这里官方文档说是安全级别较高，所以要在后台进行换取，不允许客户端进行请求
    this.userInfo = null //这个东西就存放后台通过一些列操作返回的用户信息咯
    this.params = {} //账号绑定页面绑定信息

    this.info = null

    // 健康数据
    this.healthDatas = null
    // 患者当天个体化方案计划执行情况
    this.healthPlan = null
    this.fixedHealthPlan = {}
  }

  getUserInfo = function () {
    var that = this;
    this.http.get(this.Constant.BackstageUrl+'/wechat/oauth2/get/user?code='+this.code,{})
      .subscribe((res)=>{
        that.userInfo  = res.data;
        sessionStorage.setItem('wechatUserInfo', JSON.stringify(res.data))
        that.setPatientId();
        console.log(that.userInfo)

      });
  }

  setPatientId = function(){
    var that = this;
    that.params['openId'] = that.userInfo.openId;
    that.http.get(that.Constant.BackstageUrl+'/wechat/patient/openid/'+that.userInfo.openId,{})
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

          // 获取用户信息
          this.getInfo();
          // 获取患者当天个体化方案计划执行情况
          this.getCustomPlan()
        })
  }

  /**
   * 存储患者所在护理组
   */
  setPatiGroup = function(currGroup) {
    sessionStorage.setItem('currGroup', JSON.stringify(currGroup))
  }


  goHealthyRecord = function () {
    this.navCtrl.push(HealthyRecordPage)
  }

  goTimeClock = function () {
    this.navCtrl.push(TimeClockPage)
  }

  /**
   * 获取健康数据
   */
  getInfo = function(){
    this.http.get(this.Constant.BackstageUrl+'/lian/save/data/'+sessionStorage.getItem('patientId'),this.params)
      .subscribe((res)=>{
        //这里强行校验一下
        res.data == '{}' || res.data =='' ?res.data = null:'';
        this.info = res.data

        // 渲染健康数据用的模板数据
        this.healthDatas = [
          [
            { // 身体
              index: 6,
              type: 0,
              title: {
                icon: 'ios-american-football-outline',
                txt: '身体',
              },
              subTitle: [
                {
                  type: 0,
                  txt: 'BMI',
                  val: this.info.bodyIndex.bmi
                }
              ],
              detail: {
                txt: this.info.bodyIndex.bmiLevel,
                color: '#ccc'
              }
            },
            { // 血压
              index: 1,
              type: 0,
              title: {
                icon: 'ios-heart-outline',
                txt: '血压',
              },
              subTitle: [
                {
                  type: 0,
                  txt: 'H',
                  val: this.info.bloodPressure.highValue
                },
                {
                  type: 0,
                  txt: 'L',
                  val: this.info.bloodPressure.lowValue
                }
              ],
              detail: {
                txt: this.info.bloodPressure.level,
                color: '#ccc'
              }
            },
            { // 心率
              index: 10,
              type: 0,
              title: {
                icon: 'ios-pulse-outline',
                txt: '心率',
              },
              subTitle: [
                {
                  type: 1,
                  txt: '次/分',
                  val: this.info.ecg.heartRate
                }
              ],
              detail: {
                txt: this.info.ecg.levelName,
                color: 'red'
              }
            },
          ],
          [
            { // 血氧
              index: 9,
              type: 0,
              title: {
                icon: 'logo-octocat',
                txt: '血氧',
              },
              subTitle: [
                {
                  type: 1,
                  txt: '%',
                  val: this.info.bloodOxygen.spoValue
                }
              ],
              detail: null
            },
            { // 血脂
              index: 7,
              type: 0,
              title: {
                icon: 'ios-jet-outline',
                txt: '血脂',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.info.bloodFat.level
                }
              ],
              detail: null
            },
            { // 温度
              index: 14,
              type: 0,
              title: {
                icon: 'ios-football-outline',
                txt: '温度',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.info.temperature.bodyTemperature
                }
              ],
              detail: null
            },
          ],
          [
            { // Fev1
              index: 0,
              type: 0,
              title: {
                icon: 'ios-alert-outline',
                txt: 'Fev1',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.info.fev1Value
                }
              ],
              detail: null
            },
            { // Fvc
              index: 0,
              type: 0,
              title: {
                icon: 'ios-aperture-outline',
                txt: 'Fvc',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.info.fvcValue
                }
              ],
              detail: null
            },
            { // Pef
              index: 0,
              type: 0,
              title: {
                icon: 'ios-clipboard-outline',
                txt: 'Pef',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.info.pefValue
                }
              ],
              detail: null
            },
          ],
        ]
      });
  }

  /**
   * 获取健康数据的历史记录
   * @param item
   */
  getHealthHistory(item) {
    if(item.index === 0) return
    else {
      let loading = this.load.create({
        content: '获取历史记录中...'
      });

      loading.present();

      this.api.healthIndex.getHealthHistory(sessionStorage.getItem('patientId'), item.index)
        .subscribe(
          (msg) => {
            loading.dismiss();
            var parsedData = msg['data'] == null ? [] : JSON.parse(msg['data'])
            this.navCtrl.push(HealthHistoryPage, {
              title: item.title.txt,
              index: item.index,
              data: parsedData
            })
          }
        )
    }
  }

  /**
   * 获取患者当天个体化方案计划执行情况
   */
  getCustomPlan(): void {
    var groupId = JSON.parse(sessionStorage.getItem('currGroup')).id
    var patiId = sessionStorage.getItem('patientId')


    this.api.healthyRecordDetail.getHealthPlan(groupId, patiId)
            .subscribe((msg: common) => {
              if(!msg.data || msg.data.length == 0) {
                this.healthPlan = null
                this.fixedHealthPlan = null
                return
              }

              this.healthPlan = msg.data

              this.fixCustomPlanData(this.healthPlan)
            })
  }


  fixCustomPlanData(orignalData) {
    var rst = {
      finish: [],
      waiting: []
    }

    this.healthPlan.forEach((plan) => {
      plan['healthPlans'].forEach((item) => {
        let timePoint = item.timePoint
        let timePointType = item.timePointType
        let timeValue = item.timeValue

        item['interviews'].forEach((single) => {
          single['timePoint'] = timePoint
          single['timePointType'] = timePointType
          single['timeValue'] = timeValue
          if(single.statusCode == 'waiting') rst.waiting.push(single)
          else if (single.statusCode == 'finish') rst.finish.push(single)
        })
      })
    })

    if(rst.finish.length === 0 && rst.waiting.length === 0) this.fixedHealthPlan = null
    else this.fixedHealthPlan = rst
  }


  presentToast(param) {
    let toast = this.totast.create({
      message: param.message,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  /**
   * 打卡
   */
  mark(interview, intervieIndx) {
    this.api.healthIndex.planMark(interview.id)
        .subscribe((msg) => {
          if(msg['data'] == true) {
            this.fixedHealthPlan['waiting'].splice(intervieIndx, 1)
            this.fixedHealthPlan['finish'].push(interview)

            this.getCustomPlan()

            this.presentToast({
              message: '打卡成功！'
            })
          } else {
            this.presentToast({
              message: '打卡失败，请重试！'
            })
          }
        })
  }


  /**
   * 刷新当前页数据
   */
  refreshData = function () {
    // 获取用户信息
    this.getInfo();
    // 获取患者当天个体化方案计划执行情况
    this.getCustomPlan()
  }


}
