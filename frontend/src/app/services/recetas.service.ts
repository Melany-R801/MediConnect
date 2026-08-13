import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Receta {
  _id?: string;

  paciente: any;
  doctor: any;

  medicamento: string;
  dosis: string;
  duracion: string;
  indicaciones?: string;

  fecha?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private apiUrl = 'http://localhost:8080/api/recetas';

  constructor(private http: HttpClient) {}

  obtenerRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  crearReceta(receta: Receta): Observable<any> {
    return this.http.post(
      this.apiUrl,
      receta
    );
  }

  actualizarReceta(
    id: string,
    receta: Receta
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      receta
    );
  }

  eliminarReceta(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}