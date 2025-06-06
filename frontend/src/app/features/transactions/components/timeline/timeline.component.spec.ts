import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { TimelineComponent } from './timeline.component';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Day, Transaction, TransactionsData } from '../../configs/transaction.types';

describe('TimelineComponent', () => {
  let spectator: Spectator<TimelineComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const createComponent = createComponentFactory({
    component: TimelineComponent,
    mocks: [TransactionService, Router],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    mockTransactionService = spectator.inject(TransactionService);
    mockRouter = spectator.inject(Router);
  });

  it('should fetch transactions on initialization', () => {
    const mockTransactionsData: TransactionsData = {
      days: [
        { id: '2023-01-01', transactions: [{ id: 1, amount: 100, description: 'Test Transaction', timestamp: new Date(), currencyCode: 'USD' }] },
      ],
    };

    mockTransactionService.getTransactions.and.returnValue(of(mockTransactionsData));

    spectator.component.ngOnInit();

    expect(mockTransactionService.getTransactions).toHaveBeenCalled();
    expect(spectator.component.transactionsByDay).toEqual(mockTransactionsData.days);
  });

  it('should navigate to transaction detail on goToTransactionDetail', () => {
    const mockTransaction: Transaction = {
      id: 1, amount: 100, description: 'Test Transaction',
      timestamp: new Date(),
      currencyCode: ''
    };

    spectator.component.goToTransactionDetail(mockTransaction);

    expect(mockTransactionService.setTransactionDetails).toHaveBeenCalledWith(mockTransaction);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/transaction-detail', mockTransaction.id]);
  });
});