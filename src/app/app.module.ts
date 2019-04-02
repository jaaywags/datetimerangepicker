import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DateTimeRangePickerModule } from 'date-time-range-picker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	DateTimeRangePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
