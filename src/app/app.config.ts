import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { errorsHandlerInterceptor } from '@api/interceptors/errors-handler.interceptor';
import { spinnerInterceptor } from '@api/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr({ timeOut: 900, preventDuplicates: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorsHandlerInterceptor, spinnerInterceptor]))
  ]
};
