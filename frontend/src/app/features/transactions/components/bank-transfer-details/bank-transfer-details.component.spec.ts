import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { BankTransferDetailsComponent } from './bank-transfer-details.component';
import { BANK_ACCOUNT_NUMBER, BANK_ACCOUNT_NAME } from '../../configs/constants';

describe('BankTransferDetailsComponent', () => {
    let spectator: Spectator<BankTransferDetailsComponent>;

    const createComponent = createComponentFactory({
        component: BankTransferDetailsComponent,
    });

    beforeEach(() => {
        spectator = createComponent({
            props: {
                bankAccount: 'NL91RABO0417164300',
                accountName: 'John Doe',
                isPositive: true,
                date: '2023-10-01',
            },
        });
    });

    it('should create the component', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('should format the bank account correctly', () => {
        expect(spectator.component.formattedBankAccount).toBe('NL91 RABO 0417 1643 00');
    });

    it('should compute account details correctly when isPositive is true', () => {
        const accountDetails = spectator.component.getAccountDetails();
        expect(accountDetails).toEqual({
            from: {
                account: 'NL91 RABO 0417 1643 00',
                accountName: 'John Doe',
            },
            to: {
                account: BANK_ACCOUNT_NUMBER,
                accountName: BANK_ACCOUNT_NAME,
            },
        });
    });

    it('should compute account details correctly when isPositive is false', () => {
        spectator.setInput('isPositive', false);
        spectator.detectChanges();

        const accountDetails = spectator.component.getAccountDetails();
        expect(accountDetails).toEqual({
            from: {
                account: BANK_ACCOUNT_NUMBER,
                accountName: BANK_ACCOUNT_NAME,
            },
            to: {
                account: 'NL91 RABO 0417 1643 00',
                accountName: 'John Doe',
            },
        });
    });
});