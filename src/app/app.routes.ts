import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'alta', 
    loadComponent: () => import('./features/form-alta/form-alta').then(m => m.FormAlta) 
  },
  { 
    path: 'imputacion', 
    loadComponent: () => import('./features/imputacion/imputacion').then(m => m.Imputacion) 
  },
  { 
    path: 'consulta', 
    loadComponent: () => import('./features/consulta/consulta').then(m => m.Consulta) 
  },
  { 
    path: 'otros', 
    loadComponent: () => import('./features/otros/otros').then(m => m.Otros) 
  },
  { path: '', redirectTo: 'alta', pathMatch: 'full' }
];