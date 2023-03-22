import { Time } from "@angular/common";

export class TravelDto {
  id?: number;
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: Date;
  arrivalDate?: Date;
  departureTime: Time;
  arrivalTime: Time;
  constructor(
    departureAirport?: string,
    arrivalAirport?: string,
    departureDate?: Date,
    arrivalDate?: Date,
    departureTime?: Time,
    arrivalTime?: Time,
  ) {
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.departureTime = departureTime as Time;
    this.arrivalTime = arrivalTime as Time;
  }
}
