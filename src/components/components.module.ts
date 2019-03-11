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

@NgModule({
	declarations: [ScrollComponent,CalendarHeaderComponent, DateTimePickerComponent,
    SingleLineComponent],
	imports: [
	  CommonModule,
    FormsModule,
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    CalendarModule,
    DirectivesModule
  ],
	exports: [ScrollComponent,CalendarHeaderComponent, DateTimePickerComponent,
    SingleLineComponent]
})
export class ComponentsModule {}

