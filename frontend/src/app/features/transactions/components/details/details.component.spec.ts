import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { DetailsComponent } from './details.component';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../configs/transaction.types';

describe('DetailsComponent', () => {
  let spectator: Spectator<DetailsComponent>;
  const transactionMock: Transaction = {
    id: 123,
    timestamp: new Date(),
    amount: 100,
    currencyCode: 'EUR',
    currencyRate: 1,
    description: 'Test transaction',
    otherParty: {
      name: 'Test Recipient',
      iban: 'NL91ABNA0417164300',
    },
  };

  const createComponent = createComponentFactory({
    component: DetailsComponent,
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(new Map().set('id', '123')),
          snapshot: {
            paramMap: new Map([['id', '123']]),
          },
        },
      },
      {
        provide: Router,
        useValue: {
          navigate: jest.fn(),
        },
      },
      {
        provide: TransactionService,
        useValue: {
          getTransactionDetails: jest.fn().mockReturnValue(transactionMock),
          setTransactionDetails: jest.fn(),
        },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(spectator.component.details).toEqual(transactionMock);
    expect(spectator.component.isPositive).toBe(true);
  });

  it('should navigate back to timeline on button click', () => {
    spectator.component.goToTransactionTimeline();
    const transactionService = spectator.inject(TransactionService);
    const router = spectator.inject(Router);

    expect(transactionService.setTransactionDetails).toHaveBeenCalledWith(null);
    expect(router.navigate).toHaveBeenCalledWith(['/timeline']);
  });
});