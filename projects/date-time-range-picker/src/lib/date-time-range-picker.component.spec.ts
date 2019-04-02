import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeRangePickerComponent } from './date-time-range-picker.component';

describe('DateTimeRangePickerComponent', () => {
  let component: DateTimeRangePickerComponent;
  let fixture: ComponentFixture<DateTimeRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeRangePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
