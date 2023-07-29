import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor( private router: Router) {}
  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Agregar', icon: 'add', url: './new-hero' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];
  logout(){
    // remover localstorage userEstimacion
    localStorage.removeItem('userEstimacion');

    // redireccionar a login
    this.router.navigateByUrl('/');
  }
}
