import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plan } from '../models/plan';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getAllPlans() {
    return this.http.get<Plan[]>(`${this.baseUrl}/plans`);
  }


    getPlanById(planId: number) {
    return this.http.get<any[]>(
        `${this.baseUrl}/plans?planId=${planId}`
    );
    }


        bookInsurance(bookingData: any) {
    return this.http.post(`${this.baseUrl}/bookings`, bookingData);
    }

    getAllBookings() {
    return this.http.get<any[]>(`${this.baseUrl}/bookings`);
    }



}
