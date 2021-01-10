import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComicHttpService } from './comic-http.service';
import { ComicListItem, ComicHttp, ComicDetails, ComicHttpDetails } from './comic.model';
import { DataWrapper } from '../shared/interface/data-wrapper.model';
import { environment } from 'src/environments/environment';
import { MARVEL_COMICS_ROUTE } from '../shared/constant/route.constant';

const comicApiReturnMock: DataWrapper<ComicHttp> = {
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
        title: 'Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883',
          extension: 'jpg'
        }
      }
    ]
  }
};

const comicsMock: DataWrapper<ComicListItem> = {
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
        title: 'Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883',
          extension: 'jpg'
        }
      }
    ]
  }
};

const comicDetailsMock: DataWrapper<ComicHttpDetails> = {
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
        title: ' Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
        description: 'Description',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883',
          extension: 'jpg'
        },
        creators: {
          items: [
            {
              name: 'Christos Gage',
              role: 'writer'
            },
            {
              name: 'Mike Hawthorne',
              role: 'penciller (cover)'
            }
          ]
        },
        characters: {
          items: [
            {
              name: 'Spider-Man'
            }
          ]
        }
      }
    ]
  }
};

const comicDetails: DataWrapper<ComicDetails> = {
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
        title: ' Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
        description: 'Description',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883',
          extension: 'jpg'
        },
        creators: [
          {
            name: 'Christos Gage',
            role: 'writer'
          },
          {
            name: 'Mike Hawthorne',
            role: 'penciller (cover)'
          }
        ],
        characters: [
          {
            name: 'Spider-Man'
          }
        ]
      }
    ]
  }
};

describe('ComicHttpService', () => {
  let service: ComicHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComicHttpService]
    });
    service = TestBed.inject(ComicHttpService);
    httpMock = TestBed.inject(HttpTestingController);
    environment.marvelPublicKey = '1616';
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should request comic list', () => {
      const offset = 10;
      const limit = 1;

      const result = service.getComics(offset, limit);
      const requestMock = httpMock.expectOne(`${MARVEL_COMICS_ROUTE}?offset=${offset}&limit=${limit}&orderBy=title`);
      result.then((data: DataWrapper<ComicListItem>) => {
        expect(data).toEqual(comicsMock);
      });
      requestMock.flush(comicApiReturnMock);
      expect(requestMock.request.method).toEqual('GET');
    });

    it('should request comic details', () => {
      const id = 16;

      const result = service.getComicById(id);
      const requestMock = httpMock.expectOne(`${MARVEL_COMICS_ROUTE}/${id}`);
      result.then((data: DataWrapper<ComicDetails>) => {
        expect(data).toEqual(comicDetails);
      });
      requestMock.flush(comicDetailsMock);
      expect(requestMock.request.method).toEqual('GET');
    });
  });
});
