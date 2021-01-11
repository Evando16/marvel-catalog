import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading = false;

  constructor() { }

  public startLoading(): void {
    this.loading = true;
  }

  public stopLoading(): void {
    this.loading = false;
  }

  public isLoading(): boolean {
    return this.loading;
  }
}
