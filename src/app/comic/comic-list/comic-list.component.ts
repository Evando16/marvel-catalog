import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ComicService } from './../comic.service';
import { PAGINATOR_OPTIONS } from './../comic.constant';
import { Paginator } from './../../shared/component/paginator/paginator.model';

@Component({
  selector: 'app-comic-list',
  template: `
  <section class="comic-list">
    <div class="comic-list__paginator-wrapper">
      <app-paginator class="comic-list__paginator" (paginatorChange)="onChangePage($event)"
        [itemsPerPageOptions]="comicService.paginatorOptions"
        [total]="comicService.totalComics"></app-paginator>
    </div>
    <div class="comic-list__card-container mt-16">
      <app-card class="comic-list__card"
        *ngFor="let card of comicService.comicCards"
        [card]="card" (click)="goToComicDetails(card.id)"></app-card>
    </div>
  </section>
  `,
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {

  constructor(
    public comicService: ComicService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.comicService.requestComics(0, +PAGINATOR_OPTIONS[0].value);
  }

  /**
   * When the paginator component change request the data again using new paginator values
   * @param paginator new paginator values
   */
  public onChangePage(paginator: Paginator): void {
    const offset = paginator.itemsPerPage * (paginator.page - 1);
    this.comicService.requestComics(offset, paginator.itemsPerPage);
  }

  public goToComicDetails(id: number): void {
    this.router.navigate([`/comics/${id}`]);
  }
}
