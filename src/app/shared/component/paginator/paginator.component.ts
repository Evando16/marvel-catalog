import { Paginator } from './paginator.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaginatorPageDirection } from './paginator.enum';
import { MarvelSelectFieldOption } from './../select-field/select-field.model';

@Component({
  selector: 'app-paginator',
  template: `
    <div class="marvel-paginator">
      <app-button [disabled]="isPreviousBtnDisabled()" (btnClick)="changePage('previous')"><</app-button>
      <app-button [disabled]="isNextBtnDisabled()" (btnClick)="changePage('next')">></app-button>
      <span>Current page: {{paginator.page}}</span>
      <app-select-field [options]="itemsPerPageOptions" [label]="'Items per page'" (selectChange)="onChangeItemsPerPage($event)"></app-select-field>
    </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() public total!: number;
  @Input() public itemsPerPageOptions!: MarvelSelectFieldOption[];
  @Output() public paginatorChange: EventEmitter<Paginator> = new EventEmitter();
  public paginator!: Paginator;

  public ngOnInit(): void {
    this.paginator = { page: 1, itemsPerPage: +this.itemsPerPageOptions[0].value };
  }

  public changePage(action: string): void {
    if (action === PaginatorPageDirection.PREVIOUS) {
      this.paginator.page--;
    } else if (action === PaginatorPageDirection.NEXT) {
      this.paginator.page++;
    }

    this.paginatorChange.emit(this.paginator);
  }

  public onChangeItemsPerPage(itemsPerPage: string): void {
    this.paginator.itemsPerPage = +itemsPerPage;
    this.paginatorChange.emit(this.paginator);
  }

  public isPreviousBtnDisabled(): boolean {
    if (!!!this.total || this.paginator.page === 1) {
      return true;
    }

    return false;
  }

  public isNextBtnDisabled(): boolean {
    const currentOffset = this.paginator.itemsPerPage * this.paginator.page;
    if (!!!this.total || this.total < currentOffset) {
      return true;
    }

    return false;
  }

}
