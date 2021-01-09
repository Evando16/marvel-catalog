import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ComicDetails, ComicListItem, CreatorList, ComicHttpDetails, Creator, CharacterList, Character } from './comic.model';
import { DataWrapper } from './../shared/interface/data-wrapper.model';
import { MARVEL_COMICS_ROUTE } from './../shared/constant/route.constant';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private readonly httpClient: HttpClient) { }

  public getComics(offset: number, limit: number): Observable<DataWrapper<ComicListItem>> {
    const params = new HttpParams({ fromObject: { offset: offset.toString(), limit: limit.toString() } });

    return this.httpClient.get<DataWrapper<ComicListItem>>(MARVEL_COMICS_ROUTE, { params })
      .pipe(
        map((httpResult: DataWrapper<ComicListItem>) => {
          return {
            ...httpResult,
            data: {
              ...httpResult.data,
              results: httpResult.data.results.map((comic: ComicListItem) => {
                return {
                  id: comic.id,
                  title: comic.title,
                  thumbnail: comic.thumbnail
                }
              })
            }
          }
        }));
  }

  public getComicById(id: number): Observable<DataWrapper<ComicDetails>> {
    return this.httpClient.get<DataWrapper<ComicHttpDetails>>(`${MARVEL_COMICS_ROUTE}/${id}`)
      .pipe(
        map((httpResult: DataWrapper<ComicHttpDetails>) => {
          return {
            ...httpResult,
            data: {
              ...httpResult.data,
              results: httpResult.data.results.map((comic: ComicHttpDetails) => {
                return {
                  id: comic.id,
                  title: comic.title,
                  description: comic.description,
                  thumbnail: comic.thumbnail,
                  creators: this.mapComicCreators(comic.creators),
                  characters: this.mapComicCharacters(comic.characters),
                }
              })
            }
          }
        })
      );
  }

  private mapComicCreators(creatorList: CreatorList): Creator[] {
    return creatorList.items.map((creator: Creator) => ({ name: creator.name, role: creator.role }));
  }

  private mapComicCharacters(characterList: CharacterList): Character[] {
    return characterList.items.map((character: Character) => ({ name: character.name }));
  }
}
