import { Routes } from '@angular/router';
import { VagasComponent } from './portal-vg/vagas/vagas.component'; // Importe o componente
import { LoginComponent } from './login/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vagas', component: VagasComponent }, // Defina uma rota para a nova página
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Rota padrão
];


