import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Especialidad {
  _id?: string;
  nombre: string;
  descripcion: string;
  estado?: 'activa' | 'inactiva';
}

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private apiUrl = 'http://localhost:8080/api/especialidades';

  constructor(private http: HttpClient) {}

  obtenerEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.apiUrl);
  }

  crearEspecialidad(especialidad: Especialidad): Observable<any> {
    return this.http.post(this.apiUrl, especialidad);
  }

  actualizarEspecialidad(
    id: string,
    especialidad: Especialidad
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      especialidad
    );
  }

  eliminarEspecialidad(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}