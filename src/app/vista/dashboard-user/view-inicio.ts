import { Component } from '@angular/core';
import { TablaPredios } from '../tabla-predios/tabla-predios';
import { TablaProduccion } from '../tabla-produccion/tabla-produccion';
import { CommonModule } from '@angular/common';
import { TablaInspeccion } from './tabla-inspeccion/tabla-inspeccion';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-view-inicio',
  imports: [CommonModule, TablaPredios, TablaProduccion, TablaInspeccion, RouterLink],
  templateUrl: './view-inicio.html',
  styleUrl: './view-inicio.css',
})
export class ViewInicio {

  
}
