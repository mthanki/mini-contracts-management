import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contract } from '../../../models/contract.model';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../../services/contract.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-contract',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './edit-contract.component.html',
  styleUrl: './edit-contract.component.css'
})
export class EditContractComponent {
  form: FormGroup;
  statuses = ['Active', 'Expired', 'Pending'];

  constructor(
    public dialogRef: MatDialogRef<EditContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contract: Contract },
    private fb: FormBuilder,
    private contractService: ContractService
  ) {
    this.form = this.fb.group({
      title: [data.contract.title, Validators.required],
      party: [data.contract.party, Validators.required],
      status: [data.contract.status, Validators.required],
      startDate: [data.contract.startDate, Validators.required],
      endDate: [data.contract.endDate, Validators.required],
      amount: [data.contract.amount, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.contractService.editContractById(this.data.contract.id, this.form.value);
      this.dialogRef.close({ ...this.data.contract, ...this.form.value });
    }
  }
}
