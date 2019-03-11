import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HealthyIndexPage} from "../healthy-index/healthy-index";

@IonicPage()
@Component({
  selector: 'page-healthy-input',
  templateUrl: 'healthy-input.html',
})
export class HealthyInputPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  save() {
    //save fun
    this.navCtrl.pop();
  }

}
