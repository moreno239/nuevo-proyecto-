import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../soa/modal-service';
import { ExitoComponent } from '../../exito/exito';

interface Inspeccion {
  id: number;
  codigo: string;
  lugarProduccion: string;
  tipo: string;
  fechaProgramada: string;
  tecnicoAsignado: string;   // vacío cuando llega la petición del usuario
  estado: 'Programada' | 'Pendiente' | 'Cancelada' | 'Realizada';
}

@Component({
  selector: 'app-gestion-inspecciones',
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './gestion-inspecciones.html',
  styleUrl: './gestion-inspecciones.css',
})
export class GestionInspecciones {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';

  // Diferencia los 3 modos del formulario
  modoFormulario: 'nueva' | 'asignar' | 'reasignar' = 'nueva';

  // Inspección seleccionada para asignar o reasignar técnico
  inspeccionSeleccionada: Inspeccion | null = null;
  tecnicoSeleccionado = '';

  // Listas para los desplegables
  lugaresActivos  = ['Invernadero Norte', 'Cultivo Sur'];
  tecnicosActivos = ['Laura Gómez', 'Mario Suárez', 'Sandra López'];
  tiposInspeccion = ['Rutinaria', 'Extraordinaria', 'Seguimiento'];

  // Datos estáticos de prueba
  // Las peticiones del usuario llegan SIN técnico asignado (estado: Pendiente)
  inspecciones: Inspeccion[] = [
    {
      id: 1,
      codigo: 'INS-001',
      lugarProduccion: 'Invernadero Norte',
      tipo: 'Rutinaria',
      fechaProgramada: '2026-04-10',
      tecnicoAsignado: '',           // ← petición sin técnico
      estado: 'Pendiente'
    },
    {
      id: 2,
      codigo: 'INS-002',
      lugarProduccion: 'Cultivo Sur',
      tipo: 'Extraordinaria',
      fechaProgramada: '2026-04-15',
      tecnicoAsignado: 'Mario Suárez', // ← ya tiene técnico asignado
      estado: 'Programada'
    },
    {
      id: 3,
      codigo: 'INS-003',
      lugarProduccion: 'Invernadero Norte',
      tipo: 'Seguimiento',
      fechaProgramada: '2026-04-20',
      tecnicoAsignado: 'Laura Gómez',
      estado: 'Realizada'
    },
  ];

  // Formulario para nueva inspección creada por el admin
  formulario: Partial<Inspeccion> = {};

  constructor(private modalService: ModalService) {}

  // ── MODO: Nueva inspección creada por el admin ─────────────
  nuevaInspeccion(): void {
    this.formulario          = {};
    this.modoFormulario      = 'nueva';
    this.inspeccionSeleccionada = null;
    this.vista               = 'formulario';
  }

  // ── MODO: Asignar técnico a una petición pendiente ─────────
  // La petición llegó sin técnico, el admin la aprueba asignando uno
  abrirAsignacion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.tecnicoSeleccionado    = '';  // empieza vacío para forzar selección
    this.modoFormulario         = 'asignar';
    this.vista                  = 'formulario';
  }

  // ── MODO: Reasignar técnico a una inspección ya programada ─
  abrirReasignacion(ins: Inspeccion): void {
    this.inspeccionSeleccionada = ins;
    this.tecnicoSeleccionado    = ins.tecnicoAsignado; // precarga el técnico actual
    this.modoFormulario         = 'reasignar';
    this.vista                  = 'formulario';
  }

  // ── Cancelación con motivo obligatorio via modal global ────
  abrirCancelacion(ins: Inspeccion): void {
    this.modalService.abrir({
      titulo:      'Motivo de cancelación',
      placeholder: 'Escriba el motivo de la cancelación...',
      alConfirmar: (motivo: string) => {
        ins.estado = 'Cancelada';
        console.log('Motivo:', motivo); // aquí va al backend luego
      }
    });
  }

  // ── Guarda según el modo activo ────────────────────────────
  guardar(): void {

    if (this.modoFormulario === 'asignar' && this.inspeccionSeleccionada) {
      // Valida que se haya seleccionado un técnico
      if (!this.tecnicoSeleccionado) {
        alert('Debe seleccionar un técnico.');
        return;
      }
      // Asigna el técnico y aprueba la inspección
      this.inspeccionSeleccionada.tecnicoAsignado = this.tecnicoSeleccionado;
      this.inspeccionSeleccionada.estado          = 'Programada';

    } else if (this.modoFormulario === 'reasignar' && this.inspeccionSeleccionada) {
      // Valida que se haya seleccionado un técnico diferente
      if (!this.tecnicoSeleccionado) {
        alert('Debe seleccionar un técnico.');
        return;
      }
      // Solo cambia el técnico, el estado sigue Programada
      this.inspeccionSeleccionada.tecnicoAsignado = this.tecnicoSeleccionado;

    } else if (this.modoFormulario === 'nueva') {
      // Crea nueva inspección con código autogenerado
      const nueva: Inspeccion = {
        id:              this.inspecciones.length + 1,
        codigo:          'INS-' + String(this.inspecciones.length + 1).padStart(3, '0'),
        lugarProduccion: this.formulario.lugarProduccion ?? '',
        tipo:            this.formulario.tipo            ?? '',
        fechaProgramada: this.formulario.fechaProgramada ?? '',
        tecnicoAsignado: this.formulario.tecnicoAsignado ?? '',
        estado:          'Programada'
      };
      this.inspecciones.push(nueva);
    }

    this.vista = 'exito';
  }

  volver(): void { this.vista = 'lista'; }
}