import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UvDepartmentPage } from './uv-department';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UvDepartmentPage,
  ],
  imports: [
    IonicPageModule.forChild(UvDepartmentPage),
    ComponentsModule
  ],
})
export class UvDepartmentPageModule {}
