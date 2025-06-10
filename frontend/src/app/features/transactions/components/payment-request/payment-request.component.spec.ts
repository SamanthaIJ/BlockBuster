import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { PaymentRequestComponent } from './payment-request.component';

describe('PaymentRequestComponent', () => {
  let spectator: Spectator<PaymentRequestComponent>;
  const createComponent = createComponentFactory({
    component: PaymentRequestComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        totalAmount: 100,
        bankAccountName: 'John Doe',
      },
    });
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should calculate amount per person correctly when includeSelf is true', () => {
    spectator.component.includeSelf = true;
    spectator.component.numberOfPeople = 4;
    expect(spectator.component.amountPerPerson).toBe(25);
  });

  it('should calculate amount per person correctly when includeSelf is false', () => {
    spectator.component.includeSelf = false;
    spectator.component.numberOfPeople = 4;
    expect(spectator.component.amountPerPerson).toBe(33.33);
  });

  it('should open and close the modal', () => {
    spectator.component.openModal();
    expect(spectator.component.isModalVisible).toBe(true);

    spectator.component.closeModal();
    expect(spectator.component.isModalVisible).toBe(false);
  });

  it('should increase the number of people', () => {
    spectator.component.numberOfPeople = 2;
    spectator.component.increasePeople();
    expect(spectator.component.numberOfPeople).toBe(3);
  });

  it('should decrease the number of people but not go below 2', () => {
    spectator.component.numberOfPeople = 3;
    spectator.component.decreasePeople();
    expect(spectator.component.numberOfPeople).toBe(2);

    spectator.component.decreasePeople();
    expect(spectator.component.numberOfPeople).toBe(2);
  });

  it('should update the number of people from an input event', () => {
    const mockEvent = { target: { value: '5' } } as unknown as Event;
    spectator.component.updateNumberOfPeople(mockEvent);
    expect(spectator.component.numberOfPeople).toBe(5);

    const invalidEvent = { target: { value: '0' } } as unknown as Event;
    spectator.component.updateNumberOfPeople(invalidEvent);
    expect(spectator.component.numberOfPeople).toBe(2);
  });

  it('should toggle includeSelf from a checkbox event', () => {
    const mockEvent = { target: { checked: false } } as unknown as Event;
    spectator.component.toggleIncludeSelf(mockEvent);
    expect(spectator.component.includeSelf).toBe(false);

    const mockEventTrue = { target: { checked: true } } as unknown as Event;
    spectator.component.toggleIncludeSelf(mockEventTrue);
    expect(spectator.component.includeSelf).toBe(true);
  });

  it('should submit the payment request and close the modal', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    spectator.component.submitRequest();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Payment request submitted for ',
      spectator.component.numberOfPeople,
      ' amount: ',
      spectator.component.amountPerPerson
    );
    expect(spectator.component.isModalVisible).toBe(false);
  });
});