import { TestBed } from '@angular/core/testing';

import { InputFieldService } from './input-field.service';

describe('InputFieldService', () => {
  let service: InputFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputFieldService);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should increase input count', () => {
      expect(service.getInputFieldCount()).toEqual(0);

      service.addInputField();

      expect(service.getInputFieldCount()).toEqual(1);
    });

    it('should get input count', () => {
      const expectedCount = 2;
      expect(service.getInputFieldCount()).toEqual(0);

      service.addInputField();
      service.addInputField();

      expect(service.getInputFieldCount()).toEqual(expectedCount);
    });

    it('should decrease input count', () => {
      const expectedCountAfterIncrease = 2;
      const expectedCountAfterDecrease = 1;

      service.addInputField();
      service.addInputField();
      expect(service.getInputFieldCount()).toEqual(expectedCountAfterIncrease);

      service.removeInputField();

      expect(service.getInputFieldCount()).toEqual(expectedCountAfterDecrease);
    });

    it('should not decrease input count when there is no input field', () => {
      expect(service.getInputFieldCount()).toEqual(0);

      service.removeInputField();

      expect(service.getInputFieldCount()).toEqual(0);
    });

  });
});
