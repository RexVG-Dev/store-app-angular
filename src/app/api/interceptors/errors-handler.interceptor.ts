import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorsHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    const errorResponse = `Error code: ${error.status}, message: ${error.message}`;

    return throwError(() => errorResponse)
  }));
};
