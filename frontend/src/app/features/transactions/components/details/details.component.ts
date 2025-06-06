import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { ConvertToEurPipe } from "../../directives/convert-to-eur.pipe";
import { BankTransferDetailsComponent } from '../bank-transfer-details/bank-transfer-details.component';
import { PaymentRequestComponent } from '../payment-request/payment-request.component';
import { Transaction } from '../../configs/transaction.types';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    imports: [CommonModule, ConvertToEurPipe, BankTransferDetailsComponent, PaymentRequestComponent]
})
export class DetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService) {}
  
    isPositive = false;
    details: Transaction | null = null;

  ngOnInit(): void {  
    this.details = this.transactionService.getTransactionDetails();
    if(!this.details) {
      console.error('Transaction details not found');
      this.router.navigate(['/timeline']);
      return;
    }
    this.isPositive = this.details.amount > 0;
  }

  goToTransactionTimeline() {
    this.transactionService.setTransactionDetails(null);
    this.router.navigate(['/timeline']);
  }
}