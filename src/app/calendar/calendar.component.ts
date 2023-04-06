import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import tippy from 'tippy.js';
import { formatDate } from '@angular/common';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModuleAlertComponent } from '../shared/module-alert/module-alert.component';
import { TravelService } from '../service/travel/travel.service';
import { TravelDto } from '../dto/travel';
import {FullCalendarComponent} from "@fullcalendar/angular";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit, AfterViewInit{
  format = 'dd/MM/yyyy';
  locale = 'en-Us';
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  calendarApi: any;
  constructor(
    public dialog: MatDialog,
    private travelService: TravelService,
    private changeDetector: ChangeDetectorRef
  ) {}

  travels: TravelDto[] = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit(): void {
    this.getTravels();
  }
  ngAfterViewInit() {
    this.calendarApi = this.calendarComponent.getApi();
  }
  getTravels() {
    this.travelService.get().subscribe({
      next: (response) => {
        this.travels = response;
        this.calendarOptions.events = this.travels.map((voyage) => {
          return {
            title: voyage.departureAirport + ' > ' + voyage.arrivalAirport,
            date: voyage.departureDate,
          };
        });
      },
      error: (error) => console.log('error', error),
      complete: () => console.log('complete'),
    });
  }
  matcher = new MyErrorStateMatcher();

  openDialogAlert() {
    const dialogRef = this.dialog.open(ModuleAlertComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.getTravels();
      this.changeDetector.detectChanges();
    });
  }
  calendarOptions: CalendarOptions = {
    height: 600,
    selectable: true,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    customButtons: {
      myCustomButton: {
        text: 'Alerte',
        click: this.openDialogAlert.bind(this),
      },
    },
    headerToolbar: {
      left: 'title',
      right:
        'myCustomButton, dayGridMonth,timeGridWeek,timeGridDay,listWeek,prev,next', // user can switch between the two
    },
    eventDidMount: (info) => {
      console.log('infos', info.event);
      tippy(info.el, {
        content: `<span>${info.event.title}</span><br> ${formatDate(
          new Date(String(info.event._instance?.range.start)),
          this.format,
          this.locale
        )} >> ${formatDate(
          new Date(String(info.event._instance?.range.end)),
          this.format,
          this.locale
        )} `,
        allowHTML: true,
      });
    },
    eventClick: (info) => {},
    dateClick: (info) => {
      console.log(info.dateStr);
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {
          date: info.dateStr,
          travels: this.getTravels(),
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        travels: this.getTravels();
        this.calendarApi.refetchEvents();
      });
    },

    // dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: this.travels as unknown as EventSourceInput,
    eventColor: '#673ab7',
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
