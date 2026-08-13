import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paciente {
  _id?: string;
  nombre: string;
  apellido?: string;
  cedula?: string;
  telefono?: string;
  email?: string;
  fechaNacimiento?: string;
  direccion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private apiUrl = 'http://localhost:8080/api/pacientes';

  constructor(private http: HttpClient) {}

  obtenerPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  crearPaciente(paciente: Paciente): Observable<any> {
    return this.http.post(this.apiUrl, paciente);
  }

  actualizarPaciente(id: string, paciente: Paciente): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, paciente);
  }

  eliminarPaciente(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}