import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CharacterHttpService } from './character-http.service';

describe('CharacterService', () => {
  let service: CharacterHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CharacterHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
