# Date Time Range Picker


## Overview

This is a date time range picker. It is useful for running reports for records between two dates. It allows the user to easily navigate between years, months, days, hours, and minutes. It was developed for Angular 7.

To install, run:

`npm install @jaaywags/datetimerange-picker`

### Demo
![gif demp](https://thumbs.gfycat.com/WavyDeafeningLeafwing-size_restricted.gif)
[Live Demo](https://stackblitz.com/edit/jaaywagsdatetimerange-picker)

### Implementation

app.component.html
```typescript
<date-time-range-picker
  [(startDate)]="startDate"
  [(endDate)]="endDate">
</date-time-range-picker>
```

app.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'date-time-range-picker';
  startDate: string; // start date will be stored here
  endDate: string; // end date will be stored here
}
```

app.module.ts
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimeRangePickerModule } from '@jaaywags/datetimerange-picker'; // import this line

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateTimeRangePickerModule, // add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

package.json
```json
"styles": [
  "src/styles.css",
  "node_modules/bootstrap/dist/css/bootstrap.min.css" # add this line (also remove this comment)
],
```

Please install the following peer dependencies

`npm install popper.js`

`npm install bootstrap`

`npm install @fortawesome/angular-fontawesome`

`npm install @fortawesome/fontawesome-svg-core`

`npm install @fortawesome/free-regular-svg-icons`

`npm install @fortawesome/free-solid-svg-icons`

`npm install jquery`

`npm install moment`

`npm install underscore`


### Explanation

This is actually very easy to implement. Three attributes on the selector. One method in you component. Two properties in your component. That is all.

Attributes:
* [startDate]="startDate"
	* This is a property in your component. Type string.
	* When user selects the second date, this is updated.
	* If you provide a default datetime, it should be type UTC

* [endDate]="endDate"
	* This is a property in your component. Type string.
	* When user selects the second date, this is updated.
	* If you provide a default datetime, it should be type UTC


### Notes

* Dates selected by the user are assumed to be in their local time
* Dates emitted to your component are in UTC
* Dates passed into the selectore should be in UTC


### Built With

* [BootStrap](www.getbootstrap.com)
* [FontAwesome](fontawesome.com)
* [Underscore.JS](underscorejs.org)
* [moment.js](momentjs.com)


### [My GitHub Repo](https://github.com/jaaywags/datetimerangepicker)
