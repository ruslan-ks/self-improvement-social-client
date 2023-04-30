import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, retry, throwError, timer } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class GlobalHttpErrorHandler implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 200) // 200ms, 400ms, 600ms, error
      }),
      catchError(error => {
        console.log('Http error interceptor caught error: ', error);
        return throwError(() => {
          console.log('Http error was rethrown by http interceptor');
          return error;
        });
      })
    );
  }
}
