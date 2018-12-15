import { Component, OnInit } from '@angular/core';
import { Apartamento } from '../models/apartamentos';
import { ApartamentoService } from '../services/apartamento.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  apartamentos: Apartamento[] = [];

  constructor(private apartamentoService: ApartamentoService) { }

  ngOnInit() {
    this.getApartamentos();
  }

  getApartamentos(): void {
    this.apartamentoService.getApartamentos()
      .subscribe(apartamentos => this.apartamentos = apartamentos.slice(1, 5));
  }
}
