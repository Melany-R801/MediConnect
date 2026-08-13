import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  CitasService,
  Cita
} from '../services/citas.service';

import {
  PacientesService
} from '../services/pacientes.service';

import {
  DoctoresService,
  Doctor
} from '../services/doctores.service';

import {
  EspecialidadesService,
  Especialidad
} from '../services/especialidades.service';

@Component({
  selector: 'app-citas',
  imports: [FormsModule, DatePipe],
  templateUrl: './citas.html',
  styleUrl: './citas.css'
})
export class Citas implements OnInit {

  citas: Cita[] = [];
  citasFiltradas: Cita[] = [];

  pacientes: any[] = [];
  doctores: Doctor[] = [];
  especialidades: Especialidad[] = [];

  busqueda = '';

  citaActual: Cita = {
    paciente: '',
    doctor: '',
    especialidad: '',
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'programada'
  };

  editando = false;
  mostrarFormulario = false;

  mensaje = '';
  error = '';

  constructor(
    private citasService: CitasService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService,
    private especialidadesService: EspecialidadesService
  ) {}

  ngOnInit(): void {

    this.cargarCitas();

    this.cargarPacientes();

    this.cargarDoctores();

    this.cargarEspecialidades();

  }

  cargarCitas(): void {

    this.citasService
      .obtenerCitas()
      .subscribe({

        next: (data) => {

          this.citas = data;

          this.citasFiltradas = data;

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudieron cargar las citas';

        }

      });

  }

  cargarPacientes(): void {

    this.pacientesService
      .obtenerPacientes()
      .subscribe({

        next: (data) => {

          this.pacientes = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  cargarDoctores(): void {

    this.doctoresService
      .obtenerDoctores()
      .subscribe({

        next: (data) => {

          this.doctores = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  cargarEspecialidades(): void {

    this.especialidadesService
      .obtenerEspecialidades()
      .subscribe({

        next: (data) => {

          this.especialidades = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

  buscar(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();

    if (!texto) {

      this.citasFiltradas =
        this.citas;

      return;

    }

    this.citasFiltradas =
      this.citas.filter(cita => {

        const paciente =
          this.obtenerNombrePaciente(cita);

        const doctor =
          this.obtenerNombreDoctor(cita);

        const especialidad =
          this.obtenerNombreEspecialidad(cita);

        return (

          paciente
            .toLowerCase()
            .includes(texto) ||

          doctor
            .toLowerCase()
            .includes(texto) ||

          especialidad
            .toLowerCase()
            .includes(texto) ||

          cita.motivo
            ?.toLowerCase()
            .includes(texto) ||

          cita.estado
            ?.toLowerCase()
            .includes(texto)

        );

      });

  }

  nuevaCita(): void {

    this.editando = false;

    this.citaActual = {

      paciente: '',
      doctor: '',
      especialidad: '',
      fecha: '',
      hora: '',
      motivo: '',
      estado: 'programada'

    };

    this.mostrarFormulario = true;

    this.mensaje = '';
    this.error = '';

  }

  editarCita(cita: Cita): void {

    this.editando = true;

    this.citaActual = {

      ...cita,

      paciente:
        this.obtenerId(cita.paciente),

      doctor:
        this.obtenerId(cita.doctor),

      especialidad:
        this.obtenerId(cita.especialidad),

      fecha:
        this.formatearFechaParaInput(cita.fecha)

    };

    this.mostrarFormulario = true;

    this.mensaje = '';
    this.error = '';

  }

  guardarCita(): void {

    this.mensaje = '';
    this.error = '';

    if (

      !this.citaActual.paciente ||
      !this.citaActual.doctor ||
      !this.citaActual.especialidad ||
      !this.citaActual.fecha ||
      !this.citaActual.hora ||
      !this.citaActual.motivo.trim()

    ) {

      this.error =
        'Todos los campos son obligatorios';

      return;

    }

    if (
      this.editando &&
      this.citaActual._id
    ) {

      this.citasService
        .actualizarCita(
          this.citaActual._id,
          this.citaActual
        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Cita actualizada correctamente';

            this.mostrarFormulario = false;

            this.cargarCitas();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo actualizar la cita';

          }

        });

    } else {

      this.citasService
        .crearCita(this.citaActual)
        .subscribe({

          next: () => {

            this.mensaje =
              'Cita creada correctamente';

            this.mostrarFormulario = false;

            this.cargarCitas();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo crear la cita';

          }

        });

    }

  }

  eliminarCita(cita: Cita): void {

    if (!cita._id) {
      return;
    }

    const confirmar =
      confirm(
        '¿Deseas eliminar esta cita?'
      );

    if (!confirmar) {
      return;
    }

    this.mensaje = '';
    this.error = '';

    this.citasService
      .eliminarCita(cita._id)
      .subscribe({

        next: () => {

          this.mensaje =
            'Cita eliminada correctamente';

          this.cargarCitas();

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudo eliminar la cita';

        }

      });

  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.mensaje = '';
    this.error = '';

  }

  obtenerNombrePaciente(cita: Cita): string {

    if (
      cita.paciente &&
      typeof cita.paciente === 'object'
    ) {

      return (
        cita.paciente.nombre ||
        ''
      );

    }

    const paciente =
      this.pacientes.find(
        p =>
          p._id === cita.paciente
      );

    return paciente?.nombre || '';

  }

  obtenerNombreDoctor(cita: Cita): string {

    if (
      cita.doctor &&
      typeof cita.doctor === 'object'
    ) {

      return (
        cita.doctor.nombre ||
        ''
      );

    }

    const doctor =
      this.doctores.find(
        d =>
          d._id === cita.doctor
      );

    return doctor?.nombre || '';

  }

  obtenerNombreEspecialidad(
    cita: Cita
  ): string {

    if (
      cita.especialidad &&
      typeof cita.especialidad === 'object'
    ) {

      return (
        cita.especialidad.nombre ||
        ''
      );

    }

    const especialidad =
      this.especialidades.find(
        e =>
          e._id === cita.especialidad
      );

    return especialidad?.nombre || '';

  }

  obtenerId(valor: any): string {

    if (
      valor &&
      typeof valor === 'object'
    ) {

      return valor._id;

    }

    return valor || '';

  }

  formatearFechaParaInput(
    fecha: string
  ): string {

    if (!fecha) {
      return '';
    }

    return fecha.substring(0, 10);

  }

}