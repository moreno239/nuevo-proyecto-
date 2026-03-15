import { Component } from '@angular/core'
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';




@Component({

selector:'app-dashboard-user',
standalone:true,
imports: [CommonModule], 

templateUrl:'./dashboard-user.html',
styleUrl:'./dashboard-user.css'

})



export class DashboardUserComponent{
//sistema de navegacion entre paginas, inyeccion de dependencias
  constructor(private router: Router){}

  
    cerrarSesion(){

    this.router.navigate(['']);}



  // controla que pantalla se muestra
  vistaActual: string = 'inicio';

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  // Datos de ejemplo para la tabla
  predios = [

    {
      nombre: "La Esperanza",
      municipio: "Bucaramanga",
      area: 12.5,
      estado: "Activo"
    },

    {
      nombre: "El Porvenir",
      municipio: "Piedecuesta",
      area: 8.3,
      estado: "Activo"
    },

    {
      nombre: "Villa Verde",
      municipio: "Floridablanca",
      area: 20.1,
      estado: "En revisión"
    }

  ]
//departamentos colombia
mostrarformulario = false;

departamentos = [

"Amazonas",
"Antioquia",
"Arauca",
"Atlántico",
"Bolívar",
"Boyacá",
"Caldas",
"Caquetá",
"Casanare",
"Cauca",
"Cesar",
"Chocó",
"Córdoba",
"Cundinamarca",
"Guainía",
"Guaviare",
"Huila",
"La Guajira",
"Magdalena",
"Meta",
"Nariño",
"Norte de Santander",
"Putumayo",
"Quindío",
"Risaralda",
"San Andrés y Providencia",
"Santander",
"Sucre",
"Tolima",
"Valle del Cauca",
"Vaupés",
"Vichada"

];
}

