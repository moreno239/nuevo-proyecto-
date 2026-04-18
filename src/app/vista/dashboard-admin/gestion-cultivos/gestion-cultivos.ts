import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';

interface Cultivo {//creacion de los datos que debe tener el cultivo
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  estado: 'Activo' | 'Inactivo'; // los dos estados que se manejan 
}

@Component({
  selector: 'app-gestion-cultivos',
  imports: [CommonModule, FormsModule, ExitoComponent ],
  templateUrl: './gestion-cultivos.html',
  styleUrl: './gestion-cultivos.css',
})
export class GestionCultivos {

  vista: 'lista' | 'formulario' | 'exito' = 'lista'; // modos de vista que se manejan , para el html 
  modoEdicion = false;

  cultivos: Cultivo[] = [ //cultivos unicamente estaticos para pruebas
    { id: 1, 
      nombre: 'Tomate',    
      tipo: 'Hortaliza', 
      descripcion: 'Cultivo de tomate chonto', 
      estado: 'Activo'   },
    { id: 2, 
      nombre: 'Lechuga',   
      tipo: 'Hoja',      
      descripcion: 'Lechuga batavia',          
      estado: 'Activo'   },
    { id: 3, 
      nombre: 'Aguacate',  
      tipo: 'Fruta',     
      descripcion: 'Aguacate Hass',            
      estado: 'Inactivo' },
  ];

  formulario: Cultivo = this.formularioVacio(); // funcion para la creacion de un nuevo cultivo 

  formularioVacio(): Cultivo {// para que llame al formulario sin valores
    return { id: 0, 
      nombre: '', 
      tipo: '', 
      descripcion: '',
      estado: 'Activo' };
  }

  nuevo(){  // crea el cultivo y llama la vista formulario del html 
    this.formulario = this.formularioVacio(); 
    this.modoEdicion = false; 
    this.vista = 'formulario'; 
  }
  editar(c: Cultivo){  // llama al cultivo para editar
    this.formulario = { ...c }; 
    this.modoEdicion = true; 
    this.vista = 'formulario'; }

//funcion para el boton activar o desactivar
  toggleEstado(c: Cultivo){ c.estado = c.estado === 'Activo' ? 'Inactivo' : 'Activo'; } 
  
// guarda el cultivo creado o guarda el cultivo editado , unicamente por el momento
 guardar() {
    if (this.modoEdicion) {
      const i = this.cultivos.findIndex(c => c.id === this.formulario.id);
      if (i !== -1) this.cultivos[i] = { ...this.formulario };
    } else {
      this.formulario.id = this.cultivos.length + 1;
      this.cultivos.push({ ...this.formulario });
    }
    this.vista = 'exito'; // llama a la vista donde sale el modal unicamente 
  }
// lleva de nuevo a la vista inicial 
  volver() { this.vista = 'lista'; }

}

