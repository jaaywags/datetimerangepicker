# Date Time Range Picker


## Overview

This is a date time range picker. It is useful for running reports for records between two dates. It allows the user to easily navigate between years, months, days, hours, and minutes. It was developed for Angular 7.

### Demo
![gif demp](https://media.giphy.com/media/65OQvQTWEQmdOocs76/giphy.gif)

### Example

app.component.html

    <lib-date-time-range-picker
        (onDatePicked)="setDateRange($event)"
        [startDate]="startDate"
        [endDate]="endDate">
    </lib-date-time-range-picker>

app.component.ts


    import { Component } from '@angular/core';

    @Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
    export class AppComponent {
        title = 'date-time-range-picker';
        startDate: string;
        endDate: string;

        public setDateRange(dates: any): void {
            this.startDate = dates.startDate;
            this.endDate = dates.endDate;
        }
    }


### Explanation

This is actually very easy to implement. Three attributes on the selector. One method in you component. Two properties in your component. That is all.

Attributes

* (onDatePicked)="setDateRange($event)"
	* When the user selects the second date, the two dates will be emitted to the setDateRange() function in your component.
	* The $event object will have two properties, startDate and endDate
	* Dates are emitted in UTC

* [startDate]="startDate"
	* This is a property in your component. Type string.
	* Store the emitted startDate in here
	* Should be type UTC

* [endDate]="endDate"
	* This is a property in your component. Type string.
	* Store the emitted endDate in here
	* Should be type UTC


### Notes

* Dates selected by the user are assumed to be in their local time
* Dates emitted to your component are in UTC
* Dates passed into the selectore should be in UTC


## Built With

* [BootStrap](www.getbootstrap.com)
* [FontAwesome](fontawesome.com)
* [Underscore.JS](underscorejs.org)
* [moment.js](momentjs.com)
