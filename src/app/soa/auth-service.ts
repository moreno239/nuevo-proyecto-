import { Inject, Injectable, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common';
import { User } from '../modelo/usuario-modelo';
import { platform } from 'os';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Lista de usuarios simulados
  private users: User[] = [

    {
      usuario: 'admin',
      password: '1234',
      rol: 'admin'
    },

    {
      usuario: 'productor',
      password: '12345',
      rol: 'productor'
    }

  ]

  // Método que valida login
  login(usuario: string, password: string) {

    // Buscar usuario en la lista
    const user = this.users.find(
      u => u.usuario === usuario && u.password === password
    )

    // Si el usuario existe
    if (user && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', user.rol);

      return user.rol;
    }

    // Si no existe
    return null

  }

    logout() {
      if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
    }

  }
}