export class TravelDto {
  id?: number;
  departureAirport?: string;
  arrivalAirport?: string;
  departureDate?: Date;
  arrivalDate?: Date;
  constructor(
    departureAirport?: string,
    arrivalAirport?: string,
    departureDate?: Date,
    arrivalDate?: Date
  ) {
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
  }
}
