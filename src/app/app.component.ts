import { Component } from '@angular/core';
import { BackendErrorHandlerService } from 'src/services/backend-error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sol-app-frontend';

  constructor(private backendErrorHandler: BackendErrorHandlerService) {
    // Injeta o serviço para garantir que seja inicializado
  }
}
