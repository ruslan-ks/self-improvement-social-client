import { ErrorHandler, Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private router: Router, private zone: NgZone) {}

  handleError(error: unknown): void {
    this.zone.run(() => {
      this.router.navigateByUrl('/unknown-error')
        .then(() => console.log('Navigated to the error page'));
    });
    if (error instanceof Error) {
      console.error('Global error handler caught error: ', error);
    }
  }
}
