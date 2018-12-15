import { Component, OnInit } from '@angular/core';
import { Factura } from '../models/facturas';
import { PagoService } from '../services/pago.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pago } from '../models/pagos';



@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  facturas: Factura[];
  pago: Pago;

  constructor(
    private pagoService: PagoService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.getFacturas();
  }
  getFacturas(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pagoService.getFacturasXContrato(id)
        .subscribe(facturas => this.facturas = facturas);
  }
  addPago(monto: number, idFactura: number) {
    this.pago = new Pago(monto, idFactura);
    this.pagoService.addPago(this.pago).subscribe();
  }
}
