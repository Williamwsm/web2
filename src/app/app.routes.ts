import { Routes } from '@angular/router';
import { VagasComponent } from './portal-vg/vagas/vagas.component';
// import { CadastroComponent } from './login/login/login.component'; // Corrigido o caminho
// import { LoginComponent } from './components/login/login.component';
import { ContratacaoComponent } from './emp-vg/contratacao/contratacao.component';
import { EditPerfilComponent } from './login/edit-perfil/edit-perfil.component';
import LoginComponent from './components/login/login.component';
import { CadastroComponent } from './login/login/cadastro.component';
import { canActivateGuard } from './guards/can-activate.guard';
import { FormCurriculoComponent } from "./portal-vg/form-curriculo/form-curriculo.component";
import { EmpPerfilComponent } from "./login/perfis/emp-perfil/emp-perfil.component";
import { CandPerfilComponent } from "./login/perfis/cand-perfil/cand-perfil.component";



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
  { path: 'curriculo', component: FormCurriculoComponent },
  { path: 'emp-perfil', component: EmpPerfilComponent },
  { path: 'cand-perfil', component: CandPerfilComponent },


  { path: '', redirectTo: 'login', pathMatch: 'full' } // Rota padrão
];
