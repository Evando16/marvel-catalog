import { SelectFieldService } from './select-field.service';
import { MarvelSelectFieldOption } from './select-field.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-field',
  template: `
    <div class="marvel-select-field">
      <div>
        <label [for]="'marvel-select-field-'+selectFieldService.getSelectFieldCount()" class="mr-8">{{label}}</label>
        <select class="marvel-select-field__select" [(ngModel)]="selectValue" (change)="onChangeSelect()"
          [name]="'marvel-select-field-'+selectFieldService.getSelectFieldCount()"
          [id]="'marvel-select-field-'+selectFieldService.getSelectFieldCount()">
          <option *ngFor="let op of options" [value]="op.value">{{op.description}}</option>
        </select>
      </div>
    </div>
  `,
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit, OnDestroy {

  @Input() public options!: MarvelSelectFieldOption[];
  @Input() public label!: string;
  @Output() public selectChange: EventEmitter<string> = new EventEmitter();
  public selectValue!: string;

  constructor(public readonly selectFieldService: SelectFieldService) { }

  public ngOnInit(): void {
    this.selectValue = this.options[0].value.toString();
    this.selectFieldService.addSelectField();
  }

  public ngOnDestroy(): void {
    this.selectFieldService.removeSelectField();
  }

  public onChangeSelect(): void {
    this.selectChange.emit(this.selectValue);
  }
}
