import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private apiUrl = 'http://54.243.206.99:5000';

  constructor(private http: HttpClient) { }


  getNombreCompleto(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Torres`);
  }



  getTareas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tareas`);
  }


  addTarea(descripcion: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tareas`, { descripcion });
  }


  toggleTarea(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tareas/${id}`, {});
  }


  deleteTarea(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tareas/${id}`);
  }
}