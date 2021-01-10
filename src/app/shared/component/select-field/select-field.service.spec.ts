import { TestBed } from '@angular/core/testing';

import { SelectFieldService } from './select-field.service';

describe('SelectFieldService', () => {
  let service: SelectFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectFieldService);
  });


  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should increase select count', () => {
      expect(service.getSelectFieldCount()).toEqual(0);

      service.addSelectField();

      expect(service.getSelectFieldCount()).toEqual(1);
    });

    it('should get select count', () => {
      const expectedCount = 2;
      expect(service.getSelectFieldCount()).toEqual(0);

      service.addSelectField();
      service.addSelectField();

      expect(service.getSelectFieldCount()).toEqual(expectedCount);
    });

    it('should decrease select count', () => {
      const expectedCountAfterIncrease = 2;
      const expectedCountAfterDecrease = 1;

      service.addSelectField();
      service.addSelectField();
      expect(service.getSelectFieldCount()).toEqual(expectedCountAfterIncrease);

      service.removeSelectField();

      expect(service.getSelectFieldCount()).toEqual(expectedCountAfterDecrease);
    });

    it('should not decrease select count when there is no select field', () => {
      expect(service.getSelectFieldCount()).toEqual(0);

      service.removeSelectField();

      expect(service.getSelectFieldCount()).toEqual(0);
    });

  });
});
