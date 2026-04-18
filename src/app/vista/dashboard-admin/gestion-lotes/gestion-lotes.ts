import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExitoComponent } from '../../exito/exito';

interface Lote {
  id: number;
  codigo: string;
  lugarProduccion: string;
  extension: number;
  cultivoAsociado: string;
  estado: 'Activo' | 'Inactivo'| 'Pendiente';
}

@Component({
  selector: 'app-gestion-lotes',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent ],
  templateUrl: './gestion-lotes.html',
  styleUrl: './gestion-lotes.css'
})
export class GestionLotes {


  vista: 'lista' | 'formulario' | 'exito' = 'lista';//vista segun la necesidad 
  modoEdicion = false;

  lugaresActivos  = ['Invernadero Norte', 'Cultivo Sur', 'Finca El Rosal'];
  cultivosActivos = ['Tomate', 'Lechuga', 'Fresa', 'Pimentón'];

  lotes: Lote[] = [// lotes para pruebas sin conexion
    { id: 1, codigo: 'L-001', lugarProduccion: 'Invernadero Norte', extension: 0.5, cultivoAsociado: 'Tomate',  estado: 'Activo'   },
    { id: 2, codigo: 'L-002', lugarProduccion: 'Cultivo Sur',       extension: 0.3, cultivoAsociado: 'Lechuga', estado: 'Activo'   },
    { id: 3, codigo: 'L-003', lugarProduccion: 'Finca El Rosal',    extension: 0.8, cultivoAsociado: 'Fresa',   estado: 'Inactivo' },
  ];
//formulario 
  formulario: Lote = this.formularioVacio();
//formulario que devuelve vacio o toma los datos segun edicion
  formularioVacio(): Lote {
    return { 
      id: 0,
      codigo: '', 
      lugarProduccion: '', 
      extension: 0, 
      cultivoAsociado: '', 
      estado: 'Activo' 
    };
  }
// funciones para crear lote editar o desactivar si esta activo
  nuevo() { 
    this.formulario = this.formularioVacio();
     this.modoEdicion = false; this.vista = 'formulario'; 
    }

  editar(l: Lote){ 
    this.formulario = { ...l };
   this.modoEdicion = true; this.vista = 'formulario'; 
  }
  toggleEstado(lote: Lote): void { 
    lote.estado = lote.estado === 'Activo' ? 'Inactivo' : 'Activo'; 
  }

  activar(l:Lote){
    l.estado ="Activo"
  }
  
  desactivar(l: Lote) {
     l.estado = 'Inactivo'; 
    }

  guardar() {
    if (this.modoEdicion) {
      const i = this.lotes.findIndex(l => l.id === this.formulario.id);
      if (i !== -1) this.lotes[i] = { ...this.formulario };
    } else {
      this.formulario.id = this.lotes.length + 1;
      this.lotes.push({ ...this.formulario });
    }
    this.vista = 'exito';
  }

  volver() { this.vista = 'lista'; }
}