import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    title = input<string>('');
    isVisible = input<boolean>(false);
    closeModal = output<void>();

    close() {
        this.closeModal.emit();
    }
}