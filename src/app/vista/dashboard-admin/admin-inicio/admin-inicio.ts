import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-inicio',
  imports: [CommonModule],
  templateUrl: './admin-inicio.html',
  styleUrl: './admin-inicio.css',
})
  


export class AdminInicio {

constructor (private router:Router){}

   resumen = [
    { label: 'Usuarios Activos',
      valor: 12, 
      icono: '👤' },
    { label: 'Predios Registrados',
      valor: 34, 
      icono: '🗺️' },
    { label: 'Inspecciones Realizadas',
      valor: 5,  
      icono: '🕵🏼‍♂️' },
    { label: 'Cultivos Activos', 
      valor: 20, 
      icono: '🌱' },
  ];
 // DATOS ESTATICOS
  pendietes =[
    { label: 'Registro de Usuario', 
      valor : 20, 
      icono :'👨🏼‍🌾', 
      date:"domingo, 08 de enero de 2026",
      ruta:"usuarios"
    },
    { label: 'Registro de Predio', 
      valor: 15, 
      icono:'⛰️',
      date:"jueves, 05 de enero de 2026",
      ruta:"predios"
    },
    { label: 'Registro Lugar Produccion', 
      valor: 15, icono:'🏭',
      date:"martes, 10 de enero de 2026",
      ruta:"lugares-produccion"
    },
    { label: 'Registro Lote', 
      valor: 15, 
      icono:'🏠',
      date:"martes, 10 de enero de 2026",
      ruta:"lotes"
    },
    { label: 'Cita de Inspección', 
      valor: 15, 
      icono:'📅',
      date:"martes, 10 de enero de 2026",
      ruta:"inspecciones"
    },
    { label: 'Visita', 
      valor: 15, 
      icono:'🏠',
      date:"martes, 10 de enero de 2026",
      ruta:"inspecciones"
    }
  ]
 pendientes(item:any){
  this.router.navigate(['/admin', item.ruta])
 }
}
