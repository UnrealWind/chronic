import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyRecordDetailPage } from './healthy-record-detail';

@NgModule({
  declarations: [
    HealthyRecordDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyRecordDetailPage),
  ],
})
export class HealthyRecordDetailPageModule {}
