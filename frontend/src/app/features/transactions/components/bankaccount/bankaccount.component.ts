import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BANK_ACCOUNT_NUMBER, BANK_ACCOUNT_NAME } from '../../configs/constants';

@Component({
    standalone: true,
    selector: 'app-bankaccount',
    templateUrl: './bankaccount.component.html',
    styleUrls: ['./bankaccount.component.scss'],
    imports: [CommonModule]
})
export class BankaccountComponent {
    BANK_ACCOUNT_NUMBER = BANK_ACCOUNT_NUMBER;
    BANK_ACCOUNT_NAME = BANK_ACCOUNT_NAME; 
}