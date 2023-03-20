import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    SharedModule,
  ],
  exports: [CalendarComponent],
})
export class CalendarModule {}
