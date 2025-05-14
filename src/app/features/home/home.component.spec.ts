import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContractService } from '../../services/contract.service';
import { Contract } from '../../models/contract.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let contractServiceSpy: jasmine.SpyObj<ContractService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockContracts: Contract[] = [
    { id: 1, title: 'Contract A', party: 'Party X', status: 'Active', startDate: '2024-01-01', endDate: '2025-01-01', amount: 1000 },
    { id: 2, title: 'Contract B', party: 'Party Y', status: 'Expired', startDate: '2023-01-01', endDate: '2024-01-01', amount: 2000 },
    { id: 3, title: 'Contract C', party: 'Party X', status: 'Pending', startDate: '2025-01-01', endDate: '2026-01-01', amount: 3000 }
  ];

  beforeEach(async () => {
    contractServiceSpy = jasmine.createSpyObj('ContractService', ['getContracts', 'deleteContract']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    contractServiceSpy.getContracts.and.returnValue(of(mockContracts));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: ContractService, useValue: contractServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contracts and calculate totalContracts and totalValue', () => {
    expect(component.contracts.length).toBe(3);
    expect(component.totalContracts).toBe(3);
    expect(component.totalValue).toBe(6000);
  });

  it('should filter contracts by title', () => {
    component.searchTitle = 'Contract A';
    component.applyFilters();
    expect(component.filteredContracts.length).toBe(1);
    expect(component.filteredContracts[0].title).toBe('Contract A');
  });

  it('should filter contracts by status', () => {
    component.filterStatus = 'Expired';
    component.applyFilters();
    expect(component.filteredContracts.length).toBe(1);
    expect(component.filteredContracts[0].status).toBe('Expired');
  });

  it('should filter contracts by party', () => {
    component.filterParty = 'Party X';
    component.applyFilters();
    expect(component.filteredContracts.length).toBe(2);
    expect(component.filteredContracts.every(c => c.party === 'Party X')).toBeTrue();
  });

  it('should call dialog.open when editContract is called', () => {
    const contract = mockContracts[0];
    component.editContract(contract);
    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should call contractService.deleteContract and update contracts when deleteContract is called', () => {
    const contract = mockContracts[0];
    component.deleteContract(contract);
    expect(contractServiceSpy.deleteContract).toHaveBeenCalledWith(contract.id);
    expect(component.contracts.find(c => c.id === contract.id)).toBeUndefined();
  });

  it('should navigate to contract detail when openDetail is called', () => {
    const contract = mockContracts[0];
    component.openDetail(contract);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/', contract.id]);
  });
});
