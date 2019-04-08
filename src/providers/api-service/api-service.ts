import { HttpClient} from '@angular/common/http';
import {ConstantProvider} from "../../providers/constant/constant";
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
// 引入返回数据的类型定义
import { common } from '../../api-data-struc/api-data-struc';

// sessionStorage
import { SessionStorageProvider } from "../session-storage/session-storage";
import { BasicProvider} from "../basic/basic";

// rxjs
import { map, catchError } from "rxjs/operators";


/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiServiceProvider {

  constructor(
    public http: HttpClient,
    public apiUrl: ConstantProvider,
    private ss: SessionStorageProvider,
    private loading: LoadingController,
    private Basic:BasicProvider
  ) {

  }

  /**
   * 创建 loading
   */
  presentLoading(config?) {
    if(!config) config = {}

    const loader = this.loading.create({
      spinner: config.spinner || 'ios',
      content: config['content'] || '数据加载中...',
      enableBackdropDismiss: config['enableBackdropDismiss'] || false,
      duration: config['duration'] || 2000
    });
    loader.present();

    return loader
  }

  dismissLoading(loading) {
    loading.dismiss()
    loading = null
  }

  // HealthyIndexPage
  healthIndex = {
    /**
     * 获取顶部健康数据各部分历史记录
     * @param patientId <string> 患者 id
     * @param type <string | number> 数据类型
     *  1:血压
        2:血糖
        3:体重
        4:运动
        5:睡眠
        6:身体指数
        7:血脂
        8:血尿酸
        9:血氧
        10:心电
        11:呼吸率
        12:精神指数
        13:皮肤指数
        14:体温
     */
    getHealthHistory: (param: object) => {
      var url = null

      if(param.hasOwnProperty('breath')) url = `${this.apiUrl.BackstageUrl}/lian/save/historicalrecord/get?patientId=${param['pId']}&type=${0}&breath=${param['breath']}`
      else url =`${this.apiUrl.BackstageUrl}/lian/save/historicalrecord/get?patientId=${param['pId']}&type=${param['type']}`

      return this.http.get(url)
    },

    /**
     * 获取日历和 healthIndex 页打卡用数据
     * @qureyParam patientId: 患者 Id
     * @qureyParam begin<timestamp>: 开始时间
     * @qureyParam end<timestamp>: 结束时间
     */
    getPlan: (patientId: string, begin: string, end: string) => {
      return this.http.get<common>(
        `${this.apiUrl.BackstageUrl_b}/1/1/wechat/interviews?pid=${patientId}&begin=${begin}&end=${end}`
      )
    },

    /**
     * 打卡
     */
    planMark: (interviewId: string | number) => {
      return this.http.get(
        `${this.apiUrl.BackstageUrl_b}/1/1/wechat/feedback?interviewId=${interviewId}`
      )
    }
  }

  // HealthyRecordDetail
  healthyRecordDetail = {
    /**
     * 获取患者方案
     * @param groupId 护理组 Id
     * @param pId 患者 Id
     */
    getHealthPlan: (groupId: string | number, pId: string) => {
      return this.http.get(
        `${this.apiUrl.BackstageUrl_b}/${groupId}/patient/wechat/schemes?pid=${pId}`
      )
    }
  }


  // HealthRecodListPage
  healthRecordList = {
    /**
     * 获取患者全部方案，即 segment 选中【全部】项
     * @param pId<string> 患者 Id
     * @param nurseGroupId<number> 护理组 Id（目前没有用到，所以可以随便传一个值）
     */
    getAllGroup: (pId:string, nurseGroupId: number) => {
      return this.http.get(
        `${this.apiUrl.BackstageUrl_b}/${nurseGroupId}/patient/scheme/groups?pid=${pId}`
      )
    }
  }

  // userInfoPage
  userInfo = {
    /**
     * 获取用户所在护理组
     */
    getGroup: () => {
      return this.http.get(
        `${this.apiUrl.BackstageUrl_b}/1/1/getGroup`
      )
    },

    /**
     * 更改当前操作的用户
     */
    doSetDefault: (param) => {
      return this.http.get(`${this.apiUrl.BackstageUrl}/wechat/patient/pid/${param.pId}/${param.openId}`)
        .pipe(
          map(res => {
            if(res['status'] === 'ok') return res['data']
            else if(res['status'] === 'blank') throw 'err'
            else {
              throw 'err'
            }
          }),
          catchError(err => {
            // this.dismissLoading(loading)
            this.presentLoading({
              spinner: 'hide',
              content: '切换失败，请重试！',
              duration: 500
            })

            throw err
          })
        )
    }
  }

  // unitView 统一视图
  unitView = {
    /**
     * 个人档案
     * @param
     */
    personalProfile: (param) => {
      // var loading = this.presentLoading({
      //   content: '获取门诊、住院信息中...'
      // })

      return this.http.get(`${this.apiUrl.BackstageUrl_unitView}/unite/resource/single/59?filter__xlPatientId=${param.filter__xlPatientId}`)
        .pipe(
          map(res => {
            // this.dismissLoading(loading)
            if(res['status'] === 'ok') return res['data']['result']
            else if(res['status'] === 'blank') return []
            else {
              throw 'err'
            }
          }),
          catchError(err => {
            // this.dismissLoading(loading)
            this.presentLoading({
              spinner: 'hide',
              content: '获取门诊、住院数据失败!',
              duration: 500
            })

            throw err
          })
        )
    }
  }

  getHealthyView(){
    let params = {};
    let sex,organJson ,positionJson ,healthyChart ,chartData;
    let that = this;
    let patiId= this.ss.get('patientId')
    return new Promise(function (res,rej) {
      that.getPatientInfo(patiId).then(function (msg) {
        params['sexName'] = msg['data'].sexName;
        params['patiId'] = msg['data'].patientId;
        params['patiVisitId'] = msg['data'].patientVisitId;
        params['sexName'] == "女"?sex = "female":sex = "male"
        return that.getOrganJson(sex);
      }).then(function (msg) {
        organJson = msg['data'];
        return that.getPositionJson();
      }).then(function (msg) {
        positionJson = msg['data']
        return that.getHealthyChart({
          patiId:params['patiId'],
          patiVisitId:params['patiVisitId'],
          signature:that.Basic.getQueryString('signature'),
          caseId:that.Basic.getQueryString('caseId'),
        })
      }).then(function (msg) {
        healthyChart = msg['data'];
        chartData = that.filterChart(organJson,positionJson,healthyChart);
        res(chartData);
      })
    })

  }

  filterChart(organJson,positionJson,healthyChart){
    var size = 40;
    var data = {
      markPointData:[],
      markLinkData:[]
    };
    organJson.children.forEach(function(json){
      var image = json.icon,describe=json.name + '正常';
      healthyChart.organsInfo.forEach(function(chart){
        if(json.name == chart.organsName){
          if(chart.status == "异常"){
            image = json.icon + "-danger";
            describe = chart.msg;
          }
        }
      });
      data.markPointData.push({
        name:json.name,
        value:'',
        discribe:describe,
        geoCoord:json.position[1],
        symbol:'image://./assets/img/organ/'+image+'.png',
        symbolSize:size
      });
      var position = [
        {geoCoord:json.position[0]},
        {geoCoord:json.position[1]}
      ];
      data.markLinkData.push(position);
    });
    healthyChart.partsInfo.forEach(function(part){
      positionJson.forEach(function(position){
        if(part.partName == position.name){
          position.value = 100;
        }
      })
    });
    data['series'] = positionJson;
    return data;
  }


  getPatientInfo(patiId){
    var that = this;
    return new Promise(function (res,rej) {
      that.http.get(`${that.apiUrl.portrait}/exhibition/patient/info?filter_patiId=${patiId}`)
        .subscribe((msg) => {
          res(msg)
        })
    })
  }

  getOrganJson(sex){
    var that = this;
    return new Promise(function (res,rej) {
      that.http.get(`${that.apiUrl.local}${sex}-organ.json`)
        .subscribe((msg) => {
          res(msg)
        })
    })
  }

  getPositionJson(){
    var that = this;
    return new Promise(function (res,rej) {
      that.http.get(`${that.apiUrl.local}position.json`)
        .subscribe((msg) => {
          res(msg)
        })
    })
  }

  getHealthyChart(params){
    var that = this;
    return new Promise(function (res,rej) {
      that.http.get(`${that.apiUrl.portrait}/exhibition/${params.patiId}/${params.patiVisitId}/healthyPortrait`)
        .subscribe((msg) => {
          res(msg)
        })
    })
  }


}
