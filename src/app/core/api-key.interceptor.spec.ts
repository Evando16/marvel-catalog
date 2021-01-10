
import { HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';
import { MARVEL_BASE_API_ROUTE } from '../shared/constant/route.constant';
import { ApiKeyInterceptor } from './api-key.interceptor';

describe('ApiKeyInterceptor', () => {
  let interceptor: ApiKeyInterceptor;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiKeyInterceptor
      ]
    });

    interceptor = TestBed.inject(ApiKeyInterceptor);
  });

  describe('Unit tests', () => {
    it('should be created', () => {
      expect(interceptor).toBeTruthy();
    });

    it('should add api key to request when a request to Marvel API', () => {
      environment.marvelPublicKey = '1616';
      const request = new HttpRequest('GET', MARVEL_BASE_API_ROUTE);
      const requestExpected = new HttpRequest(
        'GET', MARVEL_BASE_API_ROUTE,
        { params: new HttpParams({ fromObject: { apikey: environment.marvelPublicKey } }) }
      );
      const httpHandler: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj(HttpHandler, ['handle']);

      interceptor.intercept(request, httpHandler);

      expect(httpHandler.handle).toHaveBeenCalledWith(requestExpected);
    });

    it('should not add api key to request when already has API key', () => {
      environment.marvelPublicKey = '1616';
      const request = new HttpRequest(
        'GET', MARVEL_BASE_API_ROUTE,
        { params: new HttpParams({ fromObject: { apikey: 'WILL NOT CHANGE API KEY' } }) }
      );
      const httpHandler: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj(HttpHandler, ['handle']);

      interceptor.intercept(request, httpHandler);

      expect(httpHandler.handle).toHaveBeenCalledWith(request);
    });

    it('should not change request data when is not a Marvel API request', () => {
      environment.marvelPublicKey = '1616';

      const request = new HttpRequest(
        'GET', 'http://not-marvel-api',
        { params: new HttpParams({ fromObject: { apikey: 'WILL NOT CHANGE API KEY' } }) }
      );
      const httpHandler: jasmine.SpyObj<HttpHandler> = jasmine.createSpyObj(HttpHandler, ['handle']);

      interceptor.intercept(request, httpHandler);

      expect(httpHandler.handle).toHaveBeenCalledWith(request);
    });
  });
});
