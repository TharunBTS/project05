import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BuyComponent } from './buy/buy.component';
import { HomeComponent } from './home/home.component';
import { PlansComponent } from './plans/plans.component';
import { PoliciesComponent } from './policies/policies.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'plans', component: PlansComponent },
  { path: 'buy/:id', component: BuyComponent },
  { path: 'policies', component: PoliciesComponent }
];
