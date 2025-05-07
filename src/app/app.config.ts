import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authenticationInterceptor } from '../core/Interceptors/token-http-interceptor';
import { adminGuard } from '../core/guards/admin/admin.guard';

export const appConfig: ApplicationConfig = {
  providers: 
  [provideHttpClient(withInterceptors([authenticationInterceptor])),
   provideZoneChangeDetection({ eventCoalescing: true }), 
   provideRouter(routes), 
   provideAnimationsAsync(),
  ]
};
