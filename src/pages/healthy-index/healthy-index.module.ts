import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HealthyIndexPage } from './healthy-index';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    HealthyIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(HealthyIndexPage),
    DirectivesModule
  ],
})
export class HealthyIndexPageModule {}
