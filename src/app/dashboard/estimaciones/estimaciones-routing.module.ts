import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimacionesComponent } from './views/estimaciones/estimaciones.component';
import { ListadoComponent } from './views/listado/listado.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EstimacionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    component: ListadoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstimacionesRoutingModule { }
