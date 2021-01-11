import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { MARVEL_BASE_API_ROUTE } from './../shared/constant/route.constant';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading/loading.service';


@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) { }

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.startLoading();
    if (request.url.includes(MARVEL_BASE_API_ROUTE)) {
      if (!!!request.params.get('apikey')) {
        return next.handle(request.clone({
          params: request.params.append('apikey', environment.marvelPublicKey)
        })).pipe(tap((event: HttpEvent<unknown>) => {
          if (event instanceof HttpResponse) {
            this.loadingService.stopLoading();
          }
        }));
      }
    }

    return next.handle(request).pipe(tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        this.loadingService.stopLoading();
      }
    }));
  }
}
