import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckDetailPage } from './check-detail';

@NgModule({
  declarations: [
    CheckDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckDetailPage),
  ],
})
export class CheckDetailPageModule {}
