import { Component, LOCALE_ID, input } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import localeNl from '@angular/common/locales/nl'; 

@Component({
    selector: 'app-payment-request',
    standalone: true,
    templateUrl: './payment-request.component.html',
    styleUrls: ['./payment-request.component.scss'],
    imports: [CommonModule, ModalComponent],
    providers: [{ provide: LOCALE_ID, useValue: 'nl-NL' }]
})
export class PaymentRequestComponent {
    totalAmount = input.required<number>();
    bankAccountName = input<string>();

    constructor() {
        registerLocaleData(localeNl, 'nl-NL');
    }

    isModalVisible = false;
    numberOfPeople = 2;
    includeSelf = true;

  get amountPerPerson(): number {
    const amount = this.includeSelf
      ? Math.abs(this.totalAmount()) / this.numberOfPeople
      : Math.abs(this.totalAmount()) / (this.numberOfPeople - 1);

      return Math.round(amount * 100) / 100;
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  increasePeople() {
    this.numberOfPeople++;
  }

  decreasePeople() {
    if (this.numberOfPeople > 2) {
      this.numberOfPeople--;
    }
  }

  updateNumberOfPeople(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    this.numberOfPeople = value > 1 ? value : 2; 
  }

  toggleIncludeSelf(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.includeSelf = checkbox.checked;
  }

  submitRequest() {
    console.log('Payment request submitted for ', this.numberOfPeople, ' amount: ', this.amountPerPerson );
    console.log('sorry, not going to make this work for now. Greetings from Spain!');
    this.closeModal();
  }
}
