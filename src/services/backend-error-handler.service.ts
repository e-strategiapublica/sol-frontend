import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BackendErrorHandlerService {

  constructor(
    private translate: TranslateService,
    private toastr: ToastrService
  ) { 
    // Escuta eventos de erros estruturados do BaseService
    window.addEventListener('backendStructuredError', (event: any) => {
      this.handleStructuredErrorEvent(event.detail);
    });
  }

  /**
   * Processa eventos de erros estruturados emitidos pelo BaseService
   */
  private handleStructuredErrorEvent(eventDetail: any): void {
    const errorKey = this.extractErrorKey(eventDetail.error);
    const errorData = this.extractErrorData(eventDetail.error);
    
    // Tenta traduzir usando a chave do backend
    const translationKey = `BACKEND_ERRORS.${errorKey}`;
    
    // Primeiro pega a tradução sem parâmetros
    this.translate.get(translationKey).subscribe(translatedMessage => {
      // Se encontrou tradução, faz interpolação manual
      if (translatedMessage !== translationKey) {
        let finalMessage = translatedMessage;
        
        // Faz interpolação manual dos dados
        if (errorData && Object.keys(errorData).length > 0) {
          Object.keys(errorData).forEach(key => {
            const placeholder = `{{${key}}}`;
            finalMessage = finalMessage.replace(new RegExp(placeholder, 'g'), errorData[key]);
          });
        }
        
        this.toastr.error(finalMessage, '', { progressBar: true });
      } else {
        // Fallback para mensagem genérica
        this.translate.get('BACKEND_ERRORS.INTERNAL_SERVER_ERROR').subscribe(genericMessage => {
          this.toastr.error(genericMessage, '', { progressBar: true });
        });
      }
    });
  }

  /**
   * Extrai a chave do erro da resposta
   */
  private extractErrorKey(error: any): string {
    if (typeof error === 'string') {
      return error;
    }
    
    if (typeof error === 'object' && error.error) {
      return error.error;
    }
    
    return 'GENERIC_ERROR';
  }

  /**
   * Extrai os dados do erro para interpolação
   */
  private extractErrorData(error: any): any {
    if (typeof error === 'object' && error.data) {
      return error.data;
    }
    
    return {};
  }
}
