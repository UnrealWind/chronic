import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BindUserPage } from './bind-user';
import { ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    BindUserPage,
  ],
  imports: [
    IonicPageModule.forChild(BindUserPage),
    ComponentsModule
  ],
})
export class BindUserPageModule {}
