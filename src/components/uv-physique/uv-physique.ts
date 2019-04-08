import { Component, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from '../../providers/constant/constant';
// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";

@Component({
  selector: 'uv-physique',
  templateUrl: 'uv-physique.html'
})
export class UvPhysiqueComponent {
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
    this.getData()
  }

  /**
   * 获取数据
   */
  getData() {
    var url: string = ''

    var xlPatientId = this.xlData.xlPatientId
    var xlMedicalId = this.xlData.xlMedicalId

    url = `${this.Constant.BackstageUrl_unitView}/unite/resource/single/28?filter__xlPatientId=${xlPatientId}&filter__xlMedicalId=${xlMedicalId}`

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
