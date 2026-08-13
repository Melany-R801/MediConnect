import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
  HistorialesService,
  Historial
} from '../services/historiales.service';

import {
  PacientesService
} from '../services/pacientes.service';

import {
  DoctoresService,
  Doctor
} from '../services/doctores.service';

@Component({
  selector: 'app-historiales',
  imports: [FormsModule, DatePipe],
  templateUrl: './historiales.html',
  styleUrl: './historiales.css'
})
export class Historiales implements OnInit {

  historiales: Historial[] = [];

  historialesFiltrados: Historial[] = [];

  pacientes: any[] = [];

  doctores: Doctor[] = [];

  busqueda = '';

  mostrarFormulario = false;

  editando = false;

  mensaje = '';

  error = '';

  historialActual: Historial = {

    paciente: '',
    doctor: '',

    diagnostico: '',
    notas: '',

    fecha: ''

  };

  constructor(
    private historialesService: HistorialesService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService
  ) {}

  ngOnInit(): void {

    this.cargarHistoriales();

    this.cargarPacientes();

    this.cargarDoctores();

  }

  cargarHistoriales(): void {

    this.historialesService
      .obtenerHistoriales()
      .subscribe({

        next: (data) => {

          this.historiales = data;

          this.historialesFiltrados = data;

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudieron cargar los historiales';

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

  buscar(): void {

    const texto =
      this.busqueda
        .toLowerCase()
        .trim();

    if (!texto) {

      this.historialesFiltrados =
        this.historiales;

      return;

    }

    this.historialesFiltrados =
      this.historiales.filter(historial => {

        const paciente =
          this.obtenerNombrePaciente(
            historial
          );

        const doctor =
          this.obtenerNombreDoctor(
            historial
          );

        return (

          paciente
            .toLowerCase()
            .includes(texto) ||

          doctor
            .toLowerCase()
            .includes(texto) ||

          historial.diagnostico
            .toLowerCase()
            .includes(texto) ||

          historial.notas
            .toLowerCase()
            .includes(texto)

        );

      });

  }

  nuevoHistorial(): void {

    this.editando = false;

    this.historialActual = {

      paciente: '',
      doctor: '',

      diagnostico: '',
      notas: '',

      fecha: ''

    };

    this.mostrarFormulario = true;

    this.mensaje = '';

    this.error = '';

  }

  editarHistorial(
    historial: Historial
  ): void {

    this.editando = true;

    this.historialActual = {

      ...historial,

      paciente:
        this.obtenerId(
          historial.paciente
        ),

      doctor:
        this.obtenerId(
          historial.doctor
        ),

      fecha:
        historial.fecha
          ? historial.fecha.substring(0, 10)
          : ''

    };

    this.mostrarFormulario = true;

    this.mensaje = '';

    this.error = '';

  }

  guardarHistorial(): void {

    this.mensaje = '';

    this.error = '';

    if (

      !this.historialActual.paciente ||
      !this.historialActual.doctor ||
      !this.historialActual.diagnostico.trim() ||
      !this.historialActual.notas.trim()

    ) {

      this.error =
        'Todos los campos son obligatorios';

      return;

    }

    if (

      this.editando &&
      this.historialActual._id

    ) {

      this.historialesService
        .actualizarHistorial(

          this.historialActual._id,

          this.historialActual

        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Historial actualizado correctamente';

            this.mostrarFormulario = false;

            this.cargarHistoriales();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo actualizar el historial';

          }

        });

    } else {

      this.historialesService
        .crearHistorial(
          this.historialActual
        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Historial creado correctamente';

            this.mostrarFormulario = false;

            this.cargarHistoriales();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo crear el historial';

          }

        });

    }

  }

  eliminarHistorial(
    historial: Historial
  ): void {

    if (!historial._id) {

      return;

    }

    const confirmar =
      confirm(
        '¿Deseas eliminar este historial médico?'
      );

    if (!confirmar) {

      return;

    }

    this.mensaje = '';

    this.error = '';

    this.historialesService
      .eliminarHistorial(
        historial._id
      )
      .subscribe({

        next: () => {

          this.mensaje =
            'Historial eliminado correctamente';

          this.cargarHistoriales();

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudo eliminar el historial';

        }

      });

  }

  cancelar(): void {

    this.mostrarFormulario = false;

    this.editando = false;

    this.mensaje = '';

    this.error = '';

  }

  obtenerNombrePaciente(
    historial: Historial
  ): string {

    if (

      historial.paciente &&
      typeof historial.paciente === 'object'

    ) {

      return (
        historial.paciente.nombre ||
        ''
      );

    }

    const paciente =
      this.pacientes.find(

        p =>
          p._id === historial.paciente

      );

    return paciente?.nombre || '';

  }

  obtenerNombreDoctor(
    historial: Historial
  ): string {

    if (

      historial.doctor &&
      typeof historial.doctor === 'object'

    ) {

      return (
        historial.doctor.nombre ||
        ''
      );

    }

    const doctor =
      this.doctores.find(

        d =>
          d._id === historial.doctor

      );

    return doctor?.nombre || '';

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

}