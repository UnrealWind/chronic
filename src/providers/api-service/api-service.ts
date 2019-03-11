import { HttpClient} from '@angular/common/http';
import {ConstantProvider} from "../../providers/constant/constant";
import { Injectable } from '@angular/core';
// 引入返回数据的类型定义
import { common } from '../../api-data-struc/api-data-struc';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class ApiServiceProvider {

  constructor(
    public http: HttpClient,
    public apiUrl: ConstantProvider
  ) {

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
    getHealthHistory: (patientId: string, type: string | number) => {
      return this.http.get(
        `${this.apiUrl.BackstageUrl}/lian/save/historicalrecord/get?patientId=${patientId}&type=${type}`
      )
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
    getHealthPlan: (groupId: string | number, pId: string | number) => {
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
    }
  }


}
