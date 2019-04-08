import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-uv-department',
  templateUrl: 'uv-department.html',
})
export class UvDepartmentPage {
  // 存放 xlPatientId and xlMedicalId
  xlData

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.xlData = this.navParams.get('xlData')
  }

  ionViewDidLoad() {

  }

}
