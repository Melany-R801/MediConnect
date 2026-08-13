import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cita {
  _id?: string;

  paciente: any;
  doctor: any;
  especialidad: any;

  fecha: string;
  hora: string;
  motivo: string;

  estado:
    | 'programada'
    | 'confirmada'
    | 'atendida'
    | 'cancelada';
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private apiUrl = 'https://mediconnect-production-0cf5.up.railway.app/api/citas';

  constructor(private http: HttpClient) {}

  obtenerCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  crearCita(cita: Cita): Observable<any> {
    return this.http.post(this.apiUrl, cita);
  }

  actualizarCita(
    id: string,
    cita: Cita
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      cita
    );
  }

  eliminarCita(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
