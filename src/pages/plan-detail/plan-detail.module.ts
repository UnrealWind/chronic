import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanDetailPage } from './plan-detail';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { ComponentsModule} from "../../components/components.module";
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PlanDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanDetailPage),
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    ComponentsModule,
    BrowserAnimationsModule
  ],
  schemas:[NO_ERRORS_SCHEMA]
})
export class PlanDetailPageModule {

}
