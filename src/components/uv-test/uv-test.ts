import { Component, Input} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ConstantProvider} from '../../providers/constant/constant';

// 检查详情页
import { CheckDetailPage } from '../../pages/check-detail/check-detail';

// service
import { SessionStorageProvider } from "../../providers/session-storage/session-storage";

// 门诊住院 检查信息
@Component({
  selector: 'uv-test',
  templateUrl: 'uv-test.html'
})
export class UvTestComponent {
  @Input() xlData

  // 渲染用数据
  renderData

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
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

    url = `${this.Constant.BackstageUrl_unitView}/unite/resource/single/68?filter__xlPatientId=${xlPatientId}&filter__xlMedicalId=${xlMedicalId}`

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

  /**
   * 查看详情
   */
  goDetail(detail) {
    this.navCtrl.push(CheckDetailPage, {
      data: detail
    })
  }


  /**
   * 点击查看更多
   */
  collapse(event) {
    if(event.target.className.indexOf('more') >= 0) {
      let parentEle = event.target.parentElement

      var classes = parentEle.className.split(" ");
      var i = classes.indexOf("active");

      if(event.target.dataset.collapse == 'close') {
        event.target.dataset.collapse = 'open'
        event.target.innerText = '收起↑'
        classes.push("active");
      } else {
        event.target.dataset.collapse = 'close'
        event.target.innerText = '更多↓'
        classes.splice(i, 1);
      }

      parentEle.className = classes.join(" ");
    }
  }

}
