import { Injectable } from '@angular/core';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  constructor() {

  }

  /**
   * 检测数据类型
   */
  typeIs = (function () {
    var class2type = {};

    // 生成class2type映射
    "Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })

    return function (obj) {
        // 一箭双雕
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[Object.prototype.toString.call(obj)] || "object" :
            typeof obj;
    }
  })()

  /**
   * 日期格式化
   * @param {*} date
   * @param {*} fmt
   */
  formatDate = function(date, fmt) {
    var _date = new Date(date);
    var _fmt = fmt || "yyyy-MM-dd hh:mm:ss";
    var o = {
      "M+": _date.getMonth() + 1, //月份
      "d+": _date.getDate(), //日
      "h+": _date.getHours(), //小时
      "m+": _date.getMinutes(), //分
      "s+": _date.getSeconds() //秒
    };
    if (/(y+)/.test(_fmt)) {
      _fmt = _fmt.replace(
        RegExp.$1,
        (_date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(_fmt)) {
        _fmt = _fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return _fmt;
  }

  // 获取当前月份相关
  getMonthAbt = {
    /**
     * 本月第一天
     * @return 第一天的时间戳格式
     */
    firstDay: () => {
      var date=new Date();

      date.setDate(1);
      return +date;
    },

    /**
     * 本月最后一天
     * @return 最后一天的时间戳格式
     */
    lastDay: () => {
      var date=new Date();
      var currentMonth=date.getMonth();
      var nextMonth=++currentMonth;
      var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
      var oneDay=1000*60*60*24;
      return new Date((+nextMonthFirstDay)-oneDay);
    }
  }

}
