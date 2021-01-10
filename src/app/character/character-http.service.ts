import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MARVEL_CHARACTERS_ROUTE } from '../shared/constant/route.constant';
import { DataWrapper } from '../shared/interface/data-wrapper.model';
import { CharacterHttp, Character } from './character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterHttpService {

  constructor(private readonly httpClient: HttpClient) { }

  public async requestCharacterList(offset: number, limit: number, nameStartsWith?: string): Promise<DataWrapper<Character>> {
    let params = new HttpParams({
      fromObject: {
        offset: offset.toString(),
        limit: limit.toString(),
        orderBy: 'name'
      }
    });

    if (!!nameStartsWith) {
      params = params.append('nameStartsWith', nameStartsWith);
    }

    const result: DataWrapper<CharacterHttp> = await this.httpClient
      .get<DataWrapper<CharacterHttp>>(MARVEL_CHARACTERS_ROUTE, { params }).toPromise();
    return {
      ...result,
      data: {
        ...result.data,
        results: this.getCharacters(result.data.results)
      }
    };
  }

  private getCharacters(charactersHttp: CharacterHttp[]): Character[] {
    return [...charactersHttp.map((character: CharacterHttp) => (
      {
        id: character.id,
        name: character.name,
        thumbnail: character.thumbnail
      }
    ))];
  }
}
