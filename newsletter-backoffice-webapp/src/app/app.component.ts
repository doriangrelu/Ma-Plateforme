import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/components/navbar/navbar.component';
import {InfiniteLoaderComponent} from './shared/components/infinite-loader/infinite-loader.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, InfiniteLoaderComponent, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'newsletter-backoffice-webapp';
}
