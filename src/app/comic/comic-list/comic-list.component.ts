import { Component, OnInit } from '@angular/core';

import { Card, Author, Detail } from './../../shared/component/card/card.model';
import { Image } from './../../shared/interface/image.model';
import { Comic, ComicRequest, Creator, CreatorList, CharacterList, Character } from './../comic.model';
import { CardDetailType } from 'src/app/shared/component/card/card-detail-type.enum';
import { ComicService } from './../comic.service';

@Component({
  selector: 'app-comic-list',
  template: `
  <section class="comic-list">
    <div class="comic-list__card-container">
      <marvel-card class="comic-list__card" *ngFor="let card of comicCard" [card]="card"></marvel-card>
    </div>
  </section>
  <!-- <div *ngFor="let item of comics"> {{item | json}}</div> -->
  `,
  styleUrls: ['./comic-list.component.scss']
})
export class ComicListComponent implements OnInit {
  public comicCard: Card[] = [];


  constructor(private readonly comicService: ComicService) { }

  public ngOnInit(): void {
    this.comicService.getComics().subscribe((data: ComicRequest) => {
      this.comicCard = this.createCardList(data.results)
    });
  }

  private createCardList(result: Comic[]): Card[] {
    return result.map<Card>((comic: Comic) => {
      return {
        id: comic.id,
        title: comic.title,
        author: this.getComicAuthors(comic.creators),
        description: comic.description,
        detail: this.getComicDetail(comic.characters),
        thumbnailUrl: this.getComicThumbnailUrl(comic.thumbnail),
        shortDescription: this.getShortDescription(comic.description)
      }
    });
  }

  private getComicThumbnailUrl(thumbnail: Image): string {
    return `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
  }

  private getComicAuthors(author: CreatorList): Author[] {
    return author.items.map<Author>((item: Creator) => ({ ...item }));
  }

  private getComicDetail(characters: CharacterList): Detail[] {
    return characters.items.map<Detail>((item: Character) => {
      return {
        name: item.name,
        detailType: CardDetailType.CHARACTER,
        description: item.role
      }
    })
  }

  private getShortDescription(description: string): string {
    const descriptionMaxSize = 115;
    if (!!description && description.length > descriptionMaxSize) {
      return `${description.slice(0, descriptionMaxSize).trim()}...`
    }

    return description;
  }
}
