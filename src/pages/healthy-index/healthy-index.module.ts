import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyIndexPage } from './healthy-index';

@NgModule({
  declarations: [
    HealthyIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyIndexPage),
  ],
})
export class HealthyIndexPageModule {}
