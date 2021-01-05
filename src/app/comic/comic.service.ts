import { DataWrapper } from './../shared/interface/data-wrapper.model';
import { ComicRequest, Comic } from './comic.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MARVEL_COMICS_ROUTE } from './../shared/constant/route.constant';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private readonly httpClient: HttpClient) { }

  public getComics(): Observable<ComicRequest> {
    return this.httpClient.get<DataWrapper<ComicRequest>>(MARVEL_COMICS_ROUTE)
      .pipe(
        map(hpptResultItem => {
          return {
            ...hpptResultItem.data,
            results: hpptResultItem.data.results.map<Comic>(item => {
              return {
                id: item.id,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
                creators: item.creators,
                characters: item.characters
              };
            })
          }
        })
      )
  }
}
