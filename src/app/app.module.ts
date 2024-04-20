import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PrincipalComponent } from './principal/principal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderprincipalComponent } from './componentes/headerprincipal/headerprincipal.component';
import { TiposPrestamosComponent } from './tipos-prestamos/tipos-prestamos.component';
import { HeaderegistroComponent } from './componentes/headeregistro/headeregistro.component';
import { InversionesComponent } from './inversiones/inversiones.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { HeadeperfilComponent } from './componentes/headeperfil/headeperfil.component';
import { FrancesComponent } from './componentes/frances/frances.component';
import { AlemanComponent } from './componentes/aleman/aleman.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    PerfilComponent,
    ComponentesComponent,
    HeaderComponent,
    FooterComponent,
    HeaderprincipalComponent,
    TiposPrestamosComponent,
    HeaderegistroComponent,
    InversionesComponent,
    PrestamosComponent,
    HeadeperfilComponent,
    FrancesComponent,
    AlemanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
