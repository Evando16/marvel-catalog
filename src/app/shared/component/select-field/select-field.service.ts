import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectFieldService {
  private selectFieldCount: number = 0;

  public addSelectField(): void {
    this.selectFieldCount++;
  }

  public removeSelectField(): void {
    if (this.selectFieldCount > 1) {
      this.selectFieldCount--;
    }
  }

  public getSelectFieldCount(): number {
    return this.selectFieldCount;
  }
}
