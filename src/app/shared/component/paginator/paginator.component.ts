import { MarvelPaginator } from './paginator.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PaginatorPageAction } from './paginator.enum';
import { MarvelSelectFieldOption } from './../select-field/select-field.model';

@Component({
  selector: 'marvel-paginator',
  template: `
    <div class="marvel-paginator">
      <marvel-button [disabled]="isPreviousBtnDisabled()" (onClick)="changePage('previous')"><</marvel-button>
      <marvel-button [disabled]="isNextBtnDisabled()" (onClick)="changePage('next')">></marvel-button>
      <span>Current page: {{paginator.page}}</span>
      <marvel-select-field [options]="itemsPerPageOptions" [label]="'Items per page'" (onChange)="onChangeItemsPerPage($event)"></marvel-select-field>
    </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() public total!: number;
  @Input() public itemsPerPageOptions!: MarvelSelectFieldOption[];
  @Output() public onChange: EventEmitter<MarvelPaginator> = new EventEmitter();
  public paginator!: MarvelPaginator;

  public ngOnInit(): void {
    this.paginator = { page: 1, itemsPerPage: 10 };
  }

  public changePage(action: string): void {
    if (action === PaginatorPageAction.PREVIOUS) {
      this.paginator.page--;
    }

    if (action === PaginatorPageAction.NEX) {
      this.paginator.page++;
    }
    this.onChange.emit(this.paginator);
  }

  public onChangeItemsPerPage(itemsPerPage: string): void {
    this.paginator.itemsPerPage = +itemsPerPage;
    this.onChange.emit(this.paginator);
  }

  public isPreviousBtnDisabled(): boolean {
    if (!!!this.total || this.paginator.page === 1) {
      return true;
    }

    return false;
  }

  public isNextBtnDisabled(): boolean {
    const maxPag = Math.floor(this.total / this.paginator.itemsPerPage);
    if (!!!this.total || maxPag === this.paginator.page) {
      return true;
    }

    return false;
  }

}
