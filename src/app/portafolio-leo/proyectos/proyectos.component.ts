import { Proyecto } from './../../@core/interfaces/proyecto.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HabilidadesService } from '../../@core/servicios/servicios.service';

@Component({
  selector: 'app-proyectos',
  imports: [],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent implements OnInit {
  private proyectoService = inject(HabilidadesService)
  listProyectData = signal<Proyecto[]>([])

  ngOnInit(): void {
    this.getDataProyect();
  }

  getDataProyect(){
    this.proyectoService.getProyects().subscribe({
      next:(rpta: Proyecto[])=>{
        this.listProyectData.set(rpta);
      },
      error: (err)=>{},
      complete: ()=>{}
    })
  }

}
