import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { TimelineComponent } from './timeline.component';
import { TransactionService } from '../../services/transaction.service';
import { Router } from '@angular/router';
import { TransactionsData } from '../../configs/transaction.types';
import { of } from 'rxjs';

describe('TimelineComponent', () => {
  let spectator: Spectator<TimelineComponent>;
  const data = {
    days: [
      {
        id: '2022-11-08',
        transactions: [{
          id: 1,
          timestamp: '2022-11-08T14:30:47.123Z',
          amount: 17.95,
          currencyCode: 'USD',
          currencyRate: 1.173628,
          description: 'Some interesting description',
          otherParty: {
            name: 'Mister XX',
            iban: 'NL00RABO0123456789'
          }
        },{
          id: 2,
          timestamp: '2022-11-08T12:45:47.123Z',
          amount: -25.95,
          currencyCode: 'EUR',
          description: 'Some other interesting description',
          otherParty: {
            name: 'Miss Y',
            iban: 'NL00RABO9876543210'
          }
        },
      ]
      },{
        id: '2022-11-06',
        transactions: [{
          id: 1,
          timestamp: new Date(),
          amount: -38.95,
          currencyCode: 'EUR',
          description: 'Gym',
          otherParty: {
            name: 'Gym be fit',
            iban: 'NL00RABO0123456789'
          }
        }
    ]}
  ]} as TransactionsData;
  
  const routerMock = {
    navigate: jest.fn()
  }
  const transactionServiceMock = {
    getTransactions: jest.fn().mockReturnValue(of(data)),
    setTransactionDetails: jest.fn(),
  }
  const createComponent = createComponentFactory({
    component: TimelineComponent,
    imports:[],
    providers: [
      mockProvider(Router, routerMock),
      mockProvider(TransactionService, transactionServiceMock),
    ],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should fetch transactions on initialization', () => {
    spectator.component.ngOnInit();

    expect(transactionServiceMock.getTransactions).toHaveBeenCalled();
    expect(spectator.component.transactionsByDay).toEqual(data.days);
  });

  it('should navigate to transaction details when clicking on a transaction', () => {
    const transaction = {
      id: 1,
      timestamp: new Date(),
      amount: -38.95,
      currencyCode: 'EUR',
      description: 'Gym',
      otherParty: {
        name: 'Gym be fit',
        iban: 'NL00RABO0123456789'
      }
    }

    const router = spectator.inject(Router);
    spectator.component.goToTransactionDetail(transaction);

    jest.spyOn(router, 'navigate');

    expect(transactionServiceMock.setTransactionDetails).toHaveBeenCalledWith(transaction);
    expect(router.navigate).toHaveBeenCalledWith(['/transaction-detail', 1]);
  });
});