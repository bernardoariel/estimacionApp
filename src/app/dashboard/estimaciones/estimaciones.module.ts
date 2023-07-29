import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstimacionesRoutingModule } from './estimaciones-routing.module';
import { CardComponent } from './components/card/card.component';
import { EstimacionesComponent } from './views/estimaciones/estimaciones.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ListadoComponent } from './views/listado/listado.component';




@NgModule({
  declarations: [
    CardComponent,
    EstimacionesComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    EstimacionesRoutingModule,
    MaterialModule,
    
  ]
})
export class EstimacionesModule { }
