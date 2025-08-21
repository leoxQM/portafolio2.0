import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Habilidades } from '../interfaces/habilidades.interface';
import { Proyecto } from '../interfaces/proyecto.interface';

@Injectable({providedIn: 'root'})
export class HabilidadesService {
  private http = inject(HttpClient)

  getInfo(){
    return this.http.get<Habilidades[]>("/data/habilidades.json")
  }

  getProyects(){
    return this.http.get<Proyecto[]>("/data/proyectos.json")
  }

}
