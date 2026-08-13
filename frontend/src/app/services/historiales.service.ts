import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Historial {
  _id?: string;

  paciente: any;
  doctor: any;

  diagnostico: string;
  notas: string;

  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class HistorialesService {

  private apiUrl = 'http://localhost:8080/api/historiales';

  constructor(private http: HttpClient) {}

  obtenerHistoriales(): Observable<Historial[]> {
    return this.http.get<Historial[]>(this.apiUrl);
  }

  crearHistorial(historial: Historial): Observable<any> {
    return this.http.post(
      this.apiUrl,
      historial
    );
  }

  actualizarHistorial(
    id: string,
    historial: Historial
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      historial
    );

  }

  eliminarHistorial(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }

}