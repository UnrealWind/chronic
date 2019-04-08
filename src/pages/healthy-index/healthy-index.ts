import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, ToastController ,AlertController, Refresher} from 'ionic-angular';
import { HealthyRecordPage} from "../healthy-record/healthy-record";
import { TimeClockPage} from "../time-clock/time-clock";
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from "../../providers/constant/constant";
import * as $ from 'jquery';

// service
import { ApiServiceProvider } from "../../providers/api-service/api-service";
import { UtilsProvider } from "../../providers/utils/utils";
// sessionStorage
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";

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
  // 是否重新验证绑定
  rerend:boolean = false


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
    private ss: SessionStorageProvider,
    public api: ApiServiceProvider,
    public totast: ToastController,
    public utils: UtilsProvider
  ) {
    /**
     * 防止页面回退
     */
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
    setTimeout(() => {
      this.rerend = true
    }, 0);
  };

  ionViewDidLeave() {
    this.rerend = false
  }

  /**
   * 页面初始，不是 ionic page 的生命周期
   */
  init(param) {
    // 获取用户信息
    this.getInfo();
    // 获取患者所在护理组
    this.getPatiGroup()
  }


  /**
   * 获取患者所在护理组
   */
  getPatiGroup = function() {
    var that = this;
    this.api.userInfo.getGroup()
        .subscribe((msg) => {
          that.setPatiGroup(msg.data[0])

          // 获取患者当天个体化方案计划执行情况
          this.getCustomPlan()
        })
  }

  /**
   * 存储患者所在护理组
   */
  setPatiGroup = function(currGroup) {
    this.ss.set('currGroup', currGroup)
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
  getInfo = function(type?){
    if(type) {
      var loading = this.load.create({
        content: '获取健康数据中...'
      })

      loading.present()
    }


    this.http.get(this.Constant.BackstageUrl+'/lian/save/data/'+ this.ss.get('patientId'),this.params)
      .subscribe((res)=>{
        //这里强行校验一下
        res.data == '{}' || res.data =='' ?res.data = null:'';
        this.info = res.data

        type ? loading.dismiss() : undefined
        type ? loading = null : undefined

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
                  val:  this.utils.getSafe(() => this.info.bodyIndex.bmi, null)
                }
              ],
              detail: {
                txt: this.utils.getSafe(() => this.info.bodyIndex.bmiLevel, null),
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
                  val: this.utils.getSafe(() => this.info.bloodPressure.highValue, null)
                },
                {
                  type: 0,
                  txt: 'L',
                  val: this.utils.getSafe(() => this.info.bloodPressure.lowValue, null)
                }
              ],
              detail: {
                txt: this.utils.getSafe(() => this.info.bloodPressure.level, null),
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
                  val: this.utils.getSafe(() => this.info.ecg.heartRate, null)
                }
              ],
              detail: {
                txt: this.utils.getSafe(() => this.info.ecg.levelName, null),
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
                  val: this.utils.getSafe(() => this.info.bloodOxygen.spoValue, null)
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
                  val: this.utils.getSafe(() => this.info.bloodFat.level, null)
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
                  val: this.utils.getSafe(() => this.info.temperature.bodyTemperature, null)
                }
              ],
              detail: null
            },
          ],
          [
            { // Fev1
              index: 'fev1',
              type: 0,
              title: {
                icon: 'ios-alert-outline',
                txt: 'Fev1',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.utils.getSafe(() => this.info.fev1Value, null)
                }
              ],
              detail: null
            },
            { // Fvc
              index: 'fvc',
              type: 0,
              title: {
                icon: 'ios-aperture-outline',
                txt: 'Fvc',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.utils.getSafe(() => this.info.fvcValue, null)
                }
              ],
              detail: null
            },
            { // Pef
              index: 'pef',
              type: 0,
              title: {
                icon: 'ios-clipboard-outline',
                txt: 'Pef',
              },
              subTitle: [
                {
                  type: 0,
                  txt: null,
                  val: this.utils.getSafe(() => this.info.pefValue, null)
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
      // 类型和数据字段对应关系
      let fieldMap = {
        '1': 'bloodPressure',
        '6': 'weight',
        '10': 'heartRate',
        '9': 'bloodOxygen',
        '7': 'bloodFat',
        '14': 'temperature'
      }


      let loading = this.load.create({
        content: '获取历史记录中...'
      });

      loading.present();

      // 这三个类型 url 里需要多加一个 breath 参数
      var excpetTye = ['fev1', 'pef', 'fvc']
      var param = null

      if(excpetTye.indexOf(item.index) >= 0) param = { pId: this.ss.get('patientId'), type: item.index, breath: item.index }
      else param = { pId: this.ss.get('patientId'), type: item.index }

      this.api.healthIndex.getHealthHistory(param)
        .subscribe(
          (msg) => {
            loading.dismiss();
            loading = null

            var parsedData = []

            if(msg['data'] !== null) {
              let parsedObj = JSON.parse(msg['data'])

              if(excpetTye.indexOf(item.index) >= 0) {
                for(let key in parsedObj) {
                  parsedData.push({
                    'key': key,
                    'value': parsedObj[key]
                  })
                }
              } else {
                parsedData = parsedObj
              }
            }

            this.navCtrl.push(HealthHistoryPage, {
              title: item.title.txt,
              index: item.index,
              data: parsedData
            })
          }, (error) => {
            loading.dismiss();
            loading = null
          }
        )
    }
  }

  /**
   * 获取患者当天个体化方案计划执行情况
   */
  getCustomPlan(type?): void {
    var groupId = this.ss.get('currGroup').id
    var patiId = this.ss.get('patientId')


    if(type) {
      var loading = this.load.create({
        content: '获取个体化方案中...'
      })

      loading.present()
    }

    this.api.healthyRecordDetail.getHealthPlan(groupId, patiId)
            .subscribe((msg: common) => {

              type ? loading.dismiss() : undefined

              if(!msg.data || msg.data.length == 0) {
                this.healthPlan = null
                this.fixedHealthPlan = null
                return
              }

              this.healthPlan = msg.data

              this.fixCustomPlanData(this.healthPlan)
            })
  }

  /**
   * 下拉刷新
   */
  doRefresh(refresher: Refresher) {
    this.getCustomPlan(true)
    this.getInfo(true)

    setTimeout(() => {
      refresher.complete();
    }, 1200)

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
    this.getInfo(true);
    // 获取患者当天个体化方案计划执行情况
    this.getCustomPlan(true)
  }


}
