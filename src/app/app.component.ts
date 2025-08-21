import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import * as AOS from 'aos';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portafolio-leo-app';
  constructor(private primeng: PrimeNG) {}

    ngOnInit() {
      AOS.init({
        duration: 1000,
        once: false,
        offset: 0
      });
      this.primeng.ripple.set(true);
    }
}
