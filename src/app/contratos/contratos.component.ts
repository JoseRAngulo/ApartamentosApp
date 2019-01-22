import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { Contrato } from '../models/contratos';
import { ApartamentoService } from '../services/apartamento.service';
import { Apartamento } from '../models/apartamentos';
import { ClienteService } from '../services/cliente.service';
import { Cliente, ClienteInfo } from '../models/clientes';

// TODO: Historial de contratos

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements OnInit {
  apartamentos: Apartamento[];
  apartamentosLibres: Apartamento[];
  cliente: Cliente;
  info: ClienteInfo;
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
  addContrato(nombre: String, profesion: String, nacionalidad: String, identidad: String, rtn: String, direccion: String,
              empresa: String, estadoCivil: Boolean, apartamento: number, monto: number) {
    this.info = new ClienteInfo(0, nombre, profesion, nacionalidad, identidad, rtn, direccion, empresa, estadoCivil);
    this.clienteService.addCliente(this.info).subscribe(c => {
      this.contrato = new Contrato(0, c.id, monto, new Date(), apartamento, true);
      this.contratoService.addContrato(this.contrato).subscribe();
    });
    // this.id = Math.max.apply(Math, this.clientes.map(function(o) { return o.id; }));

  }
}
