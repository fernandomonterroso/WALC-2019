import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './services/login.guard';

const routes: Routes = [
  {path:'', loadChildren: './components/home/home.module#HomeModule'},
  {path:'home', loadChildren: './components/home/home.module#HomeModule'},
  {path:'principal', loadChildren: './components/homelog/homelog.module#HomelogModule'},
  {path:'track/:id', loadChildren: './components/track1/track1.module#Track1Module'},
  {path:'login', loadChildren: './components/login/login.module#LoginModule'},
  {path:'register', loadChildren: './components/registro/registro.module#RegistroModule'},
  {path:'perfil', loadChildren: './components/perfil/perfil.module#PerfilModule'},
  {path:'usuarios', loadChildren: './components/usuarios/usuarios.module#UsuariosModule'},
  {path:'conferencias', loadChildren: './components/conferencias/conferencias.module#ConferenciasModule'},
  {path:'**', loadChildren: './components/home/home.module#HomeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
