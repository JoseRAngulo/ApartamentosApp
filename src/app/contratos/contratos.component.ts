import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { Contrato } from '../models/contratos';
import { ApartamentoService } from '../services/apartamento.service';
import { Apartamento } from '../models/apartamentos';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/clientes';



@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  apartamentos: Apartamento[];
  apartamentosLibres: Apartamento[];
  cliente: Cliente;
  clientes: Cliente[];
  contrato: Contrato;
  id: number;

  constructor(
    private contratoService: ContratoService,
    private apartamentoService: ApartamentoService,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.getApartamentos();
  }

  getApartamentos(): void {
    this.apartamentoService.getApartamentos()
      .subscribe(apartamentos => {
        this.apartamentos = apartamentos;
        this.apartamentosLibres = [];
        this.apartamentos.forEach(a => {
          if (!a.ocupado) {
            this.apartamentosLibres.push(a);
          }
        });
      });
  }
  addContrato(nombre: String, apartamento: number, monto: number) {
    this.cliente = new Cliente(0, nombre, []);
    this.clienteService.addCliente(this.cliente).subscribe(c => {
      this.contrato = new Contrato(0, c.id, monto, new Date(), apartamento, true);
      this.contratoService.addContrato(this.contrato).subscribe();
    });
    // this.id = Math.max.apply(Math, this.clientes.map(function(o) { return o.id; }));

  }
}
