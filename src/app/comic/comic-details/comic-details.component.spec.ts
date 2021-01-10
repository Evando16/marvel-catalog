import { ComicService } from './../comic.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComicDetailsComponent } from './comic-details.component';

describe('ComicDetailsComponent', () => {
  let component: ComicDetailsComponent;
  let fixture: ComponentFixture<ComicDetailsComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let comicServiceSpy: jasmine.SpyObj<ComicService>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', {}, { params: of({ id: 1 }) });
    comicServiceSpy = jasmine.createSpyObj(ComicService, ['getComicById']);

    await TestBed.configureTestingModule({
      declarations: [ComicDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ComicService, useValue: comicServiceSpy }

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDetailsComponent);
    component = fixture.componentInstance;
    comicServiceSpy.getComicById.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
