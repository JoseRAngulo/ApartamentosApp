import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartamentosComponent } from './apartamentos/apartamentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApartamentoDetalleComponent } from './apartamento-detalle/apartamento-detalle.component';
import { PagosComponent } from './pagos/pagos.component';
import { ContratosComponent } from './contratos/contratos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';




const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'apartamentos', component: ApartamentosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pagos/:id', component: PagosComponent},
  { path: 'detalle-apartamento/:id', component: ApartamentoDetalleComponent},
  { path: 'detalle-cliente/:id', component: ClienteDetalleComponent},
  { path: 'contratos', component: ContratosComponent},
  { path: 'clientes', component: ClientesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
