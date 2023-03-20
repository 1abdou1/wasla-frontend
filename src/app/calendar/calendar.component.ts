import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';
import { MatDialog } from '@angular/material/dialog';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModuleAlertComponent } from '../shared/module-alert/module-alert.component';
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
export class CalendarComponent {
  constructor(public dialog: MatDialog) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAlert() {
    const dialogRef = this.dialog.open(ModuleAlertComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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

    dateClick: this.openDialog.bind(this),

    // dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      {
        title: 'Meeting',
        start: '2023-03-14T11:30:00',
        extendedProps: {
          status: 'done',
        },
      },
      {
        title: 'Meeting',
        start: '2023-03-15T07:00:00',
        // backgroundColor: 'green',
        // borderColor: 'green',
      },
    ],
    eventColor: '#673ab7',
  };

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
