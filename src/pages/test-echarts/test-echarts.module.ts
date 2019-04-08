import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TestEchartsPage } from './test-echarts';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    TestEchartsPage,
  ],
  imports: [
    IonicPageModule.forChild(TestEchartsPage),
    DirectivesModule
  ],
})
export class TestEchartsPageModule {}
