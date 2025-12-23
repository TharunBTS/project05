import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InsuranceService } from '../services/insurance.service';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buy.component.html'
})
export class BuyComponent implements OnInit {

  planId!: number;
  selectedPlan!: Plan;

  // User details
  name = '';
  age!: number;
  city = '';
  phone = '';
  email = '';
  hasHealthIssue = false;

  premiumAmount = 0;


  paymentMode = '';
  cardNumber = '';
  paymentFreq = '';
  successMessage = '';


  isFormValid = false;


  constructor(
    private route: ActivatedRoute,
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    this.planId = Number(this.route.snapshot.paramMap.get('id'));

    this.insuranceService.getPlanById(this.planId).subscribe(data => {
      this.selectedPlan = data[0];
      this.premiumAmount = this.selectedPlan.baseAmt;
    });
  }

  calculatePremium() {
    let premium = this.selectedPlan.baseAmt;

    if (this.age > 40) {
      premium += 1000;
    } else if (this.age >= 30) {
      premium += 500;
    }

    if (this.hasHealthIssue) {
      premium += 1000;
    }

    this.premiumAmount = premium;
  }



  buyNow() {
  if (!this.isFormValid) {
    return;
  }

  const bookingData = {
    name: this.name,
    city: this.city,
    phone: this.phone,
    email: this.email,
    age: this.age,
    planId: this.selectedPlan.planId,
    planName: this.selectedPlan.planName,
    validity: this.calculateValidTill(),
    paymentMode: this.paymentMode,
    cardNumber: this.cardNumber,
    premiumAmt: this.premiumAmount,
    paymentFreq: this.paymentFreq
  };

  this.insuranceService.bookInsurance(bookingData).subscribe(() => {
    this.successMessage = '🎉 Insurance Purchased Successfully!';
  });
}



checkFormValidity() {
  if (
    this.name &&
    this.age > 0 &&
    this.city &&
    this.phone.length === 10 &&
    this.email.includes('@') &&
    this.paymentMode &&
    this.cardNumber &&
    this.paymentFreq
  ) {
    this.isFormValid = true;
  } else {
    this.isFormValid = false;
  }
}


calculateValidTill() {
  const today = new Date();
  let validTill = new Date(today);

  if (this.paymentFreq === 'Monthly') {
    validTill.setMonth(today.getMonth() + 1);
  } else if (this.paymentFreq === 'Yearly') {
    validTill.setFullYear(today.getFullYear() + 1);
  }

  return validTill.toDateString();
}







}
