import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should stop and stop loading loading', () => {
      expect(service.isLoading()).toBeFalse();

      service.startLoading();
      expect(service.isLoading()).toBeTrue();

      service.stopLoading();
      expect(service.isLoading()).toBeFalse();
    });
  });
});
