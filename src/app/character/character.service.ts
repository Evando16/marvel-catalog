import { PAGINATOR_OPTIONS } from './../comic/comic.constant';
import { DataWrapper } from './../shared/interface/data-wrapper.model';
import { CharacterHttpService } from './character-http.service';
import { ImageUtils } from './../shared/utils/image.utils';
import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { Card } from '../shared/component/card/card.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  public characterCards: Card[] = [];
  public paginatorOptions = PAGINATOR_OPTIONS;
  public totalCharacters!: number;

  private charactersHttpWrapper!: DataWrapper<Character>;

  constructor(private readonly characterHttpService: CharacterHttpService) { }

  public async requestCharacters(offset: number, limit: number, nameStartsWith?: string): Promise<void> {
    this.charactersHttpWrapper = await this.characterHttpService.requestCharacterList(offset, limit, nameStartsWith);
    this.characterCards = this.createCharacterCards(this.charactersHttpWrapper.data.results);
    this.totalCharacters = this.charactersHttpWrapper.data.total;
  }

  private createCharacterCards(characters: Character[]): Card[] {
    return characters.map((character: Character) => ({
      id: character.id,
      title: character.name,
      thumbnailUrl: ImageUtils.getThumbnailUrl(character.thumbnail)
    }));
  }
}
