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

  public addLoadingNumber(number: number) {
    if (number < 1) {
      throw new Error('Number must be a positive integer');
    }
    this.loading.update(value => value + number);
  }


  public removeLoading() {
    this.loading.update(value => {
      const result = value - 1;
      return result < 0 ? 0 : result;
    });
  }

  public getIsLoading(): Signal<boolean> {
    return this.isLoading;
  }

}
