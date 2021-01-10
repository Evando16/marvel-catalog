import { SelectFieldService } from './select-field.service';
import { MarvelSelectFieldOption } from './select-field.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldComponent } from './select-field.component';

const options: MarvelSelectFieldOption[] = [
  {
    value: 1,
    description: 'option test'
  }
];

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent;
  let fixture: ComponentFixture<SelectFieldComponent>;
  let selectFieldServiceSpy: jasmine.SpyObj<SelectFieldService>;

  beforeEach(async () => {
    selectFieldServiceSpy = jasmine.createSpyObj(SelectFieldService, ['addSelectField', 'removeSelectField', 'getSelectFieldCount']);
    await TestBed.configureTestingModule({
      declarations: [SelectFieldComponent],
      providers: [
        { provide: SelectFieldService, useValue: selectFieldServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFieldComponent);
    component = fixture.componentInstance;
    component.options = options;
    fixture.detectChanges();
  });

  describe('Unit tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should select first option value on init', () => {
      component.selectValue = '0';
      component.options = options;

      component.ngOnInit();

      expect(component.selectValue).toEqual('1');
    });

    it('should increase select count on init', () => {
      selectFieldServiceSpy.addSelectField.calls.reset();

      component.ngOnInit();

      expect(selectFieldServiceSpy.addSelectField).toHaveBeenCalledWith();
    });

    it('should decrease select count on destroy', () => {
      selectFieldServiceSpy.removeSelectField.calls.reset();

      component.ngOnDestroy();

      expect(selectFieldServiceSpy.removeSelectField).toHaveBeenCalledWith();
    });

    it('should emit event when select value change', () => {
      const event = spyOn(component.selectChange, 'emit');
      const expectedSelectValue = 'select value when value change';
      component.selectValue = expectedSelectValue;

      component.onChangeSelect();

      expect(event).toHaveBeenCalledWith(expectedSelectValue);
    });
  });
});
