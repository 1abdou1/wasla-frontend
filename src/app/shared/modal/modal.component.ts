import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TravelService } from 'src/app/service/travel/travel.service';
import { NgxMaterialTimepickerToggleComponent } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-toggle-button/ngx-material-timepicker-toggle.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: '';
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  travelForm: FormGroup;
  @Output() refresh = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private travelService: TravelService
  ) {
    console.log('data', data.date);
    this.travelForm = this._formBuilder.group({
      departureAirport: [''],
      arrivalAirport: [''],
      departureDate: [new Date(data.date)],
      arrivalDate: [new Date(data.date)],
      departureTime: [new Date(data.date)],
      arrivalTime: [new Date(data.date)],
    });
  }
  submitTravel() {
    this.travelForm.value.departureTime = `${this.travelForm.value.departureTime}:00`;
    this.travelForm.value.arrivalTime = `${this.travelForm.value.arrivalTime}:00`;
    console.log('this.travelForm.value', this.travelForm.value);
    this.travelService.create(this.travelForm.value).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (error) => console.log('error', error),
      complete: () => console.log('complete'),
    });
  }
}
