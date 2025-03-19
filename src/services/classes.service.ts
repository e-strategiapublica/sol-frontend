import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { ClassesRequestDto } from 'src/dtos/classes/classes-request.dto';
import { ClassesResponseDto } from 'src/dtos/classes/classes-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ClassesService extends BaseService {
 
  private url = `${environment.api.path}/classes`;
  
  classes: any[];
  classesFilter: any[];

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }
  
  // Para pegar a lista de classes
  getClasses(): Observable<any> {
    return this.httpClient
      .get(`${this.url}`, this.authorizedHeader)  // Alterado para /classes (sem o "list")
      .pipe(map(response => response), catchError(this.serviceError));
  }

  // Para registrar uma nova classe
  register(dto: ClassesRequestDto): Observable<ClassesResponseDto> {    
    return this.httpClient
      .post(`${this.url}`, dto, this.authorizedHeader)  // Alterado para /classes (sem o "register")
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Para atualizar uma classe
  update(id: string, dto: any): Observable<ClassesResponseDto> {   
    return this.httpClient
      .put(`${this.url}/${id}`, dto, this.authorizedHeader)  // Alterado para /classes/:id
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Para excluir uma classe
  delete(id: string): Observable<ClassesResponseDto> {
    return this.httpClient
      .delete(`${this.url}/${id}`, this.authorizedHeader)  // Alterado para /classes/:id
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  getClassesList(): any[] {
    return this.classes;
  }

  getClassesFilterList(): any[] {
    return this.classesFilter;
  }

  setClassesList(nuevoValor: any[]) {    
    this.classes = nuevoValor;
  }

  setClassesFilterList(nuevoValor: any[]) {    
    this.classesFilter = nuevoValor;
  }

}
