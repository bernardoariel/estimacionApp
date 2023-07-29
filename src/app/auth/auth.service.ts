import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Usuario } from './usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environments.baseUrl;
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post(`${this.baseUrl}/ingresar`, usuario)
      .pipe(map((response) => response as Usuario));
  }

  public checkAuthentication(): Observable<boolean> {
    
    const userEstimacion = JSON.parse(
      localStorage.getItem('userEstimacion') || '{}'
    );
    
    const isLoggedIn = !!userEstimacion.nombre;
    if (isLoggedIn) {
      // Realizar una verificación en el backend para comprobar si el usuario existe en la base de datos
      return this.http.get<boolean>(`${this.baseUrl}/verificar-autenticacion`);
    } else {
      this.isAuthenticated = false;
      return of(false);
    }
  }
  // Método para cerrar la sesión del usuario
  public logout(): void {
    // Realizar cualquier operación de limpieza o cierre de sesión
    localStorage.removeItem('userEstimacion');
    this.isAuthenticated = false;
  }
}
