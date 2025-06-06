import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Transaction, TransactionsData } from '../configs/transaction.types';

@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    constructor(private http: HttpClient) {}

    private transactionsCache: TransactionsData | null = null ;
    private cacheTimestamp: number | null = null;
    private cacheDuration: number = 5 * 60 * 1000; 
    private details: Transaction | null = null;

    getTransactions(): Observable<TransactionsData> {
        const now = Date.now();

        if (this.cacheTimestamp && now - this.cacheTimestamp < this.cacheDuration && this.transactionsCache) {
            return of(this.transactionsCache);
        }

        return this.http.get<TransactionsData>('http://localhost:8080/api/transactions').pipe(
            tap((transactions) => {
                this.transactionsCache = transactions;
                this.cacheTimestamp = Date.now(); 
            })
        );
    }

    setTransactionDetails(transaction: Transaction | null) {
        this.details = transaction;
    }

    getTransactionDetails(): Transaction | null {
        return this.details;
    }
}