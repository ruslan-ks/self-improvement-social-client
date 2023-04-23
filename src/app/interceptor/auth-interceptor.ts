import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.authService.getIdToken();
    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + idToken)
      })
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
