import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Routes, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TimelineComponent } from './app/features/transactions/components/timeline/timeline.component';
import { DetailsComponent } from './app/features/transactions/components/details/details.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { 
    path: 'transaction-detail/:id', 
    component: DetailsComponent, 
  },
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
  ],
}).catch((err) => console.error(err));