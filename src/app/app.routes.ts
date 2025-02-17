import { Routes } from '@angular/router';
import { VagasComponent } from './portal-vg/vagas/vagas.component'; // Importe o componente
import { LoginComponent } from './login/login/login.component';
import { ContratacaoComponent } from './emp-vg/contratacao/contratacao.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'vagas', component: VagasComponent },
  { path: 'emp', component: ContratacaoComponent}, // Defina uma rota para a nova página
  { path: '', redirectTo: 'login', pathMatch: 'full' } // Rota padrão
];


