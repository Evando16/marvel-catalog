import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputFieldService {

  private InputFieldCount = 0;

  public addInputField(): void {
    this.InputFieldCount++;
  }

  public removeInputField(): void {
    if (this.InputFieldCount > 1) {
      this.InputFieldCount--;
    }
  }

  public getInputFieldCount(): number {
    return this.InputFieldCount;
  }
}
