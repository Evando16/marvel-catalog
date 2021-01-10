import { PAGINATOR_OPTIONS } from './../../comic/comic.constant';
import { CharacterService } from './../character.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let characterServiceSpy: jasmine.SpyObj<CharacterService>;

  beforeEach(async () => {
    characterServiceSpy = jasmine.createSpyObj(
      'CharacterService', ['requestCharacters'],
      {
        paginatorOptions: PAGINATOR_OPTIONS,
        totalCharacters: 1000
      }
    );

    await TestBed.configureTestingModule({
      declarations: [CharacterListComponent],
      providers: [
        { provide: CharacterService, useValue: characterServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
