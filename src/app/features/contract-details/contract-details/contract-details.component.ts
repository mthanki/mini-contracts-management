import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { Contract } from '../../../models/contract.model';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contract-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './contract-details.component.html',
  styleUrl: './contract-details.component.css'
})
export class ContractDetailsComponent {
  contract$: Observable<Contract | undefined>;

  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('contractId'));
    this.contract$ = this.contractService.getContractById(id);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
