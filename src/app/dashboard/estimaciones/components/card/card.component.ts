import { Component, Input, OnInit } from '@angular/core';
import { EstimacionesService } from '../../services/estimaciones.service';

@Component({
  selector: 'estimaciones-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit{
 
  @Input() tallaData: any;
  @Input() talla!: string;

  tallaSeleccionada: string | null = null;
  img!:string
  cardHeight = '250px'; 
  
  constructor( private estimacionesService:EstimacionesService ) {}

  ngOnInit(): void {
    
    this.img = '../..../../../../assets/' + this.imgName(this.tallaData.letters)
    this.estimacionesService.getTallaSeleccionada().subscribe(
      (tallaSeleccionada) => {
        this.tallaSeleccionada = tallaSeleccionada;
      }
    )
  }

  imgName(size: string): string {
    return size === '?' ? 'tshirt1_dark.png' : 'tshirt1.png';
  }

  isTallaX(talla: string): boolean {
    return talla === '?';
  }
}
