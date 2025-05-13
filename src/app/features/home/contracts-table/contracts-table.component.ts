import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contract } from '../../../models/contract.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IsExpiringPipe } from '../pipes/is-expiring.pipe';

@Component({
  selector: 'app-contracts-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, IsExpiringPipe],
  templateUrl: './contracts-table.component.html',
  styleUrl: './contracts-table.component.css'
})
export class ContractsTableComponent {
  @Input() contracts: Contract[] = [];
  @Output() edit = new EventEmitter<Contract>();
  @Output() delete = new EventEmitter<Contract>();
  @Output() detail = new EventEmitter<Contract>();

  displayedColumns: string[] = ['title', 'party', 'status', 'startDate', 'endDate', 'amount', 'actions'];

  onEdit(contract: Contract) {
    this.edit.emit(contract);
  }

  onDelete(contract: Contract) {
    this.delete.emit(contract);
  }

  onDetail(contract: Contract) {
    this.detail.emit(contract);
  }
}
