import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContractService } from '../../../services/contract.service';
import { Contract } from '../../../models/contract.model';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EditContractComponent } from './edit-contract.component';

describe('EditContractComponent', () => {
  let component: EditContractComponent;
  let fixture: ComponentFixture<EditContractComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditContractComponent>>;
  let contractServiceSpy: jasmine.SpyObj<ContractService>;
  let fb: FormBuilder;

  const contract: Contract = {
    id: 1,
    title: 'Test Contract',
    party: 'Test Party',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    amount: 1000
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    contractServiceSpy = jasmine.createSpyObj('ContractService', ['editContractById']);
    fb = new FormBuilder();

    await TestBed.configureTestingModule({
      imports: [EditContractComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { contract } },
        { provide: ContractService, useValue: contractServiceSpy },
        { provide: FormBuilder, useValue: fb }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EditContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with contract data', () => {
    expect(component.form.value.title).toBe(contract.title);
    expect(component.form.value.party).toBe(contract.party);
    expect(component.form.value.status).toBe(contract.status);
    expect(component.form.value.amount).toBe(contract.amount);
  });

  it('should call contractService.editContractById and close dialog on valid submit', () => {
    component.form.setValue({
      title: 'Updated',
      party: 'Updated Party',
      status: 'Expired',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      amount: 2000
    });
    component.onSubmit();
    expect(contractServiceSpy.editContractById).toHaveBeenCalledWith(contract.id, component.form.value);
    expect(dialogRefSpy.close).toHaveBeenCalledWith(jasmine.objectContaining({
      ...contract,
      ...component.form.value
    }));
  });

  it('should not call contractService or close dialog if form is invalid', () => {
    component.form.patchValue({ title: '' });
    component.onSubmit();
    expect(contractServiceSpy.editContractById).not.toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
