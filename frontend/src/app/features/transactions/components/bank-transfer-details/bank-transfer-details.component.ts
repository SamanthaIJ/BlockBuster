import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BANK_ACCOUNT_NUMBER, BANK_ACCOUNT_NAME } from '../../configs/constants';

@Component({
  selector: 'app-bank-transfer-details',
  standalone: true,
  templateUrl: './bank-transfer-details.component.html',
  styleUrls: ['./bank-transfer-details.component.scss'],
  imports: [CommonModule],
})
export class BankTransferDetailsComponent {
    bankAccount = input<string>();
    accountName = input<string>();
    isPositive = input.required<boolean>();
    date = input<Date>();

    BANK_ACCOUNT_NUMBER = BANK_ACCOUNT_NUMBER;
    BANK_ACCOUNT_NAME = BANK_ACCOUNT_NAME;

    get formattedBankAccount (): string {
        return this.bankAccount()?.replace(/(.{4})(.{4})(.{4})(.{4})/, '$1 $2 $3 $4') || '';
    }
}