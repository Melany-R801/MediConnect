import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  EspecialidadesService,
  Especialidad
} from '../services/especialidades.service';

@Component({
  selector: 'app-especialidades',
  imports: [FormsModule],
  templateUrl: './especialidades.html',
  styleUrl: './especialidades.css'
})
export class Especialidades implements OnInit {

  especialidades: Especialidad[] = [];
  especialidadesFiltradas: Especialidad[] = [];

  busqueda = '';

  especialidadActual: Especialidad = {
    nombre: '',
    descripcion: '',
    estado: 'activa'
  };

  editando = false;
  mostrarFormulario = false;

  mensaje = '';
  error = '';

  constructor(
    private especialidadesService: EspecialidadesService
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  cargarEspecialidades(): void {

    this.especialidadesService
      .obtenerEspecialidades()
      .subscribe({

        next: (data) => {

          this.especialidades = data;
          this.especialidadesFiltradas = data;

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudieron cargar las especialidades';

        }

      });

  }

  buscar(): void {

    const texto = this.busqueda
      .toLowerCase()
      .trim();

    if (!texto) {

      this.especialidadesFiltradas =
        this.especialidades;

      return;

    }

    this.especialidadesFiltradas =
      this.especialidades.filter(especialidad =>
        especialidad.nombre
          ?.toLowerCase()
          .includes(texto) ||

        especialidad.descripcion
          ?.toLowerCase()
          .includes(texto)
      );

  }

  nuevaEspecialidad(): void {

    this.editando = false;

    this.especialidadActual = {
      nombre: '',
      descripcion: '',
      estado: 'activa'
    };

    this.mostrarFormulario = true;

    this.mensaje = '';
    this.error = '';

  }

  editarEspecialidad(
    especialidad: Especialidad
  ): void {

    this.editando = true;

    this.especialidadActual = {
      ...especialidad
    };

    this.mostrarFormulario = true;

    this.mensaje = '';
    this.error = '';

  }

  guardarEspecialidad(): void {

    this.mensaje = '';
    this.error = '';

    if (
      !this.especialidadActual.nombre.trim() ||
      !this.especialidadActual.descripcion.trim()
    ) {

      this.error =
        'El nombre y la descripción son obligatorios';

      return;

    }

    if (
      this.editando &&
      this.especialidadActual._id
    ) {

      this.especialidadesService
        .actualizarEspecialidad(
          this.especialidadActual._id,
          this.especialidadActual
        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Especialidad actualizada correctamente';

            this.mostrarFormulario = false;

            this.cargarEspecialidades();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo actualizar la especialidad';

          }

        });

    } else {

      this.especialidadesService
        .crearEspecialidad(
          this.especialidadActual
        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Especialidad creada correctamente';

            this.mostrarFormulario = false;

            this.cargarEspecialidades();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo crear la especialidad';

          }

        });

    }

  }

  eliminarEspecialidad(
    especialidad: Especialidad
  ): void {

    if (!especialidad._id) {
      return;
    }

    const confirmar = confirm(
      `¿Deseas eliminar la especialidad "${especialidad.nombre}"?`
    );

    if (!confirmar) {
      return;
    }

    this.mensaje = '';
    this.error = '';

    this.especialidadesService
      .eliminarEspecialidad(especialidad._id)
      .subscribe({

        next: () => {

          this.mensaje =
            'Especialidad eliminada correctamente';

          this.error = '';

          this.cargarEspecialidades();

        },

        error: (err) => {

          console.error(
            'Error al eliminar especialidad:',
            err
          );

          this.mensaje = '';

          this.error =
            'No se pudo eliminar la especialidad';

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