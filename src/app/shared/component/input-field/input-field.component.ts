import { InputFieldService } from './input-field.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-field',
  template: `
    <div class="marvel-input-field">
      <label [for]="'marvel-input-field-'+inputFieldService.getInputFieldCount()">{{label}}</label>
      <input
        class="marvel-input-field__input"
        [placeholder]="placeholder"
        [(ngModel)]="inputValue"
        name="'marvel-input-field-'+inputFieldService.getInputFieldCount()"
        (keydown.enter)="onKeyPressed()">
    </div>
  `,
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() public placeholder!: string;
  @Input() public label!: string;
  @Output() public keyPressed: EventEmitter<string> = new EventEmitter();
  public inputValue!: string;

  constructor(public readonly inputFieldService: InputFieldService) { }

  public ngOnInit(): void {
    this.inputFieldService.addInputField();
  }

  public onKeyPressed(): void {
    this.keyPressed.emit(this.inputValue);
  }

}
