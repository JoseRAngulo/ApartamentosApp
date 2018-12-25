import { Component, OnInit } from '@angular/core';
import { Apartamento } from '../models/apartamentos';
import { ApartamentoService } from '../services/apartamento.service';




@Component({
  selector: 'app-apartamentos',
  templateUrl: './apartamentos.component.html',
  styleUrls: ['./apartamentos.component.css']
})
export class ApartamentosComponent implements OnInit {
  apartamentos: Apartamento[];
  selectedApartamento: Apartamento;

  constructor(
    private apartamentoService: ApartamentoService
  ) { }

  ngOnInit() {
    this.getApartamentos();
  }

  getApartamentos(): void {
    this.apartamentoService.getApartamentos()
      .subscribe(apartamentos => this.apartamentos = apartamentos);
  }
}
