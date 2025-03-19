import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { AllotmentResponseDto } from 'src/dtos/allotment/allotment-response.dto';

@Injectable({
  providedIn: 'root' // Define que este serviço estará disponível em toda a aplicação
})
export class AllotmentsService extends BaseService {
  // Define a URL base para chamadas relacionadas a "allotments"
  private url = `${environment.api.path}/allotments`;

  constructor(
    private httpClient: HttpClient // Injeta o serviço HttpClient para fazer requisições HTTP
  ) {
    super(); // Chama o construtor da classe BaseService
  }

  /**
   * Obtém a lista de todos os allotments.
   * @returns Observable contendo um array de AllotmentResponseDto.
   */
  getAllotments(): Observable<AllotmentResponseDto[]> {
    return this.httpClient
      .get<AllotmentResponseDto[]>(`${this.url}`, this.authorizedHeader) // Faz uma requisição GET com headers autorizados
      .pipe(
        map(response => response), // Mapeia a resposta (opcional aqui, pois não transforma os dados)
        catchError(this.serviceError) // Captura e trata erros usando o método herdado de BaseService
      );
  }

  /**
   * Obtém um allotment específico pelo ID.
   * @param id Identificador do allotment.
   * @returns Observable contendo um único AllotmentResponseDto.
   */
  getAllotmentsById(id: string): Observable<AllotmentResponseDto> {
    return this.httpClient
      .get<AllotmentResponseDto>(`${this.url}/${id}`, this.authorizedHeader) // Requisição GET para um ID específico
      .pipe(
        map(response => response),
        catchError(this.serviceError)
      );
  }

  /**
   * Faz o download de um arquivo associado a um allotment pelo ID.
   * @param id Identificador do allotment.
   * @returns Observable contendo o arquivo em formato Blob.
   */
  download(id: string): Observable<Blob> {
    return this.httpClient
      .get(`${this.url}/${id}/file`, { ...this.authorizedHeaderBlob, responseType: 'blob' }) // Requisição GET para baixar um arquivo
      .pipe(
        map(response => response),
        catchError(this.serviceError)
      );
  }
}
