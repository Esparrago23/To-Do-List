import { Component, signal,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { TareaService } from './tarea.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Christian-CATH-to-do-List');


  public mensajeDelApi: string = 'Cargando...';
  public tareas: any[] = [];
  public nuevaTareaDescripcion: string = '';

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.cargarMensajePersonal();
    this.cargarTareas();
  }

  cargarMensajePersonal(): void {
    this.tareaService.getNombreCompleto().subscribe(data => {
      this.mensajeDelApi = data.nombreCompleto;
    });
  }

  cargarTareas(): void {
    this.tareaService.getTareas().subscribe(data => {
      this.tareas = data;
    });
  }

  agregarTarea(): void {
    if (this.nuevaTareaDescripcion.trim() === '') {
      return; 
    }

    this.tareaService.addTarea(this.nuevaTareaDescripcion).subscribe(() => {
      this.cargarTareas(); 
      this.nuevaTareaDescripcion = ''; 
    });
  }

  toggleTarea(id: number): void {
    this.tareaService.toggleTarea(id).subscribe(() => {
      this.cargarTareas(); 
    });
  }

  eliminarTarea(id: number): void {
    this.tareaService.deleteTarea(id).subscribe(() => {
      this.cargarTareas(); 
    });
  }
}
