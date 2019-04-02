import { Component, OnInit, ElementRef, HostListener, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'underscore';
import * as momentImported from 'moment'; const moment = momentImported;

@Component({
	selector: 'date-time-range-picker',
	templateUrl: './date-time-range-picker.component.html',
	styleUrls: ['./date-time-range-picker.component.css']
})
export class DateTimeRangePickerComponent implements OnInit {
	isDateTimePickerVisible: boolean = false;
	displayAmStart: boolean = false;
	displayAmEnd: boolean = false;
	displayTime: boolean = false;
	displayDays: boolean = true;
	displayMonths: boolean = false;
	displayYears: boolean = false;
	displayStartHours: boolean = false;
	displayStartMinutes: boolean = false;
	displayEndHours: boolean = false;
	displayEndMinutes: boolean = false;
	daysPerMonth: number[] = [];
	minute: number;
	hour: number;
	day: number;
	month: number;
	year: number;
	todaysDay: number;
	todaysMonth: number;
	todaysYear: number;
	firstDayOfMonth: number;
	monthList: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	monthAbreviatedList: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	dayList: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	firstMinute: number;
	firstHour: number;
	firstDay: number;
	firstMonth: number;
	firstYear: number;
	lastMinute: number;
	lastHour: number;
	lastDay: number;
	lastMonth: number;
	lastYear: number;
	yearsRange: number[] = [];

	//two way binding
	mainStartDate: string;
	@Output() startDateChange = new EventEmitter<string>();
	@Input() get startDate(): string { return this.mainStartDate; };
	set startDate(val: string) {
		this.mainStartDate = val;
		this.startDateChange.emit(val);
	}
	mainEndDate: string;
	@Output() endDateChange = new EventEmitter<string>();
	@Input() get endDate(): string { return this.mainEndDate; };
	set endDate(val: string) {
		this.mainEndDate = val;
		this.endDateChange.emit(val);
	}

	// handles closing of date picker if user clicks outside of window
	@HostListener('document:click', ['$event'])
	clickout(event) {
		if (this.eRef.nativeElement.contains(event.target) === false) {
			this.isDateTimePickerVisible = false;
		}
	}
	public clickInside(event: Event) {
		event.stopPropagation();
	}

	constructor(private eRef: ElementRef) {
		this.setUpDate();
	}

	ngOnInit() {
		if (!!this.startDate && !!this.endDate) {
			this.setPassedDates();
		}
	}

	private setPassedDates(): void {
		//start date
		let date: momentImported.Moment = moment(this.startDate).local();
		if (date.hour() >= 12) {
			this.displayAmStart = false;
		} else {
			this.displayAmStart = true;
		}
		this.firstYear = date.year();
		this.firstMonth = date.month();
		this.firstDay = date.date();
		if (date.hour() > 12) {
			this.firstHour = date.hour() - 12;
		} else if (date.hour() === 0) {
			this.firstHour = 12;
		} else {
			this.firstHour = date.hour();
		}
		this.firstMinute = date.minute();

		//end date
		date = moment(this.endDate).local();
		if (date.hour() >= 12) {
			this.displayAmEnd = false;
		} else {
			this.displayAmEnd = true;
		}
		this.lastYear = date.year();
		this.lastMonth = date.month();
		this.lastDay = date.date();
		if (date.hour() > 12) {
			this.lastHour = date.hour() - 12;
		} else if (date.hour() === 0) {
			this.lastHour = 12;
		} else {
			this.lastHour = date.hour();
		}
		this.lastMinute = date.minute();
	}

	public changeDisplayedControls(controlToDisplay: string) {
		this.displayTime = false;
		this.displayDays = false;
		this.displayMonths = false;
		this.displayYears = false;
		this.displayStartHours = false;
		this.displayStartMinutes = false;
		this.displayEndHours = false;
		this.displayEndMinutes = false;

		switch (controlToDisplay) {
			case 'time':
				this.displayTime = true;
				break;
			case 'days':
				this.displayDays = true;
				break;
			case 'months':
				this.displayMonths = true;
				break;
			case 'years':
				this.displayYears = true;
				break;
			case 'starthours':
				this.displayStartHours = true;
				break;
			case 'startminutes':
				this.displayStartMinutes = true;
				break;
			case 'endhours':
				this.displayEndHours = true;
				break;
			case 'endminutes':
				this.displayEndMinutes = true;
				break;
		}
	}

	private setUpDate(): void {
		const date: Date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth();
		this.day = date.getDate();
		this.hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
		this.minute = date.getMinutes();
		this.displayAmStart = true;
		this.displayAmEnd = false;
		this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
		this.daysPerMonth = _.range(7 * 6);
		this.todaysDay = this.day;
		this.todaysMonth = this.month;
		this.todaysYear = this.year;
		this.firstMinute = 0;
		this.firstHour = 12;
		this.lastMinute = 59;
		this.lastHour = 11;
		this.yearsRange = _.range(this.year - 10, this.year + 11, 1);
	}

	public getDayForCalendar(currentDay: number): number {
		const thisMonth: Date = new Date(this.year, (this.month + 1), 0);
		if (currentDay < (this.firstDayOfMonth + 1)) {
			return new Date(this.year, this.month, 0).getDate() - this.firstDayOfMonth + currentDay;
		} else if ((currentDay - this.firstDayOfMonth) > thisMonth.getDate()) {
			return currentDay - this.firstDayOfMonth - thisMonth.getDate();
		} else {
			return currentDay - this.firstDayOfMonth;
		}
	}

	public isDayInThisMonth(currentDay: number): boolean {
		if (this.isDayInPreviousMonth(currentDay)) {
			return false;
		} else if (this.isDayInNextMonth(currentDay)) {
			return false;
		} else {
			return true;
		}
	}

	private isDayInPreviousMonth(currentDay: number): boolean {
		return currentDay < (this.firstDayOfMonth + 1);
	}

	private isDayInNextMonth(currentDay: number): boolean {
		const thisMonth: Date = new Date(this.year, (this.month + 1), 0);
		return (currentDay - this.firstDayOfMonth) > thisMonth.getDate();
	}

	public clearRange(): void {
		this.firstDay = null;
		this.firstMonth = null;
		this.firstYear = null;
		this.lastDay = null;
		this.lastMonth = null;
		this.lastYear = null;
		this.emitNewDate();
	}

	public goToToday(): void {
		const date: Date = new Date();
		this.year = date.getFullYear();
		this.month = date.getMonth();
		this.day = date.getDate();
		this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
	}

	public setDay(currentDay: number): void {
		if (!!this.firstDay && !!this.lastDay) {
			this.firstDay = null;
			this.firstMonth = null;
			this.firstYear = null;
			this.lastDay = null;
			this.lastMonth = null;
			this.lastYear = null;
		}

		if (!this.firstDay) {
			this.day = this.getDayForCalendar(currentDay);
			if (this.isDayInPreviousMonth(currentDay)) {
				let newDate: Date = new Date(this.year, this.month, 1);
				newDate.setDate(1);
				newDate.setFullYear(this.year);
				newDate.setMonth(this.month - 1);
				this.month = newDate.getMonth();
				this.year = newDate.getFullYear();
				this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
			} else if (this.isDayInNextMonth(currentDay)) {
				let newDate: Date = new Date(this.year, this.month, 1);
				newDate.setFullYear(this.year);
				newDate.setMonth(this.month + 1);
				this.month = newDate.getMonth();
				this.year = newDate.getFullYear();
				this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
			}

			this.firstDay = this.day;
			this.firstMonth = this.month;
			this.firstYear = this.year;
		} else if (!this.lastDay) {
			this.day = this.getDayForCalendar(currentDay);
			if (this.isDayInPreviousMonth(currentDay)) {
				let newDate: Date = new Date(this.year, this.month, 1);
				newDate.setFullYear(this.year);
				newDate.setMonth(this.month - 1);
				this.month = newDate.getMonth();
				this.year = newDate.getFullYear();
				this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
			} else if (this.isDayInNextMonth(currentDay)) {
				let newDate: Date = new Date(this.year, this.month, 1);
				newDate.setFullYear(this.year);
				newDate.setMonth(this.month + 1);
				this.month = newDate.getMonth();
				this.year = newDate.getFullYear();
				this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
			}

			this.lastDay = this.day;
			this.lastMonth = this.month;
			this.lastYear = this.year;
			this.emitNewDate();
		}
	}

	public isDayToday(currentDay: number): boolean {
		return this.todaysDay === this.getDayForCalendar(currentDay) && this.month === this.todaysMonth && this.year === this.todaysYear && !this.isDayInNextMonth(currentDay) && !this.isDayInPreviousMonth(currentDay);
	}

	public isStartDay(currentDay: number): boolean {
		return (this.firstDay === this.getDayForCalendar(currentDay) && this.isDayInThisMonth(currentDay) && this.firstMonth === this.month && this.firstYear === this.year) || this.isStartDayButInNextOrPreviousMonth(currentDay);
	}

	public isEndDay(currentDay: number): boolean {
		return (this.lastDay === this.getDayForCalendar(currentDay) && this.isDayInThisMonth(currentDay) && this.lastMonth === this.month && this.lastYear === this.year) || this.isEndDayButInNextOrPreviousMonth(currentDay);
	}

	public isDayInRange(currentDay: number): boolean {
		const dateOne: Date = new Date(this.firstYear, this.firstMonth, this.firstDay);
		const dateTwo: Date = new Date(this.lastYear, this.lastMonth, this.lastDay);
		const currentDate: Date = new Date(this.year, this.month, this.getDayForCalendar(currentDay));
		return !!this.firstDay && !!this.lastDay && this.isDayInThisMonth(currentDay) &&
			((dateOne.getTime() < currentDate.getTime() &&
				dateTwo.getTime() > currentDate.getTime()) ||
				(dateOne.getTime() > currentDate.getTime() &&
					dateTwo.getTime() < currentDate.getTime()));
	}

	public isDayInRangeButNotInMonth(currentDay: number): boolean {
		const previousMonth: Date = this.getDateForPrviousMonth(currentDay);
		const nextMonth: Date = this.getDateForNextMonth(currentDay);
		const dateOne: Date = new Date(this.firstYear, this.firstMonth, this.firstDay);
		const dateTwo: Date = new Date(this.lastYear, this.lastMonth, this.lastDay);
		const currentDate: Date = new Date(this.year, this.month, this.getDayForCalendar(currentDay));
		return !!this.firstDay && !!this.lastDay &&
			((this.isDayInNextMonth(currentDay) &&
				((nextMonth.getTime() < dateOne.getTime() && nextMonth.getTime() > dateTwo.getTime()) ||
					(nextMonth.getTime() < dateTwo.getTime() && nextMonth.getTime() > dateOne.getTime()))) ||
				(this.isDayInPreviousMonth(currentDay) &&
					((previousMonth.getTime() < dateOne.getTime() && previousMonth.getTime() > dateTwo.getTime()) ||
						(previousMonth.getTime() < dateTwo.getTime() && previousMonth.getTime() > dateOne.getTime()))));
	}

	private isStartDayButInNextOrPreviousMonth(currentDay: number): boolean {
		let firstMonth: Date = new Date(this.firstYear, this.firstMonth, this.firstDay);
		const previousMonth: Date = this.getDateForPrviousMonth(currentDay);
		const nextMonth: Date = this.getDateForNextMonth(currentDay);

		return (!!this.firstDay || !!this.lastDay) &&
			(this.isDayInNextMonth(currentDay) || this.isDayInPreviousMonth(currentDay)) &&
			(nextMonth.getTime() === firstMonth.getTime() || previousMonth.getTime() === firstMonth.getTime());
	}

	private isEndDayButInNextOrPreviousMonth(currentDay: number): boolean {
		let lastMonth: Date = new Date(this.lastYear, this.lastMonth, this.lastDay);
		const previousMonth: Date = this.getDateForPrviousMonth(currentDay);
		const nextMonth: Date = this.getDateForNextMonth(currentDay);

		return (!!this.firstDay || !!this.lastDay) &&
			(this.isDayInNextMonth(currentDay) || this.isDayInPreviousMonth(currentDay)) &&
			(nextMonth.getTime() === lastMonth.getTime() || previousMonth.getTime() === lastMonth.getTime());
	}

	public navigateToPreviousMonth(): void {
		let newDate: Date = new Date(this.year, this.month, 1);
		newDate.setMonth(newDate.getMonth() - 1);
		this.day = newDate.getDate();
		this.month = newDate.getMonth();
		this.year = newDate.getFullYear();
		this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
	}

	public navigateToNextMonth(): void {
		let newDate: Date = new Date(this.year, this.month, 1);
		newDate.setMonth(newDate.getMonth() + 1);
		this.day = newDate.getDate();
		this.month = newDate.getMonth();
		this.year = newDate.getFullYear();
		this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
	}

	private getDateForPrviousMonth(currentDay: number) {
		let previousMonth: Date = new Date(this.year, this.month, 1);
		previousMonth.setMonth(previousMonth.getMonth() - 1);
		previousMonth.setDate(this.getDayForCalendar(currentDay));

		return previousMonth;
	}

	private getDateForNextMonth(currentDay: number) {
		let nextMonth: Date = new Date(this.year, this.month, 1);
		nextMonth.setMonth(nextMonth.getMonth() + 1);
		nextMonth.setDate(this.getDayForCalendar(currentDay));

		return nextMonth;
	}

	public increaseStartHour() {
		if (this.firstHour === 11) {
			this.displayAmStart = !this.displayAmStart;
		}

		if (this.firstHour === 12) {
			this.firstHour = 1;
		} else {
			this.firstHour++;
		}

		this.emitNewDate();
	}

	public decreaseStartHour() {
		if (this.firstHour === 12) {
			this.displayAmStart = !this.displayAmStart;
		}

		if (this.firstHour === 1) {
			this.firstHour = 12;
		} else {
			this.firstHour--;
		}

		this.emitNewDate();
	}

	public increaseStartMinute() {
		if (this.firstMinute === 59) {
			this.displayAmStart = !this.displayAmStart;
			this.firstMinute = 0;
		} else {
			this.firstMinute++;
		}

		this.emitNewDate();
	}

	public decreaseStartMinute() {
		if (this.firstMinute === 0) {
			this.displayAmStart = !this.displayAmStart;
			this.firstMinute = 59;
		} else {
			this.firstMinute--;
		}

		this.emitNewDate();
	}

	public increaseEndHour() {
		if (this.lastHour === 11) {
			this.displayAmStart = !this.displayAmStart;
		}

		if (this.lastHour === 12) {
			this.lastHour = 1;
		} else {
			this.lastHour++;
		}

		this.emitNewDate();
	}

	public decreaseEndHour() {
		if (this.lastHour === 12) {
			this.displayAmEnd = !this.displayAmEnd;
		}

		if (this.lastHour === 1) {
			this.lastHour = 12;
		} else {
			this.lastHour--;
		}

		this.emitNewDate();
	}

	public increaseEndMinute() {
		if (this.lastMinute === 59) {
			this.displayAmEnd = !this.displayAmEnd;
			this.lastMinute = 0;
		} else {
			this.lastMinute++;
		}

		this.emitNewDate();
	}

	public decreaseEndMinute() {
		if (this.lastMinute === 0) {
			this.displayAmEnd = !this.displayAmEnd;
			this.lastMinute = 59;
		} else {
			this.lastMinute--;
		}

		this.emitNewDate();
	}

	public setHour(hour: number): void {
		if (this.displayStartHours) {
			this.firstHour = hour;
		} else if (this.displayEndHours) {
			this.lastHour = hour;
		}

		this.changeDisplayedControls('time');
		this.emitNewDate();
	}

	public setMinute(minute: number): void {
		if (this.displayStartMinutes) {
			this.firstMinute = minute;
		} else if (this.displayEndMinutes) {
			this.lastMinute = minute;
		}

		this.changeDisplayedControls('time');
		this.emitNewDate();
	}

	public setMonth(newMonth: number): void {
		let newDate: Date = new Date(this.year, newMonth, 1);
		this.day = newDate.getDate();
		this.month = newDate.getMonth();
		this.year = newDate.getFullYear();
		this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
		this.changeDisplayedControls('days');
		this.emitNewDate();
	}

	public setYear(newYear: number): void {
		let newDate: Date = new Date(newYear, this.month, 1);
		this.day = newDate.getDate();
		this.month = newDate.getMonth();
		this.year = newDate.getFullYear();
		this.firstDayOfMonth = new Date(this.year, this.month, 0).getDay();
		this.changeDisplayedControls('months');
		this.emitNewDate();
	}

	public resetYearRange(): void {
		this.yearsRange = _.range(this.todaysYear - 10, this.todaysYear + 11, 1);
	}

	public navigateBackYearRange(): void {
		const start: number = this.yearsRange[0] - 21;
		const end: number = this.yearsRange[this.yearsRange.length - 1] - 20;
		this.yearsRange = _.range(start, end, 1);
	}

	public navigateForwardYearRange(): void {
		const start: number = this.yearsRange[0] + 21;
		const end: number = this.yearsRange[this.yearsRange.length - 1] + 22;
		this.yearsRange = _.range(start, end, 1);
	}

	public numberToDoubleDigitString(value: number): string {
		return ("00" + value).slice(-2);
	}

	public emitNewDate(): void {
		if (!this.firstDay || !this.lastDay) {
			return;
		}

		let firstHourToEmit: number = this.firstHour;
		if (firstHourToEmit === 12 && this.displayAmStart) {
			firstHourToEmit = 0;
		} else if (!this.displayAmStart) {
			firstHourToEmit += 12;
		}
		let lastHourToEmit: number = this.lastHour;
		if (lastHourToEmit === 12 && this.displayAmEnd) {
			lastHourToEmit = 0;
		} else if (!this.displayAmEnd) {
			lastHourToEmit += 12;
		}

		let dateOne: momentImported.Moment = moment({
			'year': this.firstYear,
			'month': this.firstMonth,
			'date': this.firstDay,
			'hours': 0,
			'minute': 0
		});
		let dateTwo: momentImported.Moment = moment({
			'year': this.lastYear,
			'month': this.lastMonth,
			'date': this.lastDay,
			'hours': 0,
			'minute': 0
		});

		let startDate: string;
		let endDate: string;
		if (dateOne.isSameOrBefore(dateTwo)) {
			dateOne.hour(firstHourToEmit);
			dateOne.minute(this.firstMinute);
			dateTwo.hour(lastHourToEmit);
			dateTwo.minute(this.lastMinute);
			startDate = dateOne.utc().format();
			endDate = dateTwo.utc().format();
		} else {
			dateOne.hour(lastHourToEmit);
			dateOne.minute(this.lastMinute);
			dateTwo.hour(firstHourToEmit);
			dateTwo.minute(this.firstMinute);
			endDate = dateOne.utc().format();
			startDate = dateTwo.utc().format();
		}

		this.startDate = startDate;
		this.endDate = endDate;
	}

	public formatFirstDate(): string {
		let dateOne: momentImported.Moment = moment({
			'year': this.firstYear,
			'month': this.firstMonth,
			'date': this.firstDay,
			'hours': 0,
			'minute': 0
		});
		let dateTwo: momentImported.Moment = moment({
			'year': this.lastYear,
			'month': this.lastMonth,
			'date': this.lastDay,
			'hours': 0,
			'minute': 0
		});
		let hourToEmit: number = this.firstHour;
		if (hourToEmit === 12 && this.displayAmStart) {
			hourToEmit = 0;
		} else if (!this.displayAmStart) {
			hourToEmit += 12;
		}

		let startDate: string;
		if (dateOne.isSameOrBefore(dateTwo)) {
			dateOne.hour(hourToEmit);
			dateOne.minute(this.firstMinute);
			startDate = dateOne.format('MMM Do, YYYY hh:mm:ss a');
		} else {
			dateTwo.hour(hourToEmit);
			dateTwo.minute(this.firstMinute);
			startDate = dateTwo.format('MMM Do, YYYY hh:mm:ss a');
		}

		return startDate;
	}

	public formatLastDate(): string {
		let dateOne: momentImported.Moment = moment({
			'year': this.firstYear,
			'month': this.firstMonth,
			'date': this.firstDay,
			'hours': 0,
			'minute': 0
		});
		let dateTwo: momentImported.Moment = moment({
			'year': this.lastYear,
			'month': this.lastMonth,
			'date': this.lastDay,
			'hours': 0,
			'minute': 0
		});
		let hourToEmit: number = this.lastHour;
		if (hourToEmit === 12 && this.displayAmEnd) {
			hourToEmit = 0;
		} else if (!this.displayAmEnd) {
			hourToEmit += 12;
		}

		let endDate: string;
		if (dateOne.isSameOrBefore(dateTwo)) {
			dateTwo.hour(hourToEmit);
			dateTwo.minute(this.lastMinute);
			endDate = dateTwo.format('MMM Do, YYYY hh:mm:ss a');
		} else {
			dateOne.hour(hourToEmit);
			dateOne.minute(this.lastMinute);
			endDate = dateOne.format('MMM Do, YYYY hh:mm:ss a');
		}

		return endDate;
	}
}
