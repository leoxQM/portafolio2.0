import { Component, inject, OnInit, signal } from '@angular/core';
import { HabilidadesService } from '../../@core/servicios/servicios.service';
import { Habilidades } from '../../@core/interfaces/habilidades.interface';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent implements OnInit {
  private habilidadesService = inject(HabilidadesService)
  listHabilidades = signal<Habilidades[]>([])
  listImg = signal
  ngOnInit(): void {
    this.getHabilidades()
  }

  getHabilidades(){
    this.habilidadesService.getInfo().subscribe({
      next: (rpta: Habilidades[])=>{
          this.listHabilidades.set(rpta)
          console.log("data", rpta.map((data)=>data.imagenes))
      }
    })
  }
}
