import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UvHospitalPage } from './uv-hospital';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UvHospitalPage,
  ],
  imports: [
    IonicPageModule.forChild(UvHospitalPage),
    ComponentsModule
  ],
})
export class UvHospitalPageModule {}
