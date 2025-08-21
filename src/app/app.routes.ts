import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portafolio-leo/portafolio-leo.component').then((m)=>m.PortafolioLeoComponent)
  }
];
