import {effect, Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading = signal(0);
  private isLoading = signal(false);

  constructor() {
    effect(() => {
      this.isLoading.set(this.loading() > 0);
    });
  }

  public addLoading() {
    this.loading.update(value => value + 1);
  }

  public removeLoading() {
    this.loading.update(value => value - 1);
  }

  public getIsLoading(): Signal<boolean> {
    return this.isLoading;
  }
  
}
