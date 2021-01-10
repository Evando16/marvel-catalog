import { TestBed } from '@angular/core/testing';

import { InputFieldService } from './input-field.service';

describe('InputFieldService', () => {
  let service: InputFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
