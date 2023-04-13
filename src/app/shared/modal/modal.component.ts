import { TravelDto } from './../../dto/travel';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TravelService } from 'src/app/service/travel/travel.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  date: '';
  travels: TravelDto[];
  events: any;
  info?: any;
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
    let departure = '';
    let arrival = '';
    if (this.data.info) {
      const result = this.data.info?.event?._def.title;
      const _result = result.split(' ');
      departure = _result[0];
      arrival = _result[2];
    }

    this.travelForm = this._formBuilder.group({
      departureAirport: [this.data.info ? departure : ''],
      arrivalAirport: [this.data.info ? arrival : ''],
      departureDate: [
        this.data.info
          ? this.data.info?.event._instance.range.start
          : new Date(data.date),
      ],
      arrivalDate: [
        this.data.info
          ? this.data.info?.event._instance.range.end
          : new Date(data.date),
      ],
      departureTime: [''],
      arrivalTime: [''],
    });
  }
  createTravel(travel: TravelDto) {
    this.travelService.create(travel).subscribe({
      next: (response) => {
        this.data.travels.push(response) as unknown as TravelDto[];
        this.data.events = this.data.travels.map((voyage: any) => {
          return {
            title: voyage.departureAirport + ' > ' + voyage.arrivalAirport,
            date: voyage.departureDate,
          };
        });
        window.location.reload();
      },
      error: (error) => console.log('error', error),
      complete: () => console.log('complete'),
    });
  }
  updateTravel(id: string, travel: TravelDto) {
    console.log('travel', travel);
    this.travelService.update(id, travel).subscribe({
      next: (response) => {
        this.data.travels.push(response) as unknown as TravelDto[];
        console.log('update', response);
        this.data.events = this.data.travels.map((voyage: any) => {
          return {
            title: voyage.departureAirport + ' > ' + voyage.arrivalAirport,
            date: voyage.departureDate,
          };
        });
        window.location.reload();
      },
      error: (error) => console.log('error', error),
      complete: () => console.log('complete'),
    });
  }
  submitTravel() {
    console.log('this.data.info++++++++', this.data.info);
    this.travelForm.value.departureTime = `${this.travelForm.value.departureTime}:00`;
    this.travelForm.value.arrivalTime = `${this.travelForm.value.arrivalTime}:00`;
    this.data.info
      ? this.updateTravel(
          this.data.info.event._def.sourceId,
          this.travelForm.value
        )
      : this.createTravel(this.travelForm.value);
  }
}
