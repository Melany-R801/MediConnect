import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  UsuariosService,
  Usuario
} from '../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  imports: [FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];

  busqueda = '';

  usuarioActual: Usuario = {
    nombre: '',
    email: '',
    password: '',
    rol: 'user'
  };

  editando = false;
  mostrarFormulario = false;

  mensaje = '';
  error = '';

  constructor(
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {

    this.usuariosService.obtenerUsuarios().subscribe({

      next: (data) => {

        this.usuarios = data;
        this.usuariosFiltrados = data;

      },

      error: (err) => {

        console.error('Error al cargar usuarios:', err);

        this.error =
          'No se pudieron cargar los usuarios';

      }

    });
  }

  buscar(): void {

    const texto = this.busqueda
      .toLowerCase()
      .trim();

    if (!texto) {

      this.usuariosFiltrados = this.usuarios;

      return;
    }

    this.usuariosFiltrados =
      this.usuarios.filter(usuario =>
        usuario.nombre
          .toLowerCase()
          .includes(texto) ||

        usuario.email
          .toLowerCase()
          .includes(texto) ||

        usuario.rol
          .toLowerCase()
          .includes(texto)
      );
  }

  nuevoUsuario(): void {

    this.editando = false;

    this.usuarioActual = {
      nombre: '',
      email: '',
      password: '',
      rol: 'user'
    };

    this.mostrarFormulario = true;

    this.mensaje = '';
    this.error = '';
  }

  editarUsuario(usuario: Usuario): void {

    this.editando = true;

    this.usuarioActual = {
      ...usuario,
      password: ''
    };

    this.mostrarFormulario = true;

    this.mensaje = '';
    this.error = '';
  }

  guardarUsuario(): void {

    this.mensaje = '';
    this.error = '';

    if (!this.usuarioActual.nombre.trim()) {

      this.error = 'El nombre es obligatorio';

      return;
    }

    if (!this.usuarioActual.email.trim()) {

      this.error = 'El email es obligatorio';

      return;
    }

    if (
      !this.editando &&
      (!this.usuarioActual.password ||
       !this.usuarioActual.password.trim())
    ) {

      this.error = 'La contraseña es obligatoria';

      return;
    }

    if (
      this.editando &&
      this.usuarioActual._id
    ) {

      this.usuariosService
        .actualizarUsuario(
          this.usuarioActual._id,
          this.usuarioActual
        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Usuario actualizado correctamente';

            this.mostrarFormulario = false;

            this.cargarUsuarios();

          },

          error: (err) => {

            console.error(err);

            this.error =
              err.error?.message ||
              'No se pudo actualizar el usuario';

          }

        });

    } else {

      this.usuariosService
        .crearUsuario(this.usuarioActual)
        .subscribe({

          next: () => {

            this.mensaje =
              'Usuario creado correctamente';

            this.mostrarFormulario = false;

            this.cargarUsuarios();

          },

          error: (err) => {

            console.error(err);

            this.error =
              err.error?.message ||
              'No se pudo crear el usuario';

          }

        });
    }
  }

  eliminarUsuario(usuario: Usuario): void {

    const id = usuario._id || usuario.id;

    if (!id) {
      return;
    }

    if (
      usuario.email ===
      'admin@mediconnect.com'
    ) {

      this.error =
        'No se puede eliminar el administrador principal';

      return;
    }

    const confirmar = confirm(
      `¿Deseas eliminar al usuario ${usuario.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    this.mensaje = '';
    this.error = '';

    this.usuariosService
      .eliminarUsuario(id)
      .subscribe({

        next: () => {

          this.mensaje =
            'Usuario eliminado correctamente';

          this.cargarUsuarios();

        },

        error: (err) => {

          console.error(err);

          this.error =
            err.error?.message ||
            'No se pudo eliminar el usuario';

        }

      });
  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.mensaje = '';
    this.error = '';
  }
}