import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { UserAuthenticatedDto } from "src/dtos/auth/user-authenticated.dto";
import { environment } from "src/environments/environment";
import { inject } from "@angular/core";


export abstract class BaseService {
  protected get anonymousHeader() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
  }

  protected get refreshHeader() {
    const userJson = localStorage.getItem("user") as string;
    const user: UserAuthenticatedDto = JSON.parse(userJson);

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.refreshToken}`,
      }),
    };
  }

  protected get authorizedHeader() {
    const userJson = localStorage.getItem("user") as string;
    const user: UserAuthenticatedDto = JSON.parse(userJson);

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      }),
    };
  }


  protected get authorizedHeaderMulti() {
    const userJson = localStorage.getItem("user") as string;
    const user: UserAuthenticatedDto = JSON.parse(userJson);

    return {
      headers: new HttpHeaders({
        // "Content-Type": " multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      }),
    };
  }

 

  protected get authorizedHeaderBlob() {
    const userJson = localStorage.getItem("user") as string;
    const user: UserAuthenticatedDto = JSON.parse(userJson);

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${user?.token}`,
        responseType: "blob",
        Accept: "application/pdf",
        observe: "response",
      }),
    };
  }

  protected get authorizedHeaderFile() {
    const userJson = localStorage.getItem("user") as string;
    const user: UserAuthenticatedDto = JSON.parse(userJson);

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${user?.token}`,
      }),
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError = (response: Response | any) => {
    let customError: string[] = [];
    let customResponse = new Error();
    
    if (response instanceof HttpErrorResponse) {
      // Verifica se é um erro estruturado do backend e processa automaticamente
      if (this.isBackendStructuredError(response)) {
        this.processBackendError(response);
      }
      
      if (response.statusText === "Unknown Error") {
        customError.push("Unknown Error");
        response.error.errors = customError;
      }
    }
    
    if (response.status === 500) {
      customError.push("Error processing request");
      customResponse.error.errors = customError;
      return throwError(customResponse);
    }
    
    return throwError(response);
  }

  /**
   * Processa erros estruturados do backend usando window para acessar serviços globais
   */
  private processBackendError(error: HttpErrorResponse): void {
    // Emite evento customizado que pode ser capturado por um interceptor ou serviço global
    const event = new CustomEvent('backendStructuredError', {
      detail: {
        error: error.error,
        status: error.status
      }
    });
    
    window.dispatchEvent(event);
  }

  /**
   * Verifica se o erro tem a estrutura do novo sistema do backend
   */
  private isBackendStructuredError(error: HttpErrorResponse): boolean {
    return error?.error && 
           (typeof error.error === 'string' || 
            (typeof error.error === 'object' && typeof error.error.error === 'string'));
  }


}
class Error {
  error: ErrorResponse = new ErrorResponse();
}
class ErrorResponse {
  errors: string[] = [];
}
