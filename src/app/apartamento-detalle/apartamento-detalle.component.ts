import { Component, OnInit, Input } from '@angular/core';
import { Apartamento } from '../models/apartamentos';
import { DetalleApartamento } from '../models/apartamento_detalles';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApartamentoService } from '../services/apartamento.service';



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
    private location: Location
  ) { }

  ngOnInit() {
    this.getApartamento();
  }

  getApartamento(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.apartamentoService.getDetalleApartamento(id)
      .subscribe(apartamento => this.apartamento = apartamento);
  }
  goBack(): void {
    this.location.back();
  }
}
