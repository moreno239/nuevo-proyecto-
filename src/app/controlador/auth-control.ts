import { Injectable } from '@angular/core';
import { AuthService } from '../soa/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthController {

  constructor(private authService: AuthService) {}

  login(usuario: string, password: string) {
    return this.authService.login(usuario, password);
  }

  logout() {
    this.authService.logout();
  }
}
