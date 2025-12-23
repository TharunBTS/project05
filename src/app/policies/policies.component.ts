import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsuranceService } from '../services/insurance.service';

@Component({
  selector: 'app-my-policies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './policies.component.html'
})
export class PoliciesComponent implements OnInit {

  policies: any[] = [];

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.insuranceService.getAllBookings().subscribe(data => {
      this.policies = data;
    });
  }
}
