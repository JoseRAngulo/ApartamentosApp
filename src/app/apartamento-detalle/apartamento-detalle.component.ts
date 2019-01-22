import { Component, OnInit, Input } from '@angular/core';
import { Apartamento } from '../models/apartamentos';
import { DetalleApartamento } from '../models/apartamento_detalles';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApartamentoService } from '../services/apartamento.service';
import { ContratoService } from '../services/contrato.service';
import { Contrato } from '../models/contratos';


// TODO: Remake this probably, add contadores in backend
@Component({
  selector: 'app-apartamento-detalle',
  templateUrl: './apartamento-detalle.component.html',
  styleUrls: ['./apartamento-detalle.component.css']
})
export class ApartamentoDetalleComponent implements OnInit {

  @Input() apartamento: DetalleApartamento;
  constructor(
    private route: ActivatedRoute,
    private apartamentoService: ApartamentoService,
    private contratoService: ContratoService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getApartamento();
  }

  getApartamento(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apartamentoService.getDetalleApartamento(id)
      .subscribe(apartamento => this.apartamento = apartamento[0]);
  }
  empty(): void {
    this.contratoService.getContrato(this.apartamento.id).subscribe(contrato => {
      contrato.estado = false;
      this.contratoService.updateContrato(contrato).subscribe();
    });
  }
  goBack(): void {
    this.location.back();
  }
}
