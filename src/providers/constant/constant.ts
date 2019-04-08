import { Injectable } from '@angular/core';
import { ENV } from '@app/env';
@Injectable()
export class ConstantProvider {
  // C 端接口地址
  BackstageUrl: string;
  AppId: string;
  redirect_url: string;
  // B 端接口地址
  BackstageUrl_b: string;
  // 统一视图后台地址
  BackstageUrl_unitView: string;
  // pId 前缀，用于拼接不同医院的 xl_patientId
  pIdPrefix: string;

  //画像
  portrait;
  //本地静态数据
  local;

  constructor() {
    this.BackstageUrl = ENV.BACKEND_URL;
    this.BackstageUrl_b = ENV.BACKEND_B_URL;
    this.BackstageUrl_unitView = ENV.BACKEND_UNIT_VIEW_URL;
    this.AppId = 'wx7933e75597f973c4';
    this.redirect_url = 'http://wechat.infisa.com.cn';
    this.pIdPrefix = '501_';
    this.portrait = ENV.BACKEND_UNIT_VIEW_URL;
    this.local = './assets/data/'
  }

}
