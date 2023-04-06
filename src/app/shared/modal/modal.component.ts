import { TravelDto } from './../../dto/travel';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TravelService } from 'src/app/service/travel/travel.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: '';
  travels: TravelDto[];
  events: any;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  travelForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private travelService: TravelService
  ) {
    this.travelForm = this._formBuilder.group({
      departureAirport: [''],
      arrivalAirport: [''],
      departureDate: [new Date(data.date)],
      arrivalDate: [new Date(data.date)],
      departureTime: [''],
      arrivalTime: [''],
    });
  }
  submitTravel() {
    this.travelForm.value.departureTime = `${this.travelForm.value.departureTime}:00`;
    this.travelForm.value.arrivalTime = `${this.travelForm.value.arrivalTime}:00`;
    this.travelService.create(this.travelForm.value).subscribe({
      next: (response) => {
        this.data.travels.push(response) as unknown as TravelDto[];
        console.log('result', this.data.travels);
        this.data.events = this.data.travels.map((voyage: any) => {
          return {
            title: voyage.departureAirport + ' > ' + voyage.arrivalAirport,
            date: voyage.departureDate,
          };
        });
        window.location.reload();
        console.log('this.data.travels', this.data.travels);
      },
      error: (error) => console.log('error', error),
      complete: () => console.log('complete'),
    });
  }
}
