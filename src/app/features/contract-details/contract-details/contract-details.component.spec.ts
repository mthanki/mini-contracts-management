import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ContractService } from '../../../services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { Contract } from '../../../models/contract.model';
import { Router } from '@angular/router';

import { ContractDetailsComponent } from './contract-details.component';

describe('ContractDetailsComponent', () => {
  let component: ContractDetailsComponent;
  let fixture: ComponentFixture<ContractDetailsComponent>;
  let contractServiceSpy: jasmine.SpyObj<ContractService>;
  let activatedRouteStub: any;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockContract: Contract = {
    id: 1,
    title: 'Test Contract',
    party: 'Test Party',
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    amount: 1000
  };

  beforeEach(async () => {
    contractServiceSpy = jasmine.createSpyObj('ContractService', ['getContractById']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: (key: string) => key === 'contractId' ? '1' : null
        }
      }
    };
    contractServiceSpy.getContractById.and.returnValue(of(mockContract));

    await TestBed.configureTestingModule({
      imports: [ContractDetailsComponent],
      providers: [
        { provide: ContractService, useValue: contractServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contract by id from route', (done) => {
    component.contract$.subscribe(contract => {
      expect(contract).toEqual(mockContract);
      done();
    });
  });

  it('should navigate to /home when goBack is called', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
