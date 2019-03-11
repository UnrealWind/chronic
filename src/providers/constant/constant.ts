import { Injectable } from '@angular/core';
import { ENV } from '@app/env';
@Injectable()
export class ConstantProvider {
  BackstageUrl;
  AppId;
  redirect_url;
  BackstageUrl_b;
  constructor() {
    this.BackstageUrl = ENV.BACKEND_URL;
    this.BackstageUrl_b = ENV.BACKEND_B_URL;
    this.AppId = 'wx7933e75597f973c4';
    this.redirect_url = 'http://wechat.infisa.com.cn'
  }

}
