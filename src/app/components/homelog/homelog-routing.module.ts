import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomelogComponent } from './homelog.component';
import { LoginGuard } from '../../services/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomelogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomelogRoutingModule { }
