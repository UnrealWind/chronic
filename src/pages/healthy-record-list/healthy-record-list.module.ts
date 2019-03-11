import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyRecordListPage } from './healthy-record-list';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    HealthyRecordListPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyRecordListPage),
    ComponentsModule
  ]
})
export class HealthyRecordListPageModule {}
