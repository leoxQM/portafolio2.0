import { AfterViewInit, Component, ElementRef, HostListener, ViewChild , OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { PresentacionComponent } from "./presentacion/presentacion.component";
import { SobremiComponent } from "./sobremi/sobremi.component";
import { ProyectosComponent } from "./proyectos/proyectos.component";
import { SkillsComponent } from "./skills/skills.component";
import { ContactameComponent } from "./contactame/contactame.component";

@Component({
  selector: 'app-portafolio-leo',
  imports: [
    NavbarComponent,
    PresentacionComponent,
    SobremiComponent,
    ProyectosComponent,
    SkillsComponent,
    ContactameComponent
],
  templateUrl: './portafolio-leo.component.html',
  styleUrl: './portafolio-leo.component.css'
})
export class PortafolioLeoComponent implements AfterViewInit {
  @ViewChild('canvasEstrellas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private numStars = 500;
  private stars: { x: number; y: number; z: number }[] = [];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.initStars();
    this.drawStars();
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
    this.initStars();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
  }

  private initStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * this.width,
        y: (Math.random() - 0.5) * this.height,
        z: Math.random() * this.width
      });
    }
  }

  private drawStars = () => {
    const ctx = this.ctx;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);

    for (let star of this.stars) {
      star.z -= 2;
      if (star.z <= 0) {
        star.z = this.width;
        star.x = (Math.random() - 0.5) * this.width;
        star.y = (Math.random() - 0.5) * this.height;
      }

      const k = 150 / star.z;
      const sx = star.x * k + this.width / 2;
      const sy = star.y * k + this.height / 2;

      if (sx >= 0 && sx <= this.width && sy >= 0 && sy <= this.height) {
        const size = (1 - star.z / this.width) * 1.5;
        const shade = 255 - Math.floor(star.z / this.width * 255);
        ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(this.drawStars);
  };
}
