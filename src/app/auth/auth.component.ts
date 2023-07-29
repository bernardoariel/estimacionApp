import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FechaHoyService } from '../services/fecha-hoy.service';
import { SprintService } from '../services/sprint.service';

enum Estado {
  Checkeando = 'checkeando',
  NoIniciado = 'noiniciado',
  Iniciado = 'iniciado',
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  fechaHoy!: string;
  estadoActual: Estado = Estado.Checkeando;
  isAdmin: boolean = false;
  txtUser: any = ''; // Variable para el primer input
  txtSprint: any = '';
  ultimoSprint: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private sprintService: SprintService,
    private fechaHoyService: FechaHoyService
  ) {}

  crearSprint(nombreSprint: string) {

    if(nombreSprint == '') return;
    
    /* chequeo si existe un sprint */
    this.sprintService.getHasSprint().subscribe(({ sprint }) => {

      // si no existe el sprint lo creo
      if (sprint['id'] == null) {
        this.sprintService.crearSprint(nombreSprint).subscribe(({sprint}) => {
          this.crearUsuarioLocalStorage('admin')
          this.estadoActual = Estado.Iniciado;
        });
        this.router.navigateByUrl('/dashboard/list');
        return;
      }

      // si existe el sprint y no esta en curso
      this.fechaHoy = this.fechaHoyService.obtenerFechaHoy();

      if (sprint['created_at'] != this.fechaHoy) {
        // eliminar los sprint
        this.sprintService.eliminarSprint().subscribe((response) => {
          this.sprintService.crearSprint(nombreSprint).subscribe(()=>{
            this.crearUsuarioLocalStorage('admin');
          });
          this.estadoActual = Estado.Iniciado;
        });
        this.router.navigateByUrl('/dashboard/list');
        return;
      }
      this.crearUsuarioLocalStorage('admin');
      this.router.navigateByUrl('/dashboard/list');
      this.estadoActual = Estado.Iniciado;
    });
  }

  ingresar(nombre: string, sprint: string = '') {
    /* chequeamos el tipo de usuario */
    if (nombre == 'admin') {
      this.isAdmin = true;
      this.estadoActual = Estado.NoIniciado;
      return;
    }

    /* Chequeamos si existe un sprint y esta en curso */
    this.sprintService.getHasSprint().subscribe(({ sprint }) => {
      if (sprint['id'] == null) {
        this.estadoActual = Estado.NoIniciado;
        return
      }

      this.fechaHoy = this.fechaHoyService.obtenerFechaHoy();
      if (sprint['created_at'] != this.fechaHoy) {
        this.estadoActual = Estado.NoIniciado;
        return;
      }

      
      this.estadoActual = Estado.Iniciado;
      return
    });

    return this.authService
      .agregarUsuario({ nombre })
        .subscribe(({ nombre }) => {
          this.crearUsuarioLocalStorage(nombre);
          this.router.navigate(['/dashboard']);
        });
  }
  
  crearUsuarioLocalStorage(nombre: string) {
    this.sprintService.getHasSprint().subscribe(({ sprint }) => {
      this.ultimoSprint = sprint['sprint']!;
      const usuarioInfo = {
        nombre,
        ultimoSprint: this.ultimoSprint,
      };
       const usuarioInfoJSON = JSON.stringify(usuarioInfo);
       localStorage.setItem('userEstimacion', usuarioInfoJSON);
    })
  }
}
