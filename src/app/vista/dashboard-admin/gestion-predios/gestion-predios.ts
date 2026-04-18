import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../soa/modal-service';
import { PredioService } from '../../../soa/predio.service';
import { DepartamentosService } from '../../../soa/ubicaciones-service';
import { ExitoComponent } from '../../exito/exito';

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
  numeroICA: string;
  estado: 'Pendiente' | 'Activo' | 'Rechazado' | 'Inactivo';
}

@Component({
  selector: 'app-gestion-predios',
  standalone: true,
  imports: [CommonModule, FormsModule, ExitoComponent],
  templateUrl: './gestion-predios.html',
  styleUrl: './gestion-predios.css'
})
export class GestionPredios implements OnInit {

  constructor(
    private modalService: ModalService,
    private predioService: PredioService,
    private departamentoservice: DepartamentosService
  ) {}

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  modoEdicion = false;
  cargando = false;
  error = '';

  mostrarModalRechazo = false;
  predioArechazar: Predio | null = null;
  motivoRechazo = '';

  predios: Predio[] = [];
  formulario: Predio = this.formularioVacio();

  departamentos: string[] = [];

  ngOnInit(): void {
    this.departamentos = this.departamentoservice.getDepartamentos();
    this.cargarPredios();
  }

  cargarPredios(): void {
    this.cargando = true;
    this.predioService.listarPredios().subscribe({
      next: (data: any) => {
        this.predios = data.map((p: any) => ({
          id: p.nroRegistroICA,
          nombre: p.nombre,
          propietario: p.nroDocProductor,
          documentoPropietario: p.nroDocProductor,
          departamento: '',
          municipio: '',
          vereda: p.codigoDaneVereda || '',
          extension: p.area,
          correo: p.correo || '',
          numeroICA: p.nroRegistroICA,
          estado: p.estado === 'APROBADO' ? 'Activo' :
                  p.estado === 'PENDIENTE' ? 'Pendiente' : 'Rechazado'
        }));
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar predios';
        this.cargando = false;
      }
    });
  }

  formularioVacio(): Predio {
    return {
      id: 0,
      nombre: '',
      propietario: '',
      documentoPropietario: '',
      departamento: '',
      municipio: '',
      vereda: '',
      extension: 0,
      correo: '',
      numeroICA: '',
      estado: 'Pendiente'
    };
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

  aprobar(predio: Predio) {
    this.predioService.aprobarPredio(predio.numeroICA).subscribe({
      next: () => { predio.estado = 'Activo'; },
      error: () => { this.error = 'Error al aprobar predio'; }
    });
  }

  abrirRechazo(p: Predio): void {
    this.modalService.abrir({
      titulo: 'Motivo de rechazo',
      placeholder: 'Escriba el motivo del rechazo...',
      alConfirmar: () => {
        this.predioService.rechazarPredio(p.numeroICA).subscribe({
          next: () => { p.estado = 'Rechazado'; },
          error: () => { this.error = 'Error al rechazar predio'; }
        });
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
    this.predioService.desactivarPredio(predio.numeroICA).subscribe({
      next: () => { predio.estado = 'Inactivo'; },
      error: () => { this.error = 'Error al desactivar predio'; }
    });
  }

  guardar() {
    if (this.modoEdicion) {
      this.predioService.actualizarPredio(this.formulario.numeroICA, {
        nroPredial: this.formulario.documentoPropietario,
        nombre: this.formulario.nombre,
        area: this.formulario.extension,
        correo: this.formulario.correo,
        codigoDaneVereda: this.formulario.vereda
      }).subscribe({
        next: () => { this.cargarPredios(); this.vista = 'exito'; },
        error: () => { this.error = 'Error al actualizar predio'; }
      });
    } else {
      this.predioService.crearPredio({
        nroPredial: this.formulario.documentoPropietario,
        nombre: this.formulario.nombre,
        area: this.formulario.extension,
        correo: this.formulario.correo,
        codigoDaneVereda: this.formulario.vereda,
        nroDocProductor: this.formulario.documentoPropietario
      }).subscribe({
        next: () => { this.cargarPredios(); this.vista = 'exito'; },
        error: () => { this.error = 'Error al crear predio'; }
      });
    }
  }

  volver() {
    this.mostrarModalRechazo = false;
    this.vista = 'lista';
    this.cargarPredios();
  }
}