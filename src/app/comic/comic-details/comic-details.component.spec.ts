import { ImageUtils } from './../../shared/utils/image.utils';
import { ComicDetails, ComicDetailsStaff } from './../comic.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ComicDetailsComponent } from './comic-details.component';
import { ComicService } from '../comic.service';

const comicDetails: ComicDetails = {
  id: 71400,
  title: ' Superior Spider-Man Vol. 2: Otto-matic (Trade Paperback)',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec quam venenatis, facilisis felis nec, rhoncus ante. Aliquam rhoncus augue aliquet, consequat risus eu, facilisis ipsum.',
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
    },
    {
      name: 'Mike Hawthorne 2',
      role: 'penciller (cover)'
    }
  ],
  characters: [
    {
      name: 'Spider-Man'
    },
    {
      name: 'AlterSpider-Man'
    }
  ]
};

const staffMock: ComicDetailsStaff[] = [
  {
    roleName: 'WRITER',
    creator: [
      'Christos Gage'
    ]
  },
  {
    roleName: 'PENCILLER (COVER)',
    creator: [
      'Mike Hawthorne',
      'Mike Hawthorne 2'
    ]
  }
];

const thumbnailURL = 'http://i.annihil.us/u/prod/marvel/i/mg/c/f0/5df3fc8b3c883/resolution.jpg';

describe('ComicDetailsComponent', () => {
  let component: ComicDetailsComponent;
  let fixture: ComponentFixture<ComicDetailsComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let comicServiceSpy: jasmine.SpyObj<ComicService>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', {}, { params: of({ id: 1 }) });
    comicServiceSpy = jasmine.createSpyObj(ComicService, ['getComicById']);

    await TestBed.configureTestingModule({
      declarations: [ComicDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ComicService, useValue: comicServiceSpy }

      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDetailsComponent);
    component = fixture.componentInstance;
    comicServiceSpy.getComicById.and.returnValue(new Promise((resolve, reject) => { resolve(comicDetails); }));
    spyOn(ImageUtils, 'getThumbnailUrl').and.returnValue(thumbnailURL);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should request comic details on init', async () => {
      activatedRouteSpy.params = of({ id: 1 });

      await component.ngOnInit();

      expect(component.thumbnailURL).toEqual(thumbnailURL);
      expect(component.comic).toEqual(comicDetails);
      expect(component.staff).toEqual(staffMock);
    });
  });

  describe('Componet tests', () => {
    it('should show no staff message when there is no comic staff', () => {
      component.comic = {
        ...comicDetails,
        creators: []
      };
      fixture.detectChanges();

      const message: HTMLParagraphElement | null = compiled.querySelector('#marvel-comic-details__no-comic-staff');
      expect(message?.textContent?.trim()).toEqual('No Staff registred for this comic');
    });

    it('should show no characters message when there is no comic characters', () => {
      component.comic = {
        ...comicDetails,
        characters: []
      };
      fixture.detectChanges();

      const message: HTMLParagraphElement | null = compiled.querySelector('#marvel-comic-details__no-comic-character');
      expect(message?.textContent?.trim()).toEqual('No Characters registred for this comic');
    });
  });
});
