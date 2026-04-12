import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../soa/modal-service'; // ← agrega


export interface LugarProduccion {
  id:               number;
  nombre:           string;
  productorTitular: string;
  numeroICA:        string;
  predioAsociado:   string;   // ID o nombre del predio aprobado
  extension:        number;
  estado:           'Pendiente' | 'Activo' | 'Inactivo';
}

@Component({
  selector: 'app-gestion-lugares',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-lugares.html',
  styleUrl: './gestion-lugares.css',
})
export class GestionLugares {
  
constructor(private modalService: ModalService) {}

  lugares: LugarProduccion[] = [
    { id: 1, 
      nombre: 'Invernadero Norte', 
      productorTitular: 'Carlos Pérez', 
      numeroICA: 'ICA-001', 
      predioAsociado: 'El Paraíso',  
      extension: 2, estado: 'Activo'    
    },
    { id: 2, 
      nombre: 'Cultivo Sur',       
      productorTitular: 'Ana Ruiz',     
      numeroICA: '',        
      predioAsociado: 'Villa Verde', 
      extension: 1, 
      estado: 'Pendiente' 
    },
    { id: 3, 
      nombre: 'Finca El Rosal',    
      productorTitular: 'María Castro', 
      numeroICA: 'ICA-002', 
      predioAsociado: 'Villa Verde', 
      extension: 4, 
      estado: 'Activo'    
    },
  ];


 vista: 'lista' | 'formulario' | 'exito' = 'lista';
  lugarSeleccionado: LugarProduccion | null = null;

//funcion para activar o inactivar un lugar
 toggleEstado(l: LugarProduccion): void { l.estado = l.estado === 'Activo' ? 'Inactivo' : 'Activo'; }
  

  abrirNuevo():void { this.lugarSeleccionado = null;   this.vista = 'formulario'; } //agregar un nuevo lugar "null"
  abrirEditar(l: LugarProduccion): void  //editar un lugar ya existente
      { this.lugarSeleccionado = l;
          this.vista = 'formulario'; 
        }

  aprobar(l: LugarProduccion): void {
    l.estado    = 'Activo';
    l.numeroICA = 'ICA-' + String(l.id).padStart(3, '0');
  }

  abrirRechazo(l: LugarProduccion): void {
    this.modalService.abrir({
      titulo:      'Motivo de rechazo',
      placeholder: 'Escriba el motivo del rechazo...',
      alConfirmar: (motivo: string) => {
        l.estado = 'Inactivo';
        // cuando haya backend: enviar motivo al API aquí
    }
  });
}


  desactivar(l: LugarProduccion): void { l.estado = 'Inactivo'; }

  

  alGuardar(lugar: LugarProduccion): void {
    if (lugar.id) {
      const i = this.lugares.findIndex(l => l.id === lugar.id);
      if (i !== -1) this.lugares[i] = lugar;
    } else {
      lugar.id = this.lugares.length + 1;
      this.lugares.push(lugar);
    }
    this.vista = 'exito';
  }

  alCancelar(): void { this.vista = 'lista'; }
  volver():     void { this.vista = 'lista'; }












  
}
