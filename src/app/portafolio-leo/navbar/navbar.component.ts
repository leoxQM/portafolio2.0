import { Component, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';



@Component({
  selector: 'app-navbar',
  imports: [InputTextModule, ButtonModule, DrawerModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  logoName = signal<String>('<LeoDeev/>');
  visible2: boolean = false;

  goTo(sectionId: string) {
    this.visible2 = false;
    setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 300);
  }
}
