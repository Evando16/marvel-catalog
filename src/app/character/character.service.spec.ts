import { TestBed } from '@angular/core/testing';

import { CharacterHttpService } from './character-http.service';
import { CharacterService } from './character.service';

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
