import { Injectable } from '@angular/core'
import { AuthService } from '../soa/auth-service'

@Injectable({
  providedIn: 'root'
})

export class AuthController {

  constructor(private authService: AuthService) {}

  // Controlador que llama al servicio de autenticación
  login(usuario: string, password: string) {

    return this.authService.login(usuario, password)

  }

  logout() {

    this.authService.logout()

  }

}