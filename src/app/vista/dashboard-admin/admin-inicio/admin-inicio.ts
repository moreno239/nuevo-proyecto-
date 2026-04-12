import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-inicio',
  imports: [CommonModule],
  templateUrl: './admin-inicio.html',
  styleUrl: './admin-inicio.css',
})
export class AdminInicio {
   resumen = [
    { label: 'Usuarios Activos',valor: 12, icono: '👤' },
    { label: 'Predios Registrados',valor: 34, icono: '🗺️' },
    { label: 'Inspecciones Realizadas',valor: 5,  icono: '🕵🏼‍♂️' },
    { label: 'Cultivos Activos', valor: 20, icono: '🌱' },
  ];

  pendietes =[
    { label: 'Registro de Usuario', valor : 20, icono :'👨🏼‍🌾', date:"domingo, 08 de enero de 2026"},
    { label: 'Registro de Predio', valor: 15, icono:'⛰️',date:"jueves, 05 de enero de 2026"},
    { label: 'Registro Lugar Produccion', valor: 15, icono:'🏭',date:"martes, 10 de enero de 2026"},
    { label: 'Registro Lote', valor: 15, icono:'🏠',date:"martes, 10 de enero de 2026"},
    { label: 'Cita de Inspección', valor: 15, icono:'📅',date:"martes, 10 de enero de 2026"},
    { label: 'Visita', valor: 15, icono:'🏠',date:"martes, 10 de enero de 2026"}

   

  ]
}
