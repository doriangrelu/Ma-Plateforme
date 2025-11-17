import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {canActivateAuthRole} from './shared/guards/auth.guard';
import {NewsletterComponent} from './pages/newsletter/newsletter.component';
import {NewsletterDetailsComponent} from './pages/newsletter/details/newsletter-details.component';
import {TemplatesComponent} from './pages/templates/templates.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'newsletters',
    canActivate: [canActivateAuthRole],
    children: [
      {path: '', component: NewsletterComponent},
      {path: ':newsletterId', component: NewsletterDetailsComponent},
    ]
  },
  {
    path: '**',
    component: NewsletterComponent,
  }
];
