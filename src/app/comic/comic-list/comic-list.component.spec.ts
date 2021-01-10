import { PAGINATOR_OPTIONS } from './../comic.constant';
import { ComicHttpService } from '../comic-http.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicListComponent } from './comic-list.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ComicService } from '../comic.service';
import { Paginator } from 'src/app/shared/component/paginator/paginator.model';

describe('ComicListComponent', () => {
  let component: ComicListComponent;
  let fixture: ComponentFixture<ComicListComponent>;
  let comicServiceSpy: jasmine.SpyObj<ComicService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    comicServiceSpy = jasmine.createSpyObj(ComicService, ['requestComics']);
    routerSpy = jasmine.createSpyObj(Router, ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ComicListComponent],
      providers: [
        { provide: ComicService, useValue: comicServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicListComponent);
    component = fixture.componentInstance;
    // Create a objet to be used in this of
    // ComicHttpServiceSpy.getComics.and.returnValue(of());
    // ComicHttpServiceSpy.getComicById.and.returnValue(of());
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should request comic on init', () => {
      const offset = 0;
      component.ngOnInit();
      expect(comicServiceSpy.requestComics).toHaveBeenCalledWith(offset, +PAGINATOR_OPTIONS[0].value);
    });

    it('should request comics on change page', () => {
      const offset = 10;
      const paginator: Paginator = { page: 2, itemsPerPage: 10 };

      component.onChangePage(paginator);

      expect(comicServiceSpy.requestComics).toHaveBeenCalledWith(offset, paginator.itemsPerPage);
    });

    it('should redirect to comics details', () => {
      const comicId = 16;
      component.goToComicDetails(comicId);
      expect(routerSpy.navigate).toHaveBeenCalledWith([`/comics/${comicId}`]);
    });

  });
});
