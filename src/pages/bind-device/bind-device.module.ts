import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindDevicePage } from './bind-device';

@NgModule({
  declarations: [
    BindDevicePage,
  ],
  imports: [
    IonicPageModule.forChild(BindDevicePage),
  ],
})
export class BindDevicePageModule {}
