import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartamentosComponent } from './apartamentos/apartamentos.component';
import { ApartamentoDetalleComponent } from './apartamento-detalle/apartamento-detalle.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagosComponent } from './pagos/pagos.component';

@NgModule({
  declarations: [
    AppComponent,
    ApartamentosComponent,
    ApartamentoDetalleComponent,
    MessagesComponent,
    DashboardComponent,
    PagosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
