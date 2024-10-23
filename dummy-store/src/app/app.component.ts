import { Component } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { ResponseInterceptor } from './shared/interceptors/response-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterModule],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useValue: ResponseInterceptor, multi: true }
  ]
})
export class AppComponent {
  title = 'dummy-store';
}
