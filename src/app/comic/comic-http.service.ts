import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
  ComicDetails,
  ComicListItem,
  CreatorList,
  ComicHttpDetails,
  Creator,
  CharacterList,
  ComicCharacter,
  ComicHttp
} from './comic.model';
import { DataWrapper } from '../shared/interface/data-wrapper.model';
import { MARVEL_COMICS_ROUTE } from '../shared/constant/route.constant';

@Injectable({
  providedIn: 'root'
})
export class ComicHttpService {

  constructor(private readonly httpClient: HttpClient) { }

  public async getComics(offset: number, limit: number): Promise<DataWrapper<ComicListItem>> {
    const params = new HttpParams({
      fromObject: {
        offset: offset.toString(),
        limit: limit.toString(),
        orderBy: 'title'
      }
    });

    const result: DataWrapper<ComicHttp> = await this.httpClient.get<DataWrapper<ComicHttp>>(MARVEL_COMICS_ROUTE, { params }).toPromise();
    return {
      ...result,
      data: {
        ...result.data,
        results: this.getComicsResult(result.data.results)
      }
    };
  }

  public async getComicById(id: number): Promise<DataWrapper<ComicDetails>> {
    const result: DataWrapper<ComicHttpDetails> = await this.httpClient.get<DataWrapper<ComicHttpDetails>>(
      `${MARVEL_COMICS_ROUTE}/${id}`).toPromise();

    return {
      ...result,
      data: {
        ...result.data,
        results: result.data.results.map((comic: ComicHttpDetails) => {
          return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            thumbnail: comic.thumbnail,
            creators: this.mapComicCreators(comic.creators),
            characters: this.mapComicCharacters(comic.characters),
          };
        })
      }
    };
  }

  private getComicsResult(comicHttp: ComicHttp[]): ComicListItem[] {
    return comicHttp.map((comic: ComicListItem) => {
      return {
        id: comic.id,
        title: comic.title,
        thumbnail: comic.thumbnail
      };
    });
  }

  private mapComicCreators(creatorList: CreatorList): Creator[] {
    return creatorList.items.map((creator: Creator) => ({ name: creator.name, role: creator.role }));
  }

  private mapComicCharacters(characterList: CharacterList): ComicCharacter[] {
    return characterList.items.map((character: ComicCharacter) => ({ name: character.name }));
  }
}
