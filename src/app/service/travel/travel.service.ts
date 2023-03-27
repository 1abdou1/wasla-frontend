import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TravelDto } from 'src/app/dto/travel';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  // endPoint = process.env.END_POINT;
  constructor(private http: HttpClient) {}
  create(travel: TravelDto): Observable<TravelDto> {
    return this.http.post<TravelDto>('http://localhost:8098/voyages', travel);
  }
  get(): Observable<TravelDto[]> {
    return this.http.get<TravelDto[]>('http://localhost:8098/voyages');
  }
}
