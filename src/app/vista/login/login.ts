import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthController } from '../../controlador/auth-control';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario = '';
  password = '';

  constructor(
    private authController: AuthController,
    private router: Router
  ) {}

  login() {
    const rol = this.authController.login(this.usuario, this.password);
    if (rol === 'admin') {
      this.router.navigate(['/admin']);
    } else if (rol === 'productor') {
      this.router.navigate(['/usuario']);
    } else if (rol === 'tecnico') {
      this.router.navigate(['/tecnico']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}