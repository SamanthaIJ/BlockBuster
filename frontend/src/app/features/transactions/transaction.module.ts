// src/app/features/transactions/transactions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent } from './components/timeline/timeline.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
    declarations: [],
    imports: [CommonModule, TimelineComponent, DetailsComponent],
    exports: [TimelineComponent],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
      ],
})
export class TransactionsModule {}