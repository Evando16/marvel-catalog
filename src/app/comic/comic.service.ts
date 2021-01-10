import { ImageUtils } from './../shared/utils/image.utils';
import { PAGINATOR_OPTIONS } from './comic.constant';
import { ComicHttpService } from './comic-http.service';
import { Injectable } from '@angular/core';
import { Card } from '../shared/component/card/card.model';
import { ComicListItem, ComicDetails } from './comic.model';
import { DataWrapper } from '../shared/interface/data-wrapper.model';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  public comicCards: Card[] = [];
  public totalComics!: number;
  public paginatorOptions = PAGINATOR_OPTIONS;

  private comicHttpWrapper!: DataWrapper<ComicListItem>;

  constructor(private readonly comicHttpService: ComicHttpService) { }

  public async requestComics(offset: number, limit: number): Promise<void> {
    this.comicHttpWrapper = await this.comicHttpService.getComics(offset, limit);
    this.totalComics = this.comicHttpWrapper.data.total;
    this.comicCards = this.createCardList(this.comicHttpWrapper.data.results);
  }

  public async getComicById(id: number): Promise<ComicDetails> {
    return (await this.comicHttpService.getComicById(id)).data.results[0];
  }

  private createCardList(result: ComicListItem[]): Card[] {
    return result.map<Card>((comic: ComicListItem) => {
      return {
        id: comic.id,
        title: comic.title,
        thumbnailUrl: ImageUtils.getThumbnailUrl(comic.thumbnail)
      };
    });
  }
}
