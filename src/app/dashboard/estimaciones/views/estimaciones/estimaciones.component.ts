import { Component, OnDestroy, OnInit } from '@angular/core';
import { EstimacionesService } from '../../services/estimaciones.service';
import { TallaData } from '../../interfaces/tallas.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-estimaciones',
  templateUrl: './estimaciones.component.html',
  styleUrls: ['./estimaciones.component.css']
})
export class EstimacionesComponent  implements OnInit, OnDestroy {
 private tallaSeleccionadaSubscription: Subscription | undefined;
  tallaSeleccionada: string | null = null;
  tallasData: { [key: string]: TallaData } = {};
  tallasDataKeys: string[] = [];
  // Ordenar las claves de tallasData por el orden deseado
 

  constructor( private estimacionesService:EstimacionesService){}

  ngOnInit(): void {
    this.tallasData = this.estimacionesService.getTallasData();
    this.estimacionesService.getTallaSeleccionada().subscribe(
      (tallaSeleccionada) => {
        this.tallaSeleccionada = tallaSeleccionada;
      }
    )
    this.tallasDataKeys = Object.keys(this.tallasData).sort((a, b) => {
      const order: { [key: string]: number } = { xs: 1, s: 2, m: 3, l: 4, x: 5 };
      return order[a] - order[b];
    });
  }
  
   seleccionarSize(tallaLetters: string) {
    this.estimacionesService.setTallaSeleccionada(tallaLetters);
    this.tallaSeleccionada = tallaLetters;
  }
   ngOnDestroy(): void {
    // Desuscribirse cuando el componente sea destruido para evitar pérdida de memoria
    this.tallaSeleccionadaSubscription?.unsubscribe();
  }

}
