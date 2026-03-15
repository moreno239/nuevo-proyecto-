import { Injectable } from '@angular/core'
import { User } from '../modelo/usuario-modelo';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Lista de usuarios simulados
  private users: User[] = [

    {
      usuario: 'admin',
      password: '1234',
      rol: 'admin'
    },

    {
      usuario: 'productor',
      password: '1234',
      rol: 'user'
    }

  ]

  // Método que valida login
  login(usuario: string, password: string) {

    // Buscar usuario en la lista
    const user = this.users.find(
      u => u.usuario === usuario && u.password === password
    )

    // Si el usuario existe
    if (user) {

      // Guardar sesión
      localStorage.setItem('userRole', user.rol)

      return user.rol

    }

    // Si no existe
    return null

  }

    logout() {

    localStorage.removeItem('rol')

  }
}