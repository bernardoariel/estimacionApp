import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { HasSprintResponse } from '../interfaces/responseHasSprint.interface';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHasSprint(): Observable<HasSprintResponse> {
    return this.http.get<HasSprintResponse>(`${this.baseUrl}/last-sprint`);
  }
  crearSprint(sprint: string): Observable<any> {
    const requestBody = { sprint: sprint };
    return this.http.post<any>(`${this.baseUrl}/crearsprint`, requestBody);
  }
  eliminarSprint() {
    return this.http.delete(`${this.baseUrl}/eliminar-sprint`);
  }
}
