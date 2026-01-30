import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  private apiUrl = `${environment.apiUrl}/credito`;

  constructor(private http: HttpClient) {}

  /**
   * Envía los datos del formulario al backend usando axios (promesa).
   * @param datos
   * @returns Promise con la respuesta del servidor (data)
   */
  enviarFormulario(datos: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, datos);
  }

  obtenerTiposCredito(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tipos`);
  }

}
