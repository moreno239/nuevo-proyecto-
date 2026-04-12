import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormUsuario, Usuario } from '../form-usuario/form-usuario';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [CommonModule, FormUsuario],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css',
})

export class GestionUsuariosComponent {

  vista: 'lista' | 'formulario' | 'exito' = 'lista';
  usuarioSeleccionado: Usuario | null = null;  // null = nuevo, objeto = editar
// usuarios como prueba sin conexion a base de datos 
  usuarios: Usuario[] = [
    { 
      id: 1, 
      identificacion: '1000001', 
      nombre: 'Carlos', 
      apellido: 'Pérez', 
      telefono: '3101234567', 
      correo: 'carlos@mail.com', 
      rol: 'Productor', 
      estado: 'Activo'   },

    { 
      id: 2, 
      identificacion: '1000002', 
      nombre: 'Laura',  
      apellido: 'Gómez', 
      telefono: '3209876543', 
      correo: 'laura@mail.com',  
      rol: 'Técnico',   
      estado: 'Activo'  
     }
  ];
//funciones para llamar al usuario seleccionado o crear un nuevo usuario
  nuevoUsuario(): void { this.usuarioSeleccionado = null; this.vista = 'formulario'; }
  editar(u: Usuario): void { this.usuarioSeleccionado = u;    this.vista = 'formulario'; }
  //funcion para el estado de cada usuario segun a eleccion 
  toggleEstado(u: Usuario): void { u.estado = u.estado === 'Activo' ? 'Inactivo' : 'Activo'; }


  // se llama la funcion si es el caso de ya estar asociado acutaliza o se agrega si es nuevo 
  alGuardar(usuario: Usuario): void {
    if (usuario.id) {
      const i = this.usuarios.findIndex(u => u.id === usuario.id);
      if (i !== -1) this.usuarios[i] = usuario;
    } else {
      usuario.id = this.usuarios.length + 1;
      this.usuarios.push(usuario);
    }
    this.vista = 'exito';
  }

  alCancelar(): void { this.vista = 'lista'; }
  volver():     void { this.vista = 'lista'; }
}

