import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/routes';
import { ResponseInterceptor } from './app/shared/interceptors/response-interceptor.service';


bootstrapApplication(AppComponent,{
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useValue: ResponseInterceptor, multi: true }
  ]
})
.catch((err) => console.log(err))