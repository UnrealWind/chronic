import { NgModule } from '@angular/core';
import { SortDataDirective } from './sort-data/sort-data';
import { CheckPatiDirective } from './check-pati/check-pati';
@NgModule({
	declarations: [SortDataDirective,
    CheckPatiDirective],
	imports: [],
	exports: [SortDataDirective,
    CheckPatiDirective]
})
export class DirectivesModule {}
