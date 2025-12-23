import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../services/insurance.service';
import { Plan } from '../models/plan';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-plans',
  imports : [CommonModule, RouterModule, RouterLink],
  templateUrl: './plans.component.html'
})
export class PlansComponent implements OnInit {

  plans: Plan[] = [];

  constructor(private insuranceService: InsuranceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.insuranceService.getAllPlans().subscribe(data => {
      this.plans = data;
    });
  }
}
