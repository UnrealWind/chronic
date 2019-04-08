import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-uv-hospital',
  templateUrl: 'uv-hospital.html',
})
export class UvHospitalPage {
  // 存放 xlPatientId and xlMedicalId
  xlData

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.xlData = this.navParams.get('xlData')
  }

}
