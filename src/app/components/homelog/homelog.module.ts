import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomelogRoutingModule } from './homelog-routing.module';
import { HomelogComponent } from './homelog.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavModule } from '../nav/nav.module';

@NgModule({
  declarations: [HomelogComponent],
  imports: [
    CommonModule,
    HomelogRoutingModule,
    HttpClientModule,
    FormsModule,
    NavModule,
    NgbModule
  ],
  exports: [HomelogComponent]
})
export class HomelogModule { }
