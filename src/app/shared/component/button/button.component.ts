import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'marvel-button',
  template: `
    <button class="marvel-button pl-16 pr-16 pt-8 pb-8" [ngClass]="{'marvel-button--disabled': disabled}" (click)="onBtnClick()">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() public disabled!: boolean;
  @Output() public onClick: EventEmitter<void> = new EventEmitter();

  public onBtnClick(): void {
    this.onClick.emit();
  }
}
