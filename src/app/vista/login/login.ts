import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthController } from '../../controlador/auth-control';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  clave = '';
  error = '';

  constructor(
    private authController: AuthController,
    private router: Router
  ) {}

  login() {
    this.authController.login(this.email, this.clave).subscribe({
      next: (respuesta) => {
        const token = respuesta.datos.token;
        const rol = respuesta.datos.rol;
        const nombre = respuesta.datos.nombre;

        this.authController['authService'].guardarSesion(token, rol, nombre);

        if (rol === 'FUNCIONARIO_ICA') {
          this.router.navigate(['/admin']);
        } else if (rol === 'TECNICO') {
          this.router.navigate(['/tecnico']);
        } else if (rol === 'PRODUCTOR') {
          this.router.navigate(['/usuario']);
        }
      },
      error: (err) => {
        this.error = 'Correo o contraseña incorrectos';
      }
    });
  }
}