import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimeClockPage } from './time-clock';

@NgModule({
  declarations: [
    TimeClockPage,
  ],
  imports: [
    IonicPageModule.forChild(TimeClockPage),
  ],
})
export class TimeClockPageModule {}
