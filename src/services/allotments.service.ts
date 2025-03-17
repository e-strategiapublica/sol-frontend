import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { AllotmentResponseDto } from 'src/dtos/allotment/allotment-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AllotmentsService extends BaseService {
  private url = `${environment.api.path}/allotments`;

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  getAllotments(): Observable<AllotmentResponseDto[]> {
    return this.httpClient
      .get<AllotmentResponseDto[]>(`${this.url}`, this.authorizedHeader)
      .pipe(map(response => response), catchError(this.serviceError));
  }

  getAllotmentsById(id: string): Observable<AllotmentResponseDto> {
    return this.httpClient
      .get<AllotmentResponseDto>(`${this.url}/${id}`, this.authorizedHeader)
      .pipe(map(response => response), catchError(this.serviceError));
  }

  download(id: string): Observable<Blob> {
    return this.httpClient
      .get(`${this.url}/${id}/file`, { ...this.authorizedHeaderBlob, responseType: 'blob' })
      .pipe(map(response => response), catchError(this.serviceError));
  }
}
