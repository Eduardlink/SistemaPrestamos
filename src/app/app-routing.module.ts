import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PrincipalComponent } from './principal/principal.component';
import { TiposPrestamosComponent } from './tipos-prestamos/tipos-prestamos.component';
import { InversionesComponent } from './inversiones/inversiones.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'principal',
    component: PrincipalComponent
  },
  {
    path:"tipos_prestamos",
    component: TiposPrestamosComponent
  },
  {
    path:"inversiones",
    component: InversionesComponent
  },
  {
    path:"prestamos",
    component: InversionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
