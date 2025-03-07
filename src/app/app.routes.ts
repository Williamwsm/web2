import { Routes } from '@angular/router';
import { VagasComponent } from './portal-vg/vagas/vagas.component';
// import { CadastroComponent } from './login/login/login.component'; // Corrigido o caminho
// import { LoginComponent } from './components/login/login.component';
import { ContratacaoComponent } from './emp-vg/contratacao/contratacao.component';
import { EditPerfilComponent } from './login/edit-perfil/edit-perfil.component';
import LoginComponent from './components/login/login.component';
import { CadastroComponent } from './login/login/cadastro.component';
import { canActivateGuard } from './guards/can-activate.guard';

export const routes: Routes = [
  {  path: 'cadastrar',
     component: CadastroComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'vagas',
    component: VagasComponent,
    canActivate: [canActivateGuard],
  },
  { path: 'emp', component: ContratacaoComponent },
  { path: 'edit-perfil', component: EditPerfilComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' } // Rota padrão
];
