import { Component, OnInit, Inject } from '@angular/core';
import { PagoService } from '../services/pago.service';
import { Factura, FacturaE, FacturaEAdd } from '../models/facturas';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';



@Component({
  selector: 'app-facturas-electricas-dialog',
  templateUrl: './facturas-electricas-dialog.component.html',
  styleUrls: ['./facturas-electricas-dialog.component.css']
})
export class FacturasElectricasDialogComponent implements OnInit {

  factura: Factura;
  facturaElectrica: FacturaEAdd;
  id: number;
  constructor(
    private pagoService: PagoService,
    private dialogRef:  MatDialogRef<FacturasElectricasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
  }

  ngOnInit() {
  }

  addFactura(fecha: Date, kwh: number, monto: number) {
    this.factura = new Factura(0, fecha, false, this.id);
    this.pagoService.addFactura(this.factura).subscribe(f => {
      this.facturaElectrica = new FacturaEAdd(f.id, kwh, monto);
      this.pagoService.addFacturaElectrica(this.facturaElectrica).subscribe();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

