import { DataWrapper } from './../shared/interface/data-wrapper.model';
import { Character, CharacterHttp } from './character.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { MARVEL_CHARACTERS_ROUTE } from '../shared/constant/route.constant';

import { CharacterHttpService } from './character-http.service';

const characterApiReturnMock: DataWrapper<CharacterHttp> = {
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

describe('CharacterService', () => {
  let service: CharacterHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CharacterHttpService);
    httpMock = TestBed.inject(HttpTestingController);
    environment.marvelPublicKey = '1616';
  });

  afterEach(() => httpMock.verify());

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should request character list', () => {
      const offset = 0;
      const limit = 50;

      const result = service.requestCharacterList(offset, limit);

      const requestMock = httpMock.expectOne(`${MARVEL_CHARACTERS_ROUTE}?offset=${offset}&limit=${limit}&orderBy=name`);
      result.then((data: DataWrapper<Character>) => {
        expect(data).toEqual(characterList);
      });
      requestMock.flush(characterApiReturnMock);
      expect(requestMock.request.method).toEqual('GET');
    });

    it('should request character list with = filter by name', () => {
      const offset = 0;
      const limit = 50;
      const filterName = 'spider';

      const result = service.requestCharacterList(offset, limit, filterName);

      const requestMock = httpMock.expectOne(`${MARVEL_CHARACTERS_ROUTE}?offset=${offset}&limit=${limit}&orderBy=name&nameStartsWith=${filterName}`);
      result.then((data: DataWrapper<Character>) => {
        expect(data).toEqual(characterList);
      });
      requestMock.flush(characterApiReturnMock);
      expect(requestMock.request.method).toEqual('GET');
    });
  });
});
