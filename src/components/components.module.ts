import { NgModule } from '@angular/core';
import {ScrollComponent} from "./scroll/scroll";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NgbDatepickerModule,
  NgbTimepickerModule
} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './demo-utils/calendar-header.component';
import { DateTimePickerComponent } from './demo-utils/date-time-picker.component';
import { SingleLineComponent } from './single-line/single-line';
import { DirectivesModule} from "../directives/directives.module";
import { UvBaseInfoComponent } from './uv-base-info/uv-base-info';
import { IonicModule } from 'ionic-angular';
import { UvExamInfoComponent } from './uv-exam-info/uv-exam-info';
import { UvComplaintComponent } from './uv-complaint/uv-complaint';
import { UvHistoryComponent } from './uv-history/uv-history';
import { UvPhysiqueComponent } from './uv-physique/uv-physique';
import { UvTestComponent } from './uv-test/uv-test';
import { UvDrugComponent } from './uv-drug/uv-drug';
import { UvOperateComponent } from './uv-operate/uv-operate';
import { UvInspectComponent } from './uv-inspect/uv-inspect';

@NgModule({
	declarations: [ScrollComponent,CalendarHeaderComponent, DateTimePickerComponent,
    SingleLineComponent,
    UvBaseInfoComponent,
    UvExamInfoComponent,
    UvComplaintComponent,
    UvHistoryComponent,
    UvPhysiqueComponent,
    UvTestComponent,
    UvDrugComponent,
    UvOperateComponent,
    UvInspectComponent],
	imports: [
	  CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule,
    DirectivesModule,
    IonicModule
  ],
	exports: [ScrollComponent,CalendarHeaderComponent, DateTimePickerComponent,
    SingleLineComponent,
    UvBaseInfoComponent,
    UvExamInfoComponent,
    UvComplaintComponent,
    UvHistoryComponent,
    UvPhysiqueComponent,
    UvTestComponent,
    UvDrugComponent,
    UvOperateComponent,
    UvInspectComponent]
})
export class ComponentsModule {}

