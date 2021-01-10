import { ComicService } from './../comic.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicListComponent } from './comic-list.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('ComicListComponent', () => {
  let component: ComicListComponent;
  let fixture: ComponentFixture<ComicListComponent>;
  let comicServiceSpy: jasmine.SpyObj<ComicService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    comicServiceSpy = jasmine.createSpyObj(ComicService, ['getComics', 'getComicById']);
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
    comicServiceSpy.getComics.and.returnValue(of());
    comicServiceSpy.getComicById.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
