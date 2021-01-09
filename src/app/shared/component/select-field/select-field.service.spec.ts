import { TestBed } from '@angular/core/testing';

import { SelectFieldService } from './select-field.service';

describe('SelectFieldService', () => {
  let service: SelectFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
