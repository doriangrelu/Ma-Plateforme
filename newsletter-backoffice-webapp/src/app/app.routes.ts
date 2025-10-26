import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {canActivateAuthRole} from './shared/guards/auth.guard';
import {NewsletterComponent} from './pages/newsletter/newsletter.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'newsletters',
    component: NewsletterComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: '**',
    component: NewsletterComponent,
  }
];
