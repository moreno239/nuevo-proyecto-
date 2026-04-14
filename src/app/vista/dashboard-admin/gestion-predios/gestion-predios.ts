import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../soa/modal-service'; // ← modal rechazo


interface Predio {
  id: number;
  nombre: string;
  propietario: string;
  documentoPropietario: string;
  departamento: string;
  municipio: string;
  vereda: string;
  extension: number;
  correo: string;
  numeroICA: string;   // se genera solo al aprobar
  estado: 'Pendiente' | 'Activo' | 'Rechazado';
}

@Component({
  selector: 'app-gestion-predios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-predios.html',
  styleUrl: './gestion-predios.css'
})
export class GestionPredios {

  constructor(private modalService: ModalService) {}
  

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoEdicion = false;

  // Modal de rechazo
  mostrarModalRechazo = false;
  predioArechazar: Predio | null = null;
  motivoRechazo = '';

  predios: Predio[] = [
    { id: 1, nombre: 'El Paraíso',  propietario: 'Carlos Pérez',  documentoPropietario: '1000001', departamento: 'Santander', municipio: 'Bucaramanga', vereda: 'El Carmen', extension: 5,  correo: 'carlos@mail.com', numeroICA: 'ICA-001', estado: 'Activo'    },
    { id: 2, nombre: 'La Esperanza',propietario: 'Ana Ruiz',      documentoPropietario: '1000002', departamento: 'Boyacá',    municipio: 'Tunja',       vereda: 'Centro',    extension: 3,  correo: 'ana@mail.com',    numeroICA: '',        estado: 'Pendiente' },
    { id: 3, nombre: 'Los Pinos',   propietario: 'Pedro Torres',  documentoPropietario: '1000003', departamento: 'Cundinamarca', municipio: 'Zipaquirá', vereda: 'El Rosal', extension: 8,  correo: 'pedro@mail.com',  numeroICA: '',        estado: 'Pendiente' },
  ];

 toggleEstado(predio: Predio): void { predio.estado = predio.estado === 'Activo' ? 'Rechazado' : 'Activo'; }

  formulario: Predio = this.formularioVacio();

  formularioVacio(): Predio {
    return { id: 0, nombre: '', 
      propietario: '', 
      documentoPropietario: '', 
      departamento: '', 
      municipio: '', 
      vereda: '', 
      extension: 0, 
      correo: '', 
      numeroICA: '', 
      estado: 'Pendiente' };
  }

  nuevoPredio() {
    this.formulario = this.formularioVacio();
    this.modoEdicion = false;
    this.vista = 'formulario';
  }

  editar(predio: Predio) {
    this.formulario = { ...predio };
    this.modoEdicion = true;
    this.vista = 'formulario';
  }

  // Aprueba el predio y genera número ICA automático
  aprobar(predio: Predio) {
    predio.estado = 'Activo';
    predio.numeroICA = 'ICA-' + String(predio.id).padStart(3, '0');
  }

  // Abre modal de rechazo — el motivo es obligatorio
  abrirRechazo(p: Predio):void {
      this.modalService.abrir({
      titulo:      'Motivo de rechazo',
      placeholder: 'Escriba el motivo del rechazo...',
      alConfirmar: (motivo: string) => {
        p.estado = 'Pendiente';
        // cuando haya backend: enviar motivo al API aquí
    }
  });
  }

  confirmarRechazo() {
    if (!this.motivoRechazo.trim()) {
      alert('Debe ingresar un motivo de rechazo.');
      return;
    }
    if (this.predioArechazar) {
      this.predioArechazar.estado = 'Rechazado';
    }
    this.mostrarModalRechazo = false;
  }

  desactivar(predio: Predio) {
    predio.estado = 'Rechazado'; // reutilizamos como "inactivo"
  }

  guardar() {
    if (this.modoEdicion) {
      const index = this.predios.findIndex(p => p.id === this.formulario.id);
      if (index !== -1) this.predios[index] = { ...this.formulario };
    } else {
      this.formulario.id = this.predios.length + 1;
      this.predios.push({ ...this.formulario });
    }
    this.vista = 'exito';
  }

  volver() {
    this.mostrarModalRechazo = false;
    this.vista = 'lista';
  }
}