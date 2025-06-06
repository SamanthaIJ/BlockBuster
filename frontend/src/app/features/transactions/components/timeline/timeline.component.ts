import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { ConvertToEurPipe } from "../../directives/convert-to-eur.pipe";
import { Router } from '@angular/router';
import { BankaccountComponent } from '../bankaccount/bankaccount.component';
import { Day, Transaction, TransactionsData } from '../../configs/transaction.types';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    imports: [CommonModule, ConvertToEurPipe, BankaccountComponent]
})
export class TimelineComponent implements OnInit {
  transactionsByDay: Day[] = [];

  constructor(
    private transactionService: TransactionService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((data: TransactionsData) => {
      this.transactionsByDay = data.days;
    });
  }

  goToTransactionDetail(transaction: Transaction){
    const transactionId = transaction.id;
    this.transactionService.setTransactionDetails(transaction);
    this.router.navigate(['/transaction-detail', transactionId]);
  }
}