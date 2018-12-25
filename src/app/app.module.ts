import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from './app-material/app-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartamentosComponent } from './apartamentos/apartamentos.component';
import { ApartamentoDetalleComponent } from './apartamento-detalle/apartamento-detalle.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagosComponent, DialogComponent } from './pagos/pagos.component';
import { ContratosComponent } from './contratos/contratos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ApartamentosComponent,
    ApartamentoDetalleComponent,
    MessagesComponent,
    DashboardComponent,
    PagosComponent,
    ContratosComponent,
    ClientesComponent,
    ClienteDetalleComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
