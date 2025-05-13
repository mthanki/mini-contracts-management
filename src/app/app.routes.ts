import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ContractDetailsComponent } from './features/contract-details/contract-details/contract-details.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: ':contractId', component: ContractDetailsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];
