import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantProvider } from "../../providers/constant/constant"

@Injectable()
export class BasicProvider {

  constructor(public Http: HttpClient) {

  }

  getQueryString = function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      if(!window.location.href.split('?')[1]) return null;
      var r = window.location.href.split('?')[1].match(reg);
      if (r != null) return decodeURI(r[2]); return null;
  }

}
