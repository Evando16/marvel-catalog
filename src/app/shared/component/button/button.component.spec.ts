import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should emit event on click', () => {
      const eventSpy = spyOn(component.btnClick, 'emit');

      component.onBtnClick();
      expect(eventSpy).toHaveBeenCalledWith();
    });
  });

  describe('Componet tests', () => {
    it('should apply disabled class when button is disabled', () => {
      component.disabled = true;

      fixture.detectChanges();

      expect(compiled.querySelector('.marvel-button')?.classList.contains('marvel-button--disabled')).toBeTrue();
    });

    it('should not apply disabled class when button is not disabled', () => {
      component.disabled = false;

      fixture.detectChanges();

      expect(compiled.querySelector('.marvel-button')?.classList.contains('marvel-button--disabled')).toBeFalse();
    });
  });
});
