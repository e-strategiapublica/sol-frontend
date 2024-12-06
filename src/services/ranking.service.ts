import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User {
  id: number;
  name: string;
  points: number;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private url = `${environment.api.path}/gamification`;

  constructor(private http: HttpClient) {}
  getRanking(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
