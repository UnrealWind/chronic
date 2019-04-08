import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoPage } from './user-info';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    UserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoPage),
    DirectivesModule
  ],
})
export class UserInfoPageModule {}
