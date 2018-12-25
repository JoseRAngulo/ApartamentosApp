import { Component, OnInit, Inject } from '@angular/core';
import { Factura, FacturaA, FacturaE } from '../models/facturas';
import { PagoService } from '../services/pago.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pago } from '../models/pagos';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  id: number;
  monto: string;
  fecha: Date;
}


@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  facturas: Factura[];
  facturasElectricas: FacturaE[];
  facturasAlquiler: FacturaA[];
  displayedColumns: string[] = ['fecha', 'monto', 'accion'];
  pago: Pago;

  constructor(
    private pagoService: PagoService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getFacturasElectricas();
    this.getFacturasAlquiler();
  }
  getFacturas(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pagoService.getFacturasXContrato(id)
        .subscribe(facturas => this.facturas = facturas);
  }
  getFacturasElectricas(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pagoService.getFacturasElectricas().subscribe(facturas => {
      this.facturasElectricas = [];
      facturas.forEach(f => {
        if (f.factura.contrato === id && !f.factura.pagado) {
          this.facturasElectricas.push(f);
        }
      });
    });
  }
  getFacturasAlquiler(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pagoService.getFacturasAlquiler().subscribe(facturas => {
      this.facturasAlquiler = [];
      facturas.forEach(f => {
        if (f.factura.contrato === id && !f.factura.pagado) {
          this.facturasAlquiler.push(f);
        }
      });
    });
  }


  openDialog(i: number, m: number, f: Date): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '100%',
      data: {id: i, monto: m, fecha: f}
    });
  }
}

// Dialog Mat
@Component({
  selector: 'app-pago-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  pago: Pago;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private pagoService: PagoService ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addPago(monto: number, idFactura: number) {
    this.pago = new Pago(monto, idFactura, new Date);
    this.pagoService.addPago(this.pago).subscribe();
  }

}
