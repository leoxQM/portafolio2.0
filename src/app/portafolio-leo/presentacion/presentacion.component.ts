import { Component, OnInit } from '@angular/core';
import { SvgGithubComponent } from "../../@shared/svg-github/svg-github.component";
import { SvgGitlabComponent } from "../../@shared/svg-gitlab/svg-gitlab.component";
import { SvgLinkedinComponent } from "../../@shared/svg-linkedin/svg-linkedin.component";
import { InicioComponent } from "../../@shared/inicio/inicio.component";

@Component({
  selector: 'app-presentacion',
  imports: [InicioComponent],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent implements OnInit{
  textos = ['Desarrollador Web', 'Programador'];
  textoMostrado = '';
  textoIndex = 0;
  charIndex = 0;
  escribiendo = true;
  speed = 100;
  pausa = 1500;

  ngOnInit(): void {
    this.escribir();
  }

  escribir() {
    if (this.escribiendo) {
      if (this.charIndex < this.textos[this.textoIndex].length) {
        this.textoMostrado += this.textos[this.textoIndex].charAt(this.charIndex);
        this.charIndex++;
        setTimeout(() => this.escribir(), this.speed);
      } else {
        this.escribiendo = false;
        setTimeout(() => this.escribir(), this.pausa);
      }
    } else {
      if (this.charIndex > 0) {
        this.textoMostrado = this.textos[this.textoIndex].substring(0, this.charIndex - 1);
        this.charIndex--;
        setTimeout(() => this.escribir(), this.speed / 2);
      } else {
        this.escribiendo = true;
        this.textoIndex = (this.textoIndex + 1) % this.textos.length;
        setTimeout(() => this.escribir(), this.speed);
      }
    }
  }
}
