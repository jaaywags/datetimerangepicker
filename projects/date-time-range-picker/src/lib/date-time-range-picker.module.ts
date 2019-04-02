import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faCheck, faEdit, faTimes, faCalendarAlt, faChevronLeft, faChevronRight, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { DateTimeRangePickerComponent } from './date-time-range-picker.component';

@NgModule({
	declarations: [DateTimeRangePickerComponent],
	imports: [
		BrowserModule,
		FontAwesomeModule,
	],
	exports: [DateTimeRangePickerComponent]
})
export class DateTimeRangePickerModule {
	constructor() {
		library.add(faSpinner);
		library.add(faEdit);
		library.add(faCheck);
		library.add(faTimes);
		library.add(faCalendarAlt);
		library.add(faClock);
		library.add(faChevronLeft);
		library.add(faChevronRight);
		library.add(faChevronDown);
		library.add(faChevronUp);
	}
}
