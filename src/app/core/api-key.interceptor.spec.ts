
import { HttpHandler, HttpRequest, HttpParams, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CharacterHttp } from '../character/character.model';
import { FooterService } from '../shared/component/footer/footer.service';
import { MARVEL_BASE_API_ROUTE } from '../shared/constant/route.constant';
import { DataWrapper } from '../shared/interface/data-wrapper.model';
import { ApiKeyInterceptor } from './api-key.interceptor';
import { LoadingService } from './loading/loading.service';

const apiReturn: DataWrapper<CharacterHttp> = {
  code: 200,
  status: 'Ok',
  copyright: '© 2021 MARVEL',
  attributionText: 'Data provided by Marvel. © 2021 MARVEL',
  attributionHTML: '<a href=\"http://marvel.com\">Data provided by Marvel. © 2021 MARVEL</a>',
  etag: '9a60850f148f8341b9c36f34aaa30b1e4dac0d79',
  data: {
    offset: 0,
    limit: 1,
    total: 10,
    count: 1,
    results: [
      {
        id: 1011334,
        name: '3-D Ma',
        thumbnail: {
          path: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784',
          extension: 'jpg'
        }
      }
    ]
  }
};

describe('ApiKeyInterceptor', () => {
  let interceptor: ApiKeyInterceptor;
  let httpHandlerSpy: jasmine.SpyObj<HttpHandler>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let footerServiceSpy: jasmine.SpyObj<FooterService>;

  beforeEach(() => {
    httpHandlerSpy = jasmine.createSpyObj(HttpHandler, ['handle']);
    loadingServiceSpy = jasmine.createSpyObj(LoadingService, ['stopLoading', 'startLoading']);
    footerServiceSpy = jasmine.createSpyObj(FooterService, ['setFooter']);

    TestBed.configureTestingModule({
      providers: [
        ApiKeyInterceptor,
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: FooterService, useValue: footerServiceSpy }
      ]
    });

    interceptor = TestBed.inject(ApiKeyInterceptor);
    httpHandlerSpy.handle.and.returnValue(of(new HttpResponse()));
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

      interceptor.intercept(request, httpHandlerSpy);

      expect(httpHandlerSpy.handle).toHaveBeenCalledWith(requestExpected);
    });

    it('should not add api key to request when already has API key', () => {
      environment.marvelPublicKey = '1616';
      const request = new HttpRequest(
        'GET', MARVEL_BASE_API_ROUTE,
        { params: new HttpParams({ fromObject: { apikey: 'WILL NOT CHANGE API KEY' } }) }
      );

      interceptor.intercept(request, httpHandlerSpy);

      expect(httpHandlerSpy.handle).toHaveBeenCalledWith(request);
    });

    it('should not change request data when is not a Marvel API request', () => {
      environment.marvelPublicKey = '1616';

      const request = new HttpRequest(
        'GET', 'http://not-marvel-api',
        { params: new HttpParams({ fromObject: { apikey: 'WILL NOT CHANGE API KEY' } }) }
      );

      interceptor.intercept(request, httpHandlerSpy);

      expect(httpHandlerSpy.handle).toHaveBeenCalledWith(request);
    });

    it('should start loading when start a request', () => {
      environment.marvelPublicKey = '1616';
      loadingServiceSpy.startLoading.calls.reset();
      const request = new HttpRequest('GET', MARVEL_BASE_API_ROUTE);

      interceptor.intercept(request, httpHandlerSpy);

      expect(loadingServiceSpy.startLoading).toHaveBeenCalledWith();
    });

    it('should stop loading when finish a Marvel API request', () => {
      environment.marvelPublicKey = '1616';
      loadingServiceSpy.stopLoading.calls.reset();
      httpHandlerSpy.handle.and.returnValue(of(new HttpResponse()));
      const request = new HttpRequest('GET', MARVEL_BASE_API_ROUTE);

      interceptor.intercept(request, httpHandlerSpy).subscribe(() => {
        expect(loadingServiceSpy.stopLoading).toHaveBeenCalledWith();
      });
    });

    it('should set footer when finish a Marvel API request', () => {
      environment.marvelPublicKey = '1616';
      footerServiceSpy.setFooter.calls.reset();
      httpHandlerSpy.handle.and.returnValue(of(new HttpResponse({ body: apiReturn })));
      const request = new HttpRequest('GET', MARVEL_BASE_API_ROUTE);

      interceptor.intercept(request, httpHandlerSpy).subscribe(() => {
        expect(footerServiceSpy.setFooter).toHaveBeenCalledWith(apiReturn.attributionHTML);
      });
    });

    it('should not stop loading when tap event is not HttpResponse for a Marvel API request', () => {
      environment.marvelPublicKey = '1616';
      loadingServiceSpy.stopLoading.calls.reset();
      httpHandlerSpy.handle.and.returnValue(of(new HttpHeaderResponse()));
      const request = new HttpRequest('GET', MARVEL_BASE_API_ROUTE);

      interceptor.intercept(request, httpHandlerSpy).subscribe(() => {
        expect(loadingServiceSpy.stopLoading).not.toHaveBeenCalledWith();
      });
    });

    it('should stop loading when finish a non Marvel API request', () => {
      environment.marvelPublicKey = '1616';
      loadingServiceSpy.stopLoading.calls.reset();
      const request = new HttpRequest(
        'GET', 'http://not-marvel-api',
        { params: new HttpParams({ fromObject: { apikey: 'WILL NOT CHANGE API KEY' } }) }
      );

      interceptor.intercept(request, httpHandlerSpy).subscribe(() => {
        expect(loadingServiceSpy.stopLoading).toHaveBeenCalledWith();
      });
    });

    it('should not stop loading when tap event is not HttpResponse for non Marvel API request', () => {
      environment.marvelPublicKey = '1616';
      loadingServiceSpy.stopLoading.calls.reset();
      httpHandlerSpy.handle.and.returnValue(of(new HttpHeaderResponse()));
      const request = new HttpRequest('GET', 'http://not-marvel-api');

      interceptor.intercept(request, httpHandlerSpy).subscribe(() => {
        expect(loadingServiceSpy.stopLoading).not.toHaveBeenCalledWith();
      });
    });
  });
});
