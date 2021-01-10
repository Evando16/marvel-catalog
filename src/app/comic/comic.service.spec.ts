import { TestBed } from '@angular/core/testing';
import { Card } from '../shared/component/card/card.model';
import { DataWrapper } from '../shared/interface/data-wrapper.model';
import { ImageUtils } from '../shared/utils/image.utils';
import { ComicHttpService } from './comic-http.service';
import { ComicDetails, ComicListItem } from './comic.model';

import { ComicService } from './comic.service';

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

const cards: Card[] = [
  {
    id: 1011334,
    title: 'Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
    thumbnailUrl: 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883/resolution.jpg'
  }
];

describe('ComicService', () => {
  let service: ComicService;
  let comicHttpServiceSpy: jasmine.SpyObj<ComicHttpService>;

  beforeEach(() => {
    comicHttpServiceSpy = jasmine.createSpyObj(ComicHttpService, ['getComics', 'getComicById']);
    comicHttpServiceSpy.getComicById.and.returnValue(new Promise((resolve, reject) => { resolve(comicDetails); }));
    comicHttpServiceSpy.getComics.and.returnValue(new Promise((resolve, reject) => { resolve(comicsMock); }));
    spyOn(ImageUtils, 'getThumbnailUrl').and.returnValue('http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883/resolution.jpg');

    TestBed.configureTestingModule({
      providers: [
        { provide: ComicHttpService, useValue: comicHttpServiceSpy }
      ]
    });
    service = TestBed.inject(ComicService);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should request comic by id', async () => {
      const result = await service.getComicById(1);
      expect(result).toEqual(comicDetails.data.results[0]);
    });

    it('should request comic by id', async () => {
      const offset = 0;
      const limit = 1;
      await service.requestComics(offset, limit);
      expect(service.totalComics).toEqual(comicsMock.data.total);
      expect(service.comicCards).toEqual(cards);
    });
  });

});
