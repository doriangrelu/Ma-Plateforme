import {Component, inject} from '@angular/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-infinite-loader',
  imports: [
    MatProgressBar
  ],
  templateUrl: './infinite-loader.component.html',
  styleUrl: './infinite-loader.component.css'
})
export class InfiniteLoaderComponent {

  private readonly loader = inject(LoaderService);
  protected readonly isLoading = this.loader.getIsLoading();

}
