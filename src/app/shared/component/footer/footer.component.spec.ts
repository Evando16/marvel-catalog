import { FooterService } from './footer.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let compiled: HTMLElement;
  let footerServiceSpy: jasmine.SpyObj<FooterService>;

  beforeEach(async () => {
    footerServiceSpy = jasmine.createSpyObj(FooterService, ['getFooter']);
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [
        { provide: FooterService, useValue: footerServiceSpy }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Unit test', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Componet tests', () => {
    it('should show footer when there is footer data', () => {
      footerServiceSpy.getFooter.and.returnValue('<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>');
      fixture.detectChanges();

      expect(compiled.querySelector('.marvel-footer')).not.toBeNull();
    });

    it('should not show footer when there is no footer data', () => {
      footerServiceSpy.getFooter.and.returnValue('');
      fixture.detectChanges();

      expect(compiled.querySelector('.marvel-footer')).toBeNull();
    });
  });
});
