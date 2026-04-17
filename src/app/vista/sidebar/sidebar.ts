import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';  
import { Router, RouterLinkWithHref } from '@angular/router';
import { MenuService } from '../../soa/menu-services';
import { MenuItem } from '../../modelo/menu-item-modelo';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent implements OnInit {

  rol: string = '';
  menuItems: MenuItem[] = [];

  labelRol: Record<string, string> = {
    productor: 'Productor',
    admin: 'Administrador',
    tecnico: 'Técnico'
  };

  constructor(private menuService: MenuService, private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object ) 
    {}

  ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
      this.rol = localStorage.getItem('userRole') ?? '';
      this.menuItems = this.menuService.getMenu(this.rol);
    }
  } 
  cerrarSesion(): void {
    localStorage.removeItem('userRole');
    this.router.navigate(['']);
  }
}