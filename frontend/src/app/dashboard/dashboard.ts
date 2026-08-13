import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  nombreUsuario = 'Usuario';

  rolUsuario = 'user';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const usuarioGuardado =
      localStorage.getItem('usuario');

    if (usuarioGuardado) {

      try {

        const usuario =
          JSON.parse(usuarioGuardado);

        this.nombreUsuario =
          usuario.nombre || 'Usuario';

        this.rolUsuario =
          usuario.rol || 'user';

      } catch (error) {

        console.error(
          'Error al leer usuario:',
          error
        );

      }

    }

  }

  cerrarSesion(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

}