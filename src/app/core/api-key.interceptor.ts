import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { MARVEL_BASE_API_ROUTE } from './../shared/constant/route.constant';
import { environment } from 'src/environments/environment';


@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(MARVEL_BASE_API_ROUTE)) {
      if (!!!request.params.get('apikey')) {
        return next.handle(request.clone({
          params: request.params.append('apikey', environment.marvelPublicKey)
        }));
      }
    }

    return next.handle(request);
  }
}
