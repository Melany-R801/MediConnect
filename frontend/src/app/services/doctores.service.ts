import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  _id?: string;
  nombre: string;
  cedula: string;
  especialidad: string;
  horario: string;
  telefono: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {

  private apiUrl = 'http://localhost:8080/api/doctores';

  constructor(private http: HttpClient) {}

  obtenerDoctores(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  crearDoctor(doctor: Doctor): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  actualizarDoctor(id: string, doctor: Doctor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  eliminarDoctor(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}