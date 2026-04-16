import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Plaga{
  id: number;
  nombre: string;
  cultivoAsociado: string;
  umbralAlerta: number;
  estado: 'Activo'| 'Inactivo';
}


@Component({
  selector: 'app-gestion-plagas',
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-plagas.html',
  styleUrl: './gestion-plagas.css',
})


export class GestionPlagas {

vista : 'lista'|'formulario'|'exito' = 'lista';
modoEdicion = false;

CultivosAsociados:String[]= [
  'Tomate', 
  'Lechuga', 
  'Piña', 
  'Fresa', 
  'Papa'
];
CultivoSeleccionado:String='';


plagas: Plaga [] = [
  {
    id: 1,
    nombre: 'Hongo',
    cultivoAsociado: 'Tomate' ,
    umbralAlerta: 8 ,
    estado: 'Activo',  
  },
  {   
    
    id: 2,
    nombre: 'Mosca',
    cultivoAsociado: 'Piña' ,
    umbralAlerta: 4 ,
    estado: 'Activo', 
  },
  {
    id: 3,
    nombre: 'Gusano',
    cultivoAsociado: 'Fresa' ,
    umbralAlerta: 8 ,
    estado: 'Activo', 
  }
] 




formulario: Plaga = this.formularioVacio();

  formularioVacio(): Plaga {
    return {
      id: 0, 
      nombre: '', 
      cultivoAsociado: '', 
      umbralAlerta: 0, 
      estado: 'Activo' };
  }

  nuevo() { 
    this.formulario = this.formularioVacio();
     this.modoEdicion = false; this.vista = 'formulario';
     }
  editar(p: Plaga) { 
    this.formulario = { ...p }; 
    this.modoEdicion = true; this.vista = 'formulario';
   }
  //funcion de estado de la plaga
  toggleEstado(p: Plaga) 
    { 
      p.estado = p.estado === 'Activo' ? 'Inactivo' : 'Activo'; 
    }

  
  guardar() {
    if (this.modoEdicion) {
      const i = this.plagas.findIndex(p => p.id === this.formulario.id);
      if (i !== -1) this.plagas[i] = { ...this.formulario };
    } else {
      this.formulario.id = this.plagas.length + 1;
      this.plagas.push({ ...this.formulario });
    }
    this.vista = 'exito';
  }

  volver() { this.vista = 'lista'; }
}




