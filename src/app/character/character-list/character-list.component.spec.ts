import { Paginator } from './../../shared/component/paginator/paginator.model';
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

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should request characters list on init', () => {
      const offset = 0;
      const itemsPerPage = +PAGINATOR_OPTIONS[0].value;

      expect(characterServiceSpy.requestCharacters).toHaveBeenCalledWith(offset, itemsPerPage);
    });

    it('should request characters on change page', () => {
      const offset = 10;
      const paginator: Paginator = { page: 2, itemsPerPage: 10 };

      component.onChangePage(paginator);

      expect(characterServiceSpy.requestCharacters).toHaveBeenCalledWith(offset, paginator.itemsPerPage, undefined);
    });

    it('should request characters on change filter', () => {
      const offset = 0;
      const itemsPerPage = +PAGINATOR_OPTIONS[0].value;
      const filterValue = 'character name';

      component.onFilterChange(filterValue);

      expect(characterServiceSpy.requestCharacters).toHaveBeenCalledWith(offset, itemsPerPage, filterValue);
    });
  });
});
