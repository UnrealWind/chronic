import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController } from 'ionic-angular';

/**
 * Generated class for the HealthHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-health-history',
  templateUrl: 'health-history.html'
})
export class HealthHistoryPage {
  historyList: object[] = null
  // 历史记录的类型
  currHisType
  // 特殊展示类型
  exceptType = ['fev1', 'pef', 'fvc']

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.historyList = this.navParams.data.data.length == 0 ? null : this.navParams.data.data
    this.currHisType = this.navParams.data.index
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.hideTabBar()
  }

  ionViewDidLeave() {
    this.showTabBar()
  }

  /**
   * 加工 fev1 fvc pef 数据
   * @param orgData
   */
  fixExceptData(orgData) {
    var fixedData = []

    var allDate = []

    var aData = null
    var mData = null

    function uniq(array){
      var res = [];
      array.forEach(function(element) {
          if(res.indexOf(element)<0){
              res.push(element);
          }
      }, this);
      return res;
    }



    if(orgData[0].hasOwnProperty('adata')) {
      aData = orgData[0]
      delete orgData[0]['adata']
      delete orgData[1]['mdata']
      mData = orgData[1]
    } else {
      aData = orgData[1]
      delete orgData[1]['adata']
      delete orgData[0]['mdata']
      mData = orgData[0]
    }

    for(let objA in aData) allDate.push(objA)
    for(let objB in mData) allDate.push(objB)


    allDate = uniq(allDate)

    allDate.forEach((ele) => {
      fixedData.push({
        time: ele,
        aData: aData[ele] ? aData[ele] : '无',
        mData: mData[ele] ? mData[ele]: '无'
      })
    })

    return fixedData
  }

  /**
   * 隐藏 tab 栏
   */
  hideTabBar(): void {
    var _tabNativeEle = this.viewCtrl._nav.parent._tabbar.nativeElement
    _tabNativeEle['hidden'] = true
  }

  /**
   * 显示 tab 栏
   */
  showTabBar(): void {
    var _tabNativeEle = this.viewCtrl._nav.parent._tabbar.nativeElement
    _tabNativeEle['hidden'] = false
  }
}
