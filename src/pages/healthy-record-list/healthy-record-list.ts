import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PlanDetailPage} from "../plan-detail/plan-detail";
import { HealthyRecordDetailPage} from "../healthy-record-detail/healthy-record-detail";
import { ApiServiceProvider } from "../../providers/api-service/api-service";
import { common } from 'api-data-struc/api-data-struc';
@IonicPage()
@Component({
  selector: 'page-healthy-record-list',
  templateUrl: 'healthy-record-list.html',
})
export class HealthyRecordListPage {
  lists;
  // 患者当前所在护理组
  currGroup = JSON.parse(sessionStorage.getItem('currGroup'))

  // 患者个体化计划
  patiPlan: object[] = null
  // 患者所在全部方案组
  allGroup: object[] = null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public load: LoadingController
  ) {
    this.lists = '全部'
  }

  ionViewDidEnter(){
    // 默认获取全部方案组
    this.getAllGroup()
  }


  goPlanDetail = function () {
    this.navCtrl.push(PlanDetailPage);
  }

  goHospitalRecord = function () {
    this.navCtrl.push(HealthyRecordDetailPage);
  }

  /**
   * 获取患者全部方案，即 segment 选中【全部】项
   * @param pId<string> 患者 Id
   * @param nurseGroupId<number> 护理组 Id（目前没有用到，所以可以随便传一个值）
   */
  getAllGroup(): void {
    if(sessionStorage.getItem('patientId')) {
      var pId = sessionStorage.getItem('patientId')

      var loading = this.load.create({
        content: '获取中...'
      })

      loading.present();

      this.api.healthRecordList.getAllGroup(pId, 1)
          .subscribe((msg: common) => {
            if(msg.data && msg.data.length > 0) {
              this.allGroup = msg.data
            } else if(msg.data && msg.data.length == 0) {
              this.allGroup = null
            } else if (msg.data === null) {
              this.allGroup = null
            }

            loading.dismiss();
          })
    }
  }

  /**
   * 获取个体化方案
   */
  getCustomPlan():void {
    if(sessionStorage.getItem('patientId')) {
      var loading = this.load.create({
        content: '获取中...'
      })

      loading.present();

      this.api.healthyRecordDetail.getHealthPlan(this.currGroup.id, sessionStorage.getItem('patientId'))
          .subscribe((msg:common) => {
            if(msg.data && msg.data.length > 0) {
              this.patiPlan = msg.data
            } else if(msg.data && msg.data.length == 0) {
              this.patiPlan = null
            } else if (msg.data === null) {
              this.patiPlan = null
            }

            loading.dismiss();
          })
    }
  }




  /**
   * 切换面板
   * @param event 事件对象
   */
  segmentChanged = function(event) {
    switch (event.value) {
      case '全部':
        this.getAllGroup()
        break;

      case '个体化方案':
        this.getCustomPlan()
        break;
    }
  }

}
