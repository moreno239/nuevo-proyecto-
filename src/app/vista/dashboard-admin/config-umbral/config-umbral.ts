import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';

@Component({
  selector: 'app-config-umbral',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './config-umbral.html',
  styleUrl: './config-umbral.css'
})
export class ConfigUmbral {

  vista: 'formulario' | 'exito' = 'formulario';
  errorRangos = '';

  // Rangos de incidencia por nivel
  umbral = {
    bajo:  { min: 0,  max: 20  },
    medio: { min: 21, max: 60  },
    alto:  { min: 61, max: 100 }
  };

  guardar() {
    this.errorRangos = '';

    const { bajo, medio, alto } = this.umbral;

    // Validación: los rangos no deben empezar mas de 0 si es el bajo y que tengan coherencia , termina en 10 y el otro empieza en 11 
    if (bajo.max + 1 !== medio.min) {
      this.errorRangos = `El rango BAJO termina en ${bajo.max} pero MEDIO empieza en ${medio.min}. Deben ser consecutivos.`;
      return;
    }
    if (medio.max + 1 !== alto.min) {
      this.errorRangos = `El rango MEDIO termina en ${medio.max} pero ALTO empieza en ${alto.min}. Deben ser consecutivos.`;
      return;
    }
    if (bajo.min !== 0) {
      this.errorRangos = 'El rango BAJO debe comenzar en 0.';
      return;
    }

    this.vista = 'exito';
  }

  volver() { this.vista = 'formulario'; }
}