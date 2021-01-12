import { Paginator } from './paginator.model';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { PaginatorPageDirection } from './paginator.enum';
import { MarvelSelectFieldOption } from './../select-field/select-field.model';

@Component({
  selector: 'app-paginator',
  template: `
    <div class="marvel-paginator">
      <div class="marvel-paginator__action-container">
        <app-button [disabled]="isPreviousBtnDisabled()" (btnClick)="changePage('previous')"><</app-button>
        <span class="marvel-paginator__page-description">Page {{paginator?.page}} of {{numberOfPage}}</span>
        <app-button [disabled]="isNextBtnDisabled()" (btnClick)="changePage('next')">></app-button>
      </div>
      <app-select-field [options]="itemsPerPageOptions" [label]="'Items per page:'" (selectChange)="onChangeItemsPerPage($event)"></app-select-field>
    </div>
  `,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() public total: number = 0;
  @Input() public itemsPerPageOptions!: MarvelSelectFieldOption[];
  @Output() public paginatorChange: EventEmitter<Paginator> = new EventEmitter();
  public paginator?: Paginator;
  public numberOfPage!: number;

  public ngOnInit(): void {
    this.paginator = { page: 1, itemsPerPage: +this.itemsPerPageOptions[0].value };
    this.setNumberOfPages();
  }

  public ngOnChanges(): void {
    this.setNumberOfPages();
    if (!!this.paginator) {
      this.paginatorChange.emit(this.paginator);
    }
  }

  public changePage(action: string): void {
    if (!!this.paginator) {
      if (action === PaginatorPageDirection.PREVIOUS) {
        this.paginator.page--;
      } else if (action === PaginatorPageDirection.NEXT) {
        this.paginator.page++;
      }

      this.paginatorChange.emit(this.paginator);
    }
  }

  public onChangeItemsPerPage(itemsPerPage: string): void {
    if (!!this.paginator) {
      this.paginator.itemsPerPage = +itemsPerPage;
      this.paginator.page = 1;
      this.paginatorChange.emit(this.paginator);
      this.setNumberOfPages();
    }
  }

  public isPreviousBtnDisabled(): boolean {
    if (!!this.paginator) {
      if (!!!this.total || this.paginator.page === 1) {
        return true;
      }

      return false;
    }

    return true;
  }

  public isNextBtnDisabled(): boolean {
    if (!!this.paginator) {
      const currentOffset = this.paginator.itemsPerPage * this.paginator.page;
      if (!!!this.total || this.total < currentOffset) {
        return true;
      }

      return false;
    }
    return true
  }

  private setNumberOfPages(): void {
    if (!!this.total && !!this.paginator) {
      this.numberOfPage = Math.ceil(this.total / this.paginator.itemsPerPage);
      this.paginator.page = 1;
    }
  }
}
