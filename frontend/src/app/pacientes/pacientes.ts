import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PacientesService,
  Paciente
} from '../services/pacientes.service';

@Component({
  selector: 'app-pacientes',
  imports: [FormsModule],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css'
})
export class Pacientes implements OnInit {

  pacientes: Paciente[] = [];
  pacientesFiltrados: Paciente[] = [];

  busqueda = '';

  pacienteActual: Paciente = {
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    email: '',
    fechaNacimiento: '',
    direccion: ''
  };

  editando = false;
  mostrarFormulario = false;

  mensaje = '';
  error = '';

  constructor(
    private pacientesService: PacientesService
  ) {}

  ngOnInit(): void {
    this.cargarPacientes();
  }

  cargarPacientes(): void {

    this.pacientesService.obtenerPacientes().subscribe({

      next: (data) => {

        this.pacientes = data;
        this.pacientesFiltrados = data;

      },

      error: (err) => {

        console.error(err);

        this.error = 'No se pudieron cargar los pacientes';

      }

    });

  }

  buscar(): void {

    const texto = this.busqueda
      .toLowerCase()
      .trim();

    if (!texto) {

      this.pacientesFiltrados = this.pacientes;
      return;

    }

    this.pacientesFiltrados = this.pacientes.filter(paciente =>
      paciente.nombre?.toLowerCase().includes(texto) ||
      paciente.apellido?.toLowerCase().includes(texto) ||
      paciente.cedula?.toLowerCase().includes(texto) ||
      paciente.email?.toLowerCase().includes(texto)
    );

  }

  nuevoPaciente(): void {

    this.editando = false;

    this.pacienteActual = {
      nombre: '',
      apellido: '',
      cedula: '',
      telefono: '',
      email: '',
      fechaNacimiento: '',
      direccion: ''
    };

    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';

  }

  editarPaciente(paciente: Paciente): void {

    this.editando = true;

    this.pacienteActual = {
      ...paciente
    };

    this.mostrarFormulario = true;
    this.mensaje = '';
    this.error = '';

  }

  guardarPaciente(): void {

    this.mensaje = '';
    this.error = '';

    if (!this.pacienteActual.nombre.trim()) {

      this.error = 'El nombre es obligatorio';
      return;

    }

    if (this.editando && this.pacienteActual._id) {

      this.pacientesService
        .actualizarPaciente(
          this.pacienteActual._id,
          this.pacienteActual
        )
        .subscribe({

          next: () => {

            this.mensaje = 'Paciente actualizado correctamente';

            this.mostrarFormulario = false;

            this.cargarPacientes();

          },

          error: (err) => {

            console.error(err);

            this.error = 'No se pudo actualizar el paciente';

          }

        });

    } else {

      this.pacientesService
        .crearPaciente(this.pacienteActual)
        .subscribe({

          next: () => {

            this.mensaje = 'Paciente creado correctamente';

            this.mostrarFormulario = false;

            this.cargarPacientes();

          },

          error: (err) => {

            console.error(err);

            this.error = 'No se pudo crear el paciente';

          }

        });

    }

  }

  eliminarPaciente(paciente: Paciente): void {

  if (!paciente._id) {
    return;
  }

  const confirmar = confirm(
    `¿Deseas eliminar al paciente ${paciente.nombre} ${paciente.apellido ?? ''}?`
  );

  if (!confirmar) {
    return;
  }

  this.mensaje = '';
  this.error = '';

  this.pacientesService
    .eliminarPaciente(paciente._id)
    .subscribe({

      next: () => {

        this.mensaje = 'Paciente eliminado correctamente';

        this.error = '';

        this.cargarPacientes();

      },

      error: (err) => {

        console.error('Error al eliminar paciente:', err);

        this.mensaje = '';

        this.error = 'No se pudo eliminar el paciente';

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