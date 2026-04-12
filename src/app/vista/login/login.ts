import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { AuthController } from '../../controlador/auth-control'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent {

  usuario = ''
  password = ''

  constructor(
    private authController: AuthController,
    private router: Router
  ) {}

  login() {

    // Llamar al controller
    const rol = this.authController.login(this.usuario, this.password)

    // Si el usuario es admin
    if (rol === 'admin') {

      this.router.navigate(['/admin'])

    }

    // Si es usuario normal
    else if (rol === 'productor') {

      this.router.navigate(['/usuario'])

    }

    // Si no existe
    else {

      alert('Usuario o contraseña incorrectos')

    }

  }

}

