import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComicService } from './comic.service';

describe('ComicService', () => {
  let service: ComicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComicService]
    });
    service = TestBed.inject(ComicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
