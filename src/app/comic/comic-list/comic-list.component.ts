import { ImageUtils } from './../../shared/utils/image.utils';
import { DataWrapper } from './../../shared/interface/data-wrapper.model';
import { PAGINATOR_OPTIONS } from './../comic.constant';
import { Component, OnInit } from '@angular/core';

import { Card } from './../../shared/component/card/card.model';
import { ComicListItem } from './../comic.model';
import { ComicService } from './../comic.service';
import { Paginator } from './../../shared/component/paginator/paginator.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comic-list',
  template: `
  <section class="comic-list">
    <app-paginator (paginatorChange)="onChangePage($event)" [itemsPerPageOptions]="paginatorOptions" [total]="totalComics"></app-paginator>
    <div class="comic-list__card-container">
      <app-card class="comic-list__card" *ngFor="let card of comicCards" [card]="card" (click)="goToComicDetails(card.id)"></app-card>
    </div>
  </section>
  `,
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
  public comicCards: Card[] = [];
  public totalComics!: number;
  public paginatorOptions = PAGINATOR_OPTIONS;

  constructor(
    private readonly comicService: ComicService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.requestComics(0, +PAGINATOR_OPTIONS[0].value);
  }

  public onChangePage(action: Paginator): void {
    const offset = action.itemsPerPage * (action.page - 1);
    this.requestComics(offset, action.itemsPerPage);
  }

  public goToComicDetails(id: number): void {
    this.router.navigate([`/comics/${id}`]);
  }

  private createCardList(result: ComicListItem[]): Card[] {
    return result.map<Card>((comic: ComicListItem) => {
      return {
        id: comic.id,
        title: comic.title,
        thumbnailUrl: ImageUtils.getComicThumbnailUrl(comic.thumbnail)
      };
    });
  }

  private requestComics(offset: number, limit: number): void {
    this.comicService.getComics(offset, limit).subscribe((result: DataWrapper<ComicListItem>) => {
      this.totalComics = result.data.total;
      this.comicCards = this.createCardList(result.data.results);
    });
  }
}
