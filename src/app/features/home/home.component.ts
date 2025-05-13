import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from '../../services/contract.service';
import { Contract } from '../../models/contract.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { EditContractComponent } from './edit-contract/edit-contract.component';
import { ContractsTableComponent } from './contracts-table/contracts-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    ContractsTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contracts: Contract[] = [];
  filteredContracts: Contract[] = [];
  searchTitle = '';
  filterStatus = '';
  filterParty = '';
  statuses: string[] = [];
  parties: string[] = [];
  totalContracts = 0;
  totalValue = 0;

  constructor(
    private contractService: ContractService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.contractService.getContracts().subscribe(contracts => {
      this.contracts = contracts;
      this.statuses = Array.from(new Set(contracts.map(c => c.status)));
      this.parties = Array.from(new Set(contracts.map(c => c.party)));
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredContracts = this.contracts.filter(contract => {
      const matchesTitle = !this.searchTitle || contract.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesStatus = !this.filterStatus || contract.status === this.filterStatus;
      const matchesParty = !this.filterParty || contract.party === this.filterParty;
      return matchesTitle && matchesStatus && matchesParty;
    });
    this.totalContracts = this.filteredContracts.length;
    this.totalValue = this.filteredContracts.reduce((sum, c) => sum + c.amount, 0);
  }

  editContract(contract: Contract) {
    this.dialog.open(EditContractComponent, {
      width: '95vw',
      data: { contract },
      panelClass: 'custom-dialog-container'
    });
  }

  deleteContract(contract: Contract) {
    this.contractService.deleteContract(contract.id);
    this.contracts = this.contracts.filter(c => c.id !== contract.id);
    this.applyFilters();
  }

  openDetail(contract: Contract) {
    this.router.navigate(['/', contract.id]);
  }
}
