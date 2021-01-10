import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldService } from './input-field.service';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;
  let inputFieldServiceSpy: jasmine.SpyObj<InputFieldService>;

  beforeEach(async () => {
    inputFieldServiceSpy = jasmine.createSpyObj(InputFieldService, ['addInputField', 'getInputFieldCount', 'removeInputField']);

    await TestBed.configureTestingModule({
      declarations: [InputFieldComponent],
      providers: [
        { provide: InputFieldService, useValue: inputFieldServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should increase input count on init', () => {
      inputFieldServiceSpy.addInputField.calls.reset();

      component.ngOnInit();

      expect(inputFieldServiceSpy.addInputField).toHaveBeenCalledWith();
    });

    it('should decrease input count on destroy', () => {
      inputFieldServiceSpy.removeInputField.calls.reset();

      component.ngOnDestroy();

      expect(inputFieldServiceSpy.removeInputField).toHaveBeenCalledWith();
    });

    it('should emit event when press key', () => {
      const event = spyOn(component.keyPressed, 'emit');
      const expectedInputValue = 'input value when key is pressed';
      component.inputValue = expectedInputValue;

      component.onKeyPressed();

      expect(event).toHaveBeenCalledWith(expectedInputValue);
    });
  });
});
