import { TestBed } from '@angular/core/testing';

import { FooterService } from './footer.service';

describe('FooterService', () => {
  let service: FooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FooterService);
  });

  describe('Unit test', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should set and get footer value', () => {
      const footerHtml = '<a href="http://marvel.com">Data provided by Marvel. © 2021 MARVEL</a>';

      service.setFooter(footerHtml);
      expect(service.getFooter()).toEqual(footerHtml);
    });
  });
});
