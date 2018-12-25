import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/clientes';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  clientesActivos: Cliente[];
  clientesInactivos: Cliente[];
  displayedColumns: string[] = ['nombre', 'apartamento', 'saldo', 'factura'];

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getClientes();
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
      });
      this.clientesInactivos = clientes.filter(o => this.clientesActivos.indexOf(o) < 0);
    });
  }

}
