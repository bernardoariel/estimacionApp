import { Component, OnInit, OnDestroy } from '@angular/core';
import { Estimacion } from '../../interfaces/estimacion.interface';
import { EstimacionesService } from '../../services/estimaciones.service';
import { Subscription, interval, repeat, takeWhile } from 'rxjs';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit, OnDestroy {
  isVoting: boolean = false;
  displayedColumns: string[] = ['nombre', 'valor'];
  dataSource: Estimacion[] = [];
  private intervalSubscription?: Subscription;
  private intervalId: any;
  constructor(private estimacionService: EstimacionesService) {}

  ngOnInit() {
    this.obtenerEstimaciones();
  }

  obtenerEstimaciones() {
    this.isVoting = false;
    this.estimacionService.getEstimaciones().subscribe((data) => {
      console.log('data::: ', data);
      this.dataSource = data.estimaciones;
    });
  }

  eliminarUsuarios() {
    this.estimacionService.eliminarRegistros().subscribe(console.log);
  }
  reiniciarEstimaciones() {
    this.estimacionService.reiniciarEstimaciones().subscribe(() => {
      this.obtenerEstimaciones();
    });
  }
  iniciarVotacion() {
    this.isVoting = !this.isVoting;

    // Si la votación está activa, utiliza interval para obtenerEstimaciones cada dos segundos.
    if (this.isVoting) {
      this.intervalSubscription = interval(2000).subscribe(() => {
        this.estimacionService.getEstimaciones().subscribe((data) => {
          console.log('data::: ', data);
          this.dataSource = data.estimaciones;
        });
      });
    } else {
      // Si la votación se detiene, cancela la suscripción al intervalo.
      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }
    }
  }
  ngOnDestroy() {
    // Asegúrate de cancelar la suscripción al intervalo cuando el componente se destruye.
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}
