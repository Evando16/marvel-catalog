import { ImageUtils } from './../shared/utils/image.utils';
import { DataWrapper } from './../shared/interface/data-wrapper.model';
import { TestBed } from '@angular/core/testing';

import { CharacterHttpService } from './character-http.service';
import { CharacterService } from './character.service';
import { Character } from './character.model';
import { of } from 'rxjs';
import { Card } from '../shared/component/card/card.model';

const characterList: DataWrapper<Character> = {
  code: 200,
  status: 'Ok',
  copyright: '© 2021 MARVEL',
  attributionText: 'Data provided by Marvel. © 2021 MARVEL',
  attributionHTML: '<a href=\"http://marvel.com\">Data provided by Marvel. © 2021 MARVEL</a>',
  etag: '9a60850f148f8341b9c36f34aaa30b1e4dac0d79',
  data: {
    offset: 0,
    limit: 1,
    total: 10,
    count: 1,
    results: [
      {
        id: 1011334,
        name: '3-D Ma',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg'
        }
      }
    ]
  }
};

const cards: Card[] = [
  {
    id: 1011334,
    title: '3-D Ma',
    thumbnailUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/resolution.jpg'
  }
];

describe('CharacterService', () => {
  let service: CharacterService;
  let characterHttpServiceSpy: jasmine.SpyObj<CharacterHttpService>;

  beforeEach(() => {
    characterHttpServiceSpy = jasmine.createSpyObj(CharacterHttpService, ['requestCharacterList']);
    TestBed.configureTestingModule({
      providers: [
        { provide: CharacterHttpService, useValue: characterHttpServiceSpy }
      ]
    });
    service = TestBed.inject(CharacterService);
    characterHttpServiceSpy.requestCharacterList.and.returnValue(new Promise((resolve, reject) => { resolve(characterList); }));
    spyOn(ImageUtils, 'getThumbnailUrl').and.returnValue('http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/resolution.jpg');
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should request character list', async () => {
      const offset = 0;
      const limit = 50;

      await service.requestCharacters(offset, limit);
      expect(service.totalCharacters).toEqual(characterList.data.total);
      expect(service.characterCards).toEqual(cards);
    });
  });
});
