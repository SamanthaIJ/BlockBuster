import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsModule } from "./features/transactions/transaction.module";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, TransactionsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
