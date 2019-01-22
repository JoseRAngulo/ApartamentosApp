import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteInfo } from '../models/clientes';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent implements OnInit {
  cliente: Cliente;
  info: ClienteInfo;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getCliente();
    this.getClienteInfo();
  }
  getCliente(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clienteService.getCliente(id).subscribe(cliente => this.cliente = cliente);
  }
  getClienteInfo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.clienteService.getClienteInfo(id).subscribe(info => this.info = info);
  }
  updateCliente() {
    this.clienteService.updateCliente(this.info).subscribe();
  }
}
