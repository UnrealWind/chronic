import { Component, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from '../../providers/constant/constant';
// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";



/**
 * 统一视图 门诊、住院的基本信息部分
 */
@Component({
  selector: 'uv-base-info',
  templateUrl: 'uv-base-info.html',
})
export class UvBaseInfoComponent {
  // 当前组件所属范围 住院、门诊
  // 2 门诊； 3 住院
  // 这里决定了下方的获取数据方法的 url
  @Input() type
  @Input() xlData

  // 渲染用数据
  renderData

  constructor(
    public Http:HttpClient,
    public Constant:ConstantProvider,
    public ss: SessionStorageProvider,
  ) {

  }

  ngOnInit() {
    this.getData(this.type)
  }



  /**
   * 获取数据
   */
  getData(type) {
    var url: string = ''

    var xlPatientId = this.xlData.xlPatientId
    var xlMedicalId = this.xlData.xlMedicalId

    var urlType = null

    switch(type) {
      case 2:
        urlType = 49
        break
      case 3:
        urlType = 18
        break
    }

    url = `${this.Constant.BackstageUrl_unitView}/unite/resource/single/${urlType}?filter__xlPatientId=${xlPatientId}&filter__xlMedicalId=${xlMedicalId}`

    this.Http.get(url)
      .subscribe({
        next: (msg) => {
          if(msg['status'] === 'ok') this.renderData = msg['data']['result']
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
}
