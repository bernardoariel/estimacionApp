import { Injectable } from '@angular/core';
import { TallaData } from '../interfaces/tallas.interface';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/app/environments/environments';
import { Estimacion, Estimaciones } from '../interfaces/estimacion.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EstimacionesService {
  private tallaSeleccionadaSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  private baseUrl: string = environments.baseUrl;
  tallasData: { [key: string]: TallaData } = {
    xs: { fontSize: '30px', letters: 'XS', width: '80px' },
    s: { fontSize: '50px', letters: 'S', width: '100px' },
    m: { fontSize: '70px', letters: 'M', width: '140px' },
    l: { fontSize: '100px', letters: 'L', width: '200px' },
    x: { fontSize: '100px', letters: '?', width: '200px' },
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  // Método para establecer la talla seleccionada
  setTallaSeleccionada(talla: string) {
    console.log('talla::: ', talla);

    // Suscríbete a checkAuthentication() para obtener el valor booleano resultante
    this.authService
      .checkAuthentication()
      .pipe(take(1))
      .subscribe((isAuthenticated) => {
        console.log('isAuthenticated::: ', isAuthenticated);
        if (!isAuthenticated) {
          this.router.navigate(['/']); // Redirige si el usuario no está autenticado
          return;
        }

        this.tallaSeleccionadaSubject.next(talla.toLowerCase());

        const userEstimacion = JSON.parse(
          localStorage.getItem('userEstimacion') || '{}'
        );
        if (userEstimacion.nombre) {
          const estimacion: Estimacion = {
            nombre: userEstimacion.nombre,
            valor: talla.toLowerCase(),
          };

          // Vuelve a verificar la autenticación antes de hacer la llamada HTTP
          this.authService
            .checkAuthentication()
            .pipe(take(1))
            .subscribe((isAuthenticated) => {
              if (!isAuthenticated) {
                this.router.navigate(['/']); // Redirige si el usuario no está autenticado
                return;
              }

              this.http
                .post(`${this.baseUrl}/ingresar-nombre-valor`, estimacion)
                .subscribe();
            });
        }
      });
  }

  // Método para obtener la talla seleccionada
  getTallaSeleccionada(): Observable<string | null> {
    return this.tallaSeleccionadaSubject.asObservable();
  }

  getTallasData(): { [key: string]: TallaData } {
    return this.tallasData;
  }

  getEstimaciones(): Observable<Estimaciones> {
    return this.http.get<Estimaciones>(`${this.baseUrl}/obtenerEstimaciones`);
  }

  eliminarRegistros() {
    return this.http.delete(`${this.baseUrl}/eliminar-registros`);
  }

  reiniciarEstimaciones() {
    return this.http.post<any>(`${this.baseUrl}/reiniciarEstimaciones`, {});
  }
}
