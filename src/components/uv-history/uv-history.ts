import { Component, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from '../../providers/constant/constant';
// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";

@Component({
  selector: 'uv-history',
  templateUrl: 'uv-history.html'
})
export class UvHistoryComponent {
  @Input() xlData

  // 渲染用数据
  renderData = []

  constructor(
    public Http:HttpClient,
    public Constant:ConstantProvider,
    public ss: SessionStorageProvider,
  ) {

  }

  ngOnInit() {
    this.getData()
  }

  /**
   * 获取数据
   */
  getData() {
    var urls: string[] = []

    // 五史类型 既往史 29; 个人史 25; 婚育史 26; 家族史 27;
    var historyType = [29, 25, 26, 27]

    var xlPatientId = this.xlData.xlPatientId
    var xlMedicalId = this.xlData.xlMedicalId

    historyType.forEach((ele) => {
      urls.push(`${this.Constant.BackstageUrl_unitView}/unite/resource/single/${ele}?filter__xlPatientId=${xlPatientId}&filter__xlMedicalId=${xlMedicalId}`)
    })

    urls.forEach((url, ind) => {
      this.Http.get(url)
      .subscribe({
        next: (msg) => {
          if(msg['status'] === 'ok') this.renderData[ind] = msg['data']['result']
          else if(msg['status'] === 'blank') this.renderData[ind] = []
          else {
            this.renderData[ind] = 'err'
          }

          console.log(this.renderData)
        },
        error: (error) => {
          this.renderData[ind] = 'err'
        }
      })
    })
  }

}
