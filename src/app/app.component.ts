import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: []
})
export class AppComponent {
	title = 'date-time-range-picker';
	startDate: string;
	endDate: string;
}
