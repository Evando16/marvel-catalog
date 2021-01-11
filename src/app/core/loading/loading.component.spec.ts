import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let compiled: HTMLElement;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    loadingServiceSpy = jasmine.createSpyObj(LoadingService, ['isLoading']);
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [{ provide: LoadingService, useValue: loadingServiceSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });


  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Component tests', () => {
    it('should show component when is loading', () => {
      loadingServiceSpy.isLoading.and.returnValue(true);
      fixture.detectChanges();

      expect(compiled.querySelector('.marvel-loading')).toBeTruthy();
    });

    it('should not show component when is not loading', () => {
      loadingServiceSpy.isLoading.and.returnValue(false);
      fixture.detectChanges();

      expect(compiled.querySelector('.marvel-loading')).toBeFalsy();
    });
  });
});
