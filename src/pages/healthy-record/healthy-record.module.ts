import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyRecordPage } from './healthy-record';

@NgModule({
  declarations: [
    HealthyRecordPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyRecordPage),
  ],
})
export class HealthyRecordPageModule {}
