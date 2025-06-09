import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BANK_ACCOUNT_NUMBER, BANK_ACCOUNT_NAME } from '../../configs/constants';

@Component({
    standalone: true,
    selector: 'app-bank-transfer-details',
    templateUrl: './bank-transfer-details.component.html',
    styleUrls: ['./bank-transfer-details.component.scss'],
    imports: [CommonModule]
})
export class BankTransferDetailsComponent {
    bankAccount = input<string>();
    accountName = input<string>();
    isPositive = input.required<boolean>();
    date = input<Date| string>();

    get formattedBankAccount (): string {
        return this.bankAccount()?.replace(/(.{4})(.{4})(.{4})(.{4})/, '$1 $2 $3 $4') || '';
    }

    getAccountDetails = computed(() => {
        const isPositive = this.isPositive();
    
        return {
            from: {
                account: isPositive ? this.formattedBankAccount : BANK_ACCOUNT_NUMBER,
                accountName: isPositive ? this.accountName() : BANK_ACCOUNT_NAME,
            },
            to: {
                account: isPositive ? BANK_ACCOUNT_NUMBER : this.formattedBankAccount,
                accountName: isPositive ? BANK_ACCOUNT_NAME : this.accountName(),
            },
        };
    });
}