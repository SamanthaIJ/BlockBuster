import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsModule } from "./features/transactions/transaction.module";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TransactionsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
