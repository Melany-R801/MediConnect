import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DoctoresService,
  Doctor
} from '../services/doctores.service';

@Component({
  selector: 'app-doctores',
  imports: [FormsModule],
  templateUrl: './doctores.html',
  styleUrl: './doctores.css'
})
export class Doctores implements OnInit {

  doctores: Doctor[] = [];
  doctoresFiltrados: Doctor[] = [];

  busqueda = '';

  doctorActual: Doctor = {
    nombre: '',
    cedula: '',
    especialidad: '',
    horario: '',
    telefono: '',
    email: ''
  };

  editando = false;
  mostrarFormulario = false;

  mensaje = '';
  error = '';

  constructor(
    private doctoresService: DoctoresService
  ) {}

  ngOnInit(): void {
    this.cargarDoctores();
  }

  cargarDoctores(): void {

    this.doctoresService.obtenerDoctores().subscribe({

      next: (data) => {

        this.doctores = data;
        this.doctoresFiltrados = data;

      },

      error: (err) => {

        console.error(err);

        this.error = 'No se pudieron cargar los doctores';

      }

    });

  }

  buscar(): void {

    const texto = this.busqueda
      .toLowerCase()
      .trim();

    if (!texto) {

      this.doctoresFiltrados = this.doctores;
      return;

    }

    this.doctoresFiltrados = this.doctores.filter(doctor =>
      doctor.nombre?.toLowerCase().includes(texto) ||
      doctor.cedula?.toLowerCase().includes(texto) ||
      doctor.especialidad?.toLowerCase().includes(texto) ||
      doctor.email?.toLowerCase().includes(texto)
    );

  }

  nuevoDoctor(): void {

    this.editando = false;

    this.doctorActual = {
      nombre: '',
      cedula: '',
      especialidad: '',
      horario: '',
      telefono: '',
      email: ''
    };

    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';

  }

  editarDoctor(doctor: Doctor): void {

    this.editando = true;

    this.doctorActual = {
      ...doctor
    };

    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';

  }

  guardarDoctor(): void {

    this.mensaje = '';
    this.error = '';

    if (
      !this.doctorActual.nombre.trim() ||
      !this.doctorActual.cedula.trim() ||
      !this.doctorActual.especialidad.trim() ||
      !this.doctorActual.horario.trim() ||
      !this.doctorActual.telefono.trim() ||
      !this.doctorActual.email.trim()
    ) {

      this.error = 'Todos los campos son obligatorios';
      return;

    }

    if (this.editando && this.doctorActual._id) {

      this.doctoresService
        .actualizarDoctor(
          this.doctorActual._id,
          this.doctorActual
        )
        .subscribe({

          next: () => {

            this.mensaje = 'Doctor actualizado correctamente';

            this.mostrarFormulario = false;

            this.cargarDoctores();

          },

          error: (err) => {

            console.error(err);

            this.error = 'No se pudo actualizar el doctor';

          }

        });

    } else {

      this.doctoresService
        .crearDoctor(this.doctorActual)
        .subscribe({

          next: () => {

            this.mensaje = 'Doctor creado correctamente';

            this.mostrarFormulario = false;

            this.cargarDoctores();

          },

          error: (err) => {

            console.error(err);

            this.error = 'No se pudo crear el doctor';

          }

        });

    }

  }

  eliminarDoctor(doctor: Doctor): void {

    if (!doctor._id) {
      return;
    }

    const confirmar = confirm(
      `¿Deseas eliminar al doctor ${doctor.nombre}?`
    );

    if (!confirmar) {
      return;
    }

    this.mensaje = '';
    this.error = '';

    this.doctoresService
      .eliminarDoctor(doctor._id)
      .subscribe({

        next: () => {

          this.mensaje = 'Doctor eliminado correctamente';

          this.error = '';

          this.cargarDoctores();

        },

        error: (err) => {

          console.error('Error al eliminar doctor:', err);

          this.mensaje = '';

          this.error = 'No se pudo eliminar el doctor';

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