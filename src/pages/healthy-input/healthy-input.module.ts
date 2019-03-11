import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyInputPage } from './healthy-input';

@NgModule({
  declarations: [
    HealthyInputPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyInputPage),
  ],
})
export class HealthyInputPageModule {}
