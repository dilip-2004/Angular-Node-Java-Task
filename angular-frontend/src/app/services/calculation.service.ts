import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalculationRequest, CalculationResponse } from '../models/calculation.interface';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  private apiUrl = 'http://localhost:5000/api/calculate/';

  constructor(private http: HttpClient) {}

  calculate(payload: CalculationRequest): Observable<CalculationResponse> {
    return this.http.post<CalculationResponse>(this.apiUrl, payload);
  }
}
