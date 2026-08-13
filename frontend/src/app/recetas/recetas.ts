import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
  RecetasService,
  Receta
} from '../services/recetas.service';

import {
  PacientesService
} from '../services/pacientes.service';

import {
  DoctoresService,
  Doctor
} from '../services/doctores.service';

@Component({
  selector: 'app-recetas',
  imports: [FormsModule, DatePipe],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class Recetas implements OnInit {

  recetas: Receta[] = [];

  recetasFiltradas: Receta[] = [];

  pacientes: any[] = [];

  doctores: Doctor[] = [];

  busqueda = '';

  mostrarFormulario = false;

  editando = false;

  mensaje = '';

  error = '';

  recetaActual: Receta = {

    paciente: '',
    doctor: '',

    medicamento: '',
    dosis: '',
    duracion: '',
    indicaciones: '',

    fecha: ''

  };

  constructor(
    private recetasService: RecetasService,
    private pacientesService: PacientesService,
    private doctoresService: DoctoresService
  ) {}

  ngOnInit(): void {

    this.cargarRecetas();

    this.cargarPacientes();

    this.cargarDoctores();

  }

  cargarRecetas(): void {

    this.recetasService
      .obtenerRecetas()
      .subscribe({

        next: (data) => {

          this.recetas = data;

          this.recetasFiltradas = data;

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudieron cargar las recetas';

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

      this.recetasFiltradas =
        this.recetas;

      return;

    }

    this.recetasFiltradas =
      this.recetas.filter(receta => {

        const paciente =
          this.obtenerNombrePaciente(receta);

        const doctor =
          this.obtenerNombreDoctor(receta);

        return (

          paciente
            .toLowerCase()
            .includes(texto) ||

          doctor
            .toLowerCase()
            .includes(texto) ||

          receta.medicamento
            .toLowerCase()
            .includes(texto) ||

          receta.dosis
            .toLowerCase()
            .includes(texto)

        );

      });

  }

  nuevaReceta(): void {

    this.editando = false;

    this.recetaActual = {

      paciente: '',
      doctor: '',

      medicamento: '',
      dosis: '',
      duracion: '',
      indicaciones: '',

      fecha: ''

    };

    this.mostrarFormulario = true;

    this.mensaje = '';

    this.error = '';

  }

  editarReceta(
    receta: Receta
  ): void {

    this.editando = true;

    this.recetaActual = {

      ...receta,

      paciente:
        this.obtenerId(
          receta.paciente
        ),

      doctor:
        this.obtenerId(
          receta.doctor
        ),

      fecha:
        receta.fecha
          ? receta.fecha.substring(0, 10)
          : ''

    };

    this.mostrarFormulario = true;

    this.mensaje = '';

    this.error = '';

  }

  guardarReceta(): void {

    this.mensaje = '';

    this.error = '';

    if (

      !this.recetaActual.paciente ||
      !this.recetaActual.doctor ||
      !this.recetaActual.medicamento.trim() ||
      !this.recetaActual.dosis.trim() ||
      !this.recetaActual.duracion.trim()

    ) {

      this.error =
        'Complete todos los campos obligatorios';

      return;

    }

    if (

      this.editando &&
      this.recetaActual._id

    ) {

      this.recetasService
        .actualizarReceta(

          this.recetaActual._id,

          this.recetaActual

        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Receta actualizada correctamente';

            this.mostrarFormulario = false;

            this.cargarRecetas();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo actualizar la receta';

          }

        });

    } else {

      this.recetasService
        .crearReceta(
          this.recetaActual
        )
        .subscribe({

          next: () => {

            this.mensaje =
              'Receta creada correctamente';

            this.mostrarFormulario = false;

            this.cargarRecetas();

          },

          error: (err) => {

            console.error(err);

            this.error =
              'No se pudo crear la receta';

          }

        });

    }

  }

  eliminarReceta(
    receta: Receta
  ): void {

    if (!receta._id) {

      return;

    }

    const confirmar =
      confirm(
        '¿Deseas eliminar esta receta?'
      );

    if (!confirmar) {

      return;

    }

    this.mensaje = '';

    this.error = '';

    this.recetasService
      .eliminarReceta(
        receta._id
      )
      .subscribe({

        next: () => {

          this.mensaje =
            'Receta eliminada correctamente';

          this.cargarRecetas();

        },

        error: (err) => {

          console.error(err);

          this.error =
            'No se pudo eliminar la receta';

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
    receta: Receta
  ): string {

    if (

      receta.paciente &&
      typeof receta.paciente === 'object'

    ) {

      return receta.paciente.nombre || '';

    }

    const paciente =
      this.pacientes.find(

        p =>
          p._id === receta.paciente

      );

    return paciente?.nombre || '';

  }

  obtenerNombreDoctor(
    receta: Receta
  ): string {

    if (

      receta.doctor &&
      typeof receta.doctor === 'object'

    ) {

      return receta.doctor.nombre || '';

    }

    const doctor =
      this.doctores.find(

        d =>
          d._id === receta.doctor

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