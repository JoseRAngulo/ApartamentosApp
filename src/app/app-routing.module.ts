import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartamentosComponent } from './apartamentos/apartamentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApartamentoDetalleComponent } from './apartamento-detalle/apartamento-detalle.component';
import { PagosComponent } from './pagos/pagos.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'apartamentos', component: ApartamentosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detalle-apartamento/:id', component: ApartamentoDetalleComponent},
  { path: 'pagos/:id', component: PagosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
