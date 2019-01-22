import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/clientes';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApartamentoService } from '../services/apartamento.service';
import { Apartamento } from '../models/apartamentos';
import { PagoService } from '../services/pago.service';
import { FacturaE, FacturaA } from '../models/facturas';
import { take, first } from 'rxjs/operators';

// TODO: search on mat-table
export interface Debe {
  contrato: number;
  monto: number;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  debidos: {[id: number]: Debe} = {};
  clientesActivos: Cliente[];
  clientesInactivos: Cliente[];
  apartamentos: Apartamento[];
  displayedColumns: string[] = ['nombre', 'apartamento', 'saldo', 'debe', 'factura'];

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private location: Location,
    private apartamentoService: ApartamentoService,
    private pagoService: PagoService
  ) {
  }

  ngOnInit() {
    this.getApartamentos();
    this.getClientes();
  }

  getDebe() {
   this.clientesActivos.forEach(c => {
     this.pagoService.getSaldoDebido(c.contratos[0].id).subscribe(n => {
      this.debidos[c.contratos[0].id] = {contrato: c.contratos[0].id, monto: n};
     });
   });
  }
  getApartamentoNombre(id: number): string {
    let nombre: string;
    this.apartamentos.forEach(a => {
      if (a.id === id) {
        nombre = a.nombre;
      }
    });
    return nombre;
  }
  getApartamentos(): void {
    this.apartamentoService.getApartamentos().subscribe(apartamentos => this.apartamentos = apartamentos);
  }
  getClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientesActivos = [];
      clientes.forEach(c => {
        c.contratos.forEach(contrato => {
          if (contrato.estado) {
            this.clientesActivos.push(c);
          }
        });
        this.getDebe();
      });
      this.clientesInactivos = clientes.filter(o => this.clientesActivos.indexOf(o) < 0);
    });
  }

}

// TODO: clientes inactivos, add totals to tables in general, Total client history, buttons in actives to view history (NEW COMPONENT)
