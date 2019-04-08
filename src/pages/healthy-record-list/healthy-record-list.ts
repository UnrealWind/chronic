import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UvHospitalPage } from "../uv-hospital/uv-hospital";
import { UvDepartmentPage } from "../uv-department/uv-department";
import { ApiServiceProvider } from "../../providers/api-service/api-service";
import { common } from 'api-data-struc/api-data-struc';
import { ConstantProvider } from '../../providers/constant/constant';

import { PlanDetailPage} from "../plan-detail/plan-detail";
import { HealthyRecordDetailPage} from "../healthy-record-detail/healthy-record-detail";


// sessionStorage
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";
@IonicPage()
@Component({
  selector: 'page-healthy-record-list',
  templateUrl: 'healthy-record-list.html',
})
export class HealthyRecordListPage {
  lists;
  // 患者当前所在护理组
  currGroup = this.ss.get('currGroup')

  // 患者个体化计划
  patiPlan: object[] = []
  // 患者所在全部方案组
  allGroup: object[] = []

  // 患者门诊、住院时间线数据
  timelineData: object[] | object
  // 门诊数据
  depData: object[] = []
  // 住院数据
  hospitalData: object = []

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiServiceProvider,
    public load: LoadingController,
    private ss: SessionStorageProvider,
    private constant: ConstantProvider
  ) {
    this.lists = '全部'
  }

  ionViewDidEnter(){
    // this.lists = '全部'

    // 默认获取全部方案组
    this.getAllGroup()
    // 获取门诊住院相关信息（即时间线信息）
    this.getTimeline()
  }


  goPlanDetail = function () {
    this.navCtrl.push(PlanDetailPage);
  }

  /**
   * 获取患者全部方案，即 segment 选中【全部】项
   * @param pId<string> 患者 Id
   * @param nurseGroupId<number> 护理组 Id（目前没有用到，所以可以随便传一个值）
   */
  // 个体化方案
  getAllGroup(type?): void {
    if(this.ss.get('patientId')) {
      var pId = this.ss.get('patientId')

      if(type) {
        var loading = this.load.create({
          content: '获取个体化方案中...'
        })

        loading.present();
      }



      this.api.healthRecordList.getAllGroup(pId, 1)
          .subscribe((msg: common) => {
            type ? loading.dismiss() : undefined

            if(msg.data && msg.data.length > 0) {
              this.allGroup = msg.data
            } else if(msg.data && msg.data.length == 0) {
              this.allGroup = []
            } else if (msg.data === null) {
              this.allGroup = []
            }

          }, function(error) {
            this.allGroup = null
            type ? loading.dismiss() : undefined
          })
    }
  }



  /**
   * 获取个体化方案详情
   */
  getCustomPlan():void {
    if(this.ss.get('patientId')) {
      var loading = this.load.create({
        content: '获取中...'
      })

      loading.present();

      this.api.healthyRecordDetail.getHealthPlan(this.currGroup.id, this.ss.get('patientId'))
          .subscribe((msg:common) => {
            if(msg.data && msg.data.length > 0) {
              this.patiPlan = msg.data
            } else if(msg.data && msg.data.length == 0) {
              this.patiPlan = []
            } else if (msg.data === null) {
              this.patiPlan = []
            }

            loading.dismiss();
            loading = null
          },function(error) {
            this.patiPlan = null
            loading.dismiss();
            loading = null
          })
    }
  }

  /**
   * 获取住院、门诊信息
   */
  getTimeline() {
    var xlPatientId = this.ss.get('defaultPati').xlPatientId

    this.api.unitView.personalProfile({
      filter__xlPatientId: `${xlPatientId}`
    })
    .subscribe({
      next: (msg) => {
        this.timelineData = msg
        this.filterHosAndDepData(this.timelineData)
      }
    })
  }

  /**
   * 过滤处门诊和住院数据
   */
  filterHosAndDepData(allData) {
    // 住院数据
    this.hospitalData = allData.filter(hos => hos.medical_type_id == '3')
    // 门诊数据
    this.depData = allData.filter(hos => hos.medical_type_id == '2')
  }

  /**
   * 跳转住院和门诊详情页 uw-hospital
   * @param type 跳转的类型 2: 门诊； 3: 住院
   *        param: xlPatientId & xlPatientId
   */
  goDetail = (type, param): void => {
    switch (type) {
      case '2':
        this.navCtrl.push(UvDepartmentPage, {
          xlData: {
            xlPatientId: param.xlPatientId,
            xlMedicalId: param.xlMedicalId
          }
        })
        break;
      case '3':
        this.navCtrl.push(UvHospitalPage, {
          xlData: {
            xlPatientId: param.xlPatientId,
            xlMedicalId: param.xlMedicalId
          }
        })
        break;
    }
  }

  goHospitalRecord = function () {
    this.navCtrl.push(HealthyRecordDetailPage);
  }




  /**
   * 切换面板
   * @param event 事件对象
   */
  segmentChanged = function(event) {
    switch (event.value) {
      case '全部':
        this.getAllGroup(true)
        this.getTimeline()
        break;

      case '个体化方案':
        this.getCustomPlan()
        break;
    }
  }

}
