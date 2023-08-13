import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthHTTPInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // withCredentials: true is required to presist the cookie, by default, angular discards the cookies
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    return next.handle(modifiedReq);
    // .pipe(
    //   // Check for one specific type of event in .tap()
    //   // filter(val => val.type === HttpEventType.Sent)
    //   tap((val) => {
    //     if (val.type === HttpEventType.Sent) {
    //       console.log('Request was sent to the server');
    //     }
    //     if (val.type === HttpEventType.Response) {
    //       console.log('Got a response', val);
    //     }
    //   })
    // );
  }
}
