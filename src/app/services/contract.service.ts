import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { Contract } from '../models/contract.model';

@Injectable({ providedIn: 'root' })
export class ContractService {
    private contracts$ = new BehaviorSubject<Contract[]>([]);

    constructor() {
        this.loadContractsFromAssets();
    }

    private loadContractsFromAssets() {
        // @ts-ignore
        import('../../assets/contracts.json').then((module) => {
            // Cast status to the union type for each contract
            const contracts = (module.default ?? module).map((c: any) => ({
                ...c,
                status: c.status as 'Active' | 'Expired' | 'Pending'
            })) as Contract[];
            this.contracts$.next(contracts);
        });
    }

    getContracts(): Observable<Contract[]> {
        return this.contracts$.asObservable();
    }

    getContractById(id: number): Observable<Contract | undefined> {
        return this.contracts$.pipe(
            map(contracts => contracts.find(c => c.id === id))
        );
    }

    updateContract(updated: Contract) {
        const contracts = this.contracts$.value.map(c => c.id === updated.id ? updated : c);
        this.contracts$.next(contracts);
    }

    deleteContract(id: number) {
        const contracts = this.contracts$.value.filter(c => c.id !== id);
        this.contracts$.next(contracts);
    }

    editContractById(id: number, updated: Partial<Contract>) {
        const contracts = this.contracts$.value.map(c =>
            c.id === id ? { ...c, ...updated } : c
        );
        this.contracts$.next(contracts);
    }
}
