import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from '../../providers/constant/constant';

// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";

@IonicPage()
@Component({
  selector: 'page-exam-detail',
  templateUrl: 'exam-detail.html',
})
export class ExamDetailPage {
  // 检验单条数据 Id
  inspectId
  // 页面的 title
  title
  // xlData
  xlData

  // 渲染用数据
  renderData
  // abnormalData 异常数据
  abnormalData = {
    higher: [],
    lower: []
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public Http:HttpClient,
    public Constant:ConstantProvider,
    public ss: SessionStorageProvider,
  ) {
    this.inspectId = this.navParams.get('inspectId')
    this.title = this.navParams.get('title')
    this.xlData = this.navParams.get('xlData')
  }

  ngOnInit() {
    this.getData()
  }

  /**
   * 获取数据
   */
  getData() {
    var url: string = ''

    var xlPatientId = this.xlData.xlPatientId
    var xlMedicalId = this.xlData.xlMedicalId

    var inspectNo = this.inspectId

    url = `${this.Constant.BackstageUrl_unitView}/unite/resource/single/70?filter__xlPatientId=${xlPatientId}&filter__xlMedicalId=${xlMedicalId}&filter__testNo=${inspectNo}`

    this.Http.get(url)
      .subscribe({
        next: (msg) => {
          if(msg['status'] === 'ok') {
            this.renderData = msg['data']['result']
            this.filterData(msg['data']['result'])
          }
          else if(msg['status'] === 'blank') this.renderData = []
          else {
            this.renderData = 'err'
          }
        },
        error: (error) => {
          this.renderData = 'err'
        }
      })
  }

  /**
   * 拆分异常数据偏高和偏低项
   */
  filterData(orgdata) {
    orgdata.forEach((ele) => {
      if(ele.abnormal_name == '高') this.abnormalData.higher.push(ele)
      else if(ele.abnormal_name == '低') this.abnormalData.lower.push(ele)
    })
    console.log(this.abnormalData)
  }


  back = function () {
    this.navCtrl.pop();
  }
}
