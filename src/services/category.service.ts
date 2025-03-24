import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { CategoryRequestDto } from 'src/dtos/category/category-request.dto';
import { CategoryResponseDto } from 'src/dtos/category/category-response.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends BaseService {
  private readonly url = `${environment.api.path}/categories`;
  private categoryList: CategoryResponseDto[] = [];
  private categoryFilterList: CategoryResponseDto[] = [];

  constructor(private httpClient: HttpClient) {
    super();
  }

  // Método para pegar todas as categorias sem autenticação (como sugerido)
  getCategoryWithoutAuth(): Observable<CategoryResponseDto[]> {
    return this.httpClient
      .get<CategoryResponseDto[]>(this.url)
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Método para pegar categorias com autenticação
  getCategory(): Observable<CategoryResponseDto[]> {
    return this.httpClient
      .get<CategoryResponseDto[]>(this.url, this.authorizedHeader)
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Método para criar uma nova categoria
  register(dto: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.httpClient
      .post<CategoryResponseDto>(this.url, dto, this.authorizedHeader)
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Método para pegar uma categoria por ID
  getById(id: string): Observable<CategoryResponseDto> {
    return this.httpClient
      .get<CategoryResponseDto>(`${this.url}/${id}`, this.authorizedHeader)
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Método para criar
  create(dto: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.httpClient
      .post<CategoryResponseDto>(this.url, dto, this.authorizedHeader)
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Método para atualizar
  update(id: string, dto: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.httpClient
      .put<CategoryResponseDto>(`${this.url}/${id}`, dto, this.authorizedHeader)
      .pipe(map(this.extractData), catchError(this.serviceError));
  }

  // Método para deletar
  delete(id: string): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.url}/${id}`, this.authorizedHeader)
      .pipe(catchError(this.serviceError));
  }

  getCategoryList(): CategoryResponseDto[] {
    return this.categoryList;
  }

  getCategoryFilterList(): CategoryResponseDto[] {
    return this.categoryFilterList;
  }

  setCategoryList(newList: CategoryResponseDto[]): void {
    this.categoryList = newList;
  }

  setCategoryFilterList(newList: CategoryResponseDto[]): void {
    this.categoryFilterList = newList;
  }
}
