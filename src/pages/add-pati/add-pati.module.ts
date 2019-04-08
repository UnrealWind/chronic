import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPatiPage } from './add-pati';

@NgModule({
  declarations: [
    AddPatiPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPatiPage),
  ],
})
export class AddPatiPageModule {}
