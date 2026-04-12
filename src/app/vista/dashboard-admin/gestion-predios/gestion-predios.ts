import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';

export interface Predio{
  id: number;
  nombre: string;
  propietario: string;
  documentoPropietario: string;
  departamento: string;
  municipio: string;
  vereda: string;
  extension: number;
  correo: string;
  numeroICA: string;
  estado: string;
}
@Component({
  selector: 'app-gestion-predios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-predios.html',
  styleUrl: './gestion-predios.css',
})
export class GestionPredios {
    // ── Estado de la vista ─────────────────────────────────────
  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  predioSeleccionado: Predio | null = null;

  // ── Estado del modal de rechazo ────────────────────────────
  mostrarModalRechazo = false;
  predioArechazar: Predio | null = null;
  motivoRechazo = '';

  // ── Datos ──────────────────────────────────────────────────
  predios: Predio[] = [
    { id: 1, nombre: 'El Paraíso',    propietario: 'Carlos Pérez',  documentoPropietario: '1000001', departamento: 'Santander',    municipio: 'Bucaramanga', vereda: 'El Carmen', extension: 5,  correo: 'carlos@mail.com', numeroICA: 'ICA-001', estado: 'Activo'    },
    { id: 2, nombre: 'La Esperanza',  propietario: 'Ana Ruiz',      documentoPropietario: '1000002', departamento: 'Boyacá',       municipio: 'Tunja',       vereda: 'Centro',    extension: 3,  correo: 'ana@mail.com',    numeroICA: '',        estado: 'Pendiente' },
    { id: 3, nombre: 'Los Pinos',     propietario: 'Pedro Torres',  documentoPropietario: '1000003', departamento: 'Cundinamarca', municipio: 'Zipaquirá',   vereda: 'El Rosal',  extension: 8,  correo: 'pedro@mail.com',  numeroICA: '',        estado: 'Pendiente' },
    { id: 4, nombre: 'Villa Verde',   propietario: 'María Castro',  documentoPropietario: '1000004', departamento: 'Antioquia',    municipio: 'Medellín',    vereda: 'La Sierra', extension: 12, correo: 'maria@mail.com',  numeroICA: 'ICA-002', estado: 'Activo'    },
  ];

  // ── Navegación ─────────────────────────────────────────────

  abrirNuevo(): void {
    this.predioSeleccionado = null;
    this.vista = 'formulario';
  }

  abrirEditar(predio: Predio): void {
    this.predioSeleccionado = predio;
    this.vista = 'formulario';
  }

  // ── Acciones sobre la lista ────────────────────────────────
  toggleEstado(p: Predio): void { p.estado = p.estado === 'Activo' ? 'Inactivo' : 'Activo'; }

  aprobar(predio: Predio): void {
    // El número ICA se genera automáticamente al aprobar
    predio.estado   = 'Activo';
    predio.numeroICA = 'ICA-' + String(predio.id).padStart(3, '0');
  }

  abrirRechazo(predio: Predio): void {
    this.predioArechazar  = predio;
    this.motivoRechazo    = '';
    this.mostrarModalRechazo = true;
  }

  confirmarRechazo(): void {
    // El motivo es obligatorio antes de confirmar
    if (!this.motivoRechazo.trim()) {
      alert('Debe ingresar un motivo de rechazo.');
      return;
    }
    if (this.predioArechazar) this.predioArechazar.estado = 'Rechazado';
    this.cerrarModal();
  }

  desactivar(predio: Predio): void { predio.estado = 'Rechazado'; }

  cerrarModal(): void {
    this.mostrarModalRechazo = false;
    this.predioArechazar     = null;
    this.motivoRechazo       = '';
  }

  // ── Eventos del hijo ───────────────────────────────────────

  alGuardar(predio: Predio): void {
    if (predio.id) {
      const i = this.predios.findIndex(p => p.id === predio.id);
      if (i !== -1) this.predios[i] = predio;
    } else {
      predio.id = this.predios.length + 1;
      this.predios.push(predio);
    }
    this.vista = 'exito';
  }

  alCancelar(): void { this.vista = 'lista'; }
  volver():     void { this.vista = 'lista'; }
}
