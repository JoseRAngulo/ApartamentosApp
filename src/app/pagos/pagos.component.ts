import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Factura, FacturaA, FacturaE } from '../models/facturas';
import { PagoService } from '../services/pago.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pago } from '../models/pagos';

import {
  MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTable,
  MatDialogConfig, MatTableDataSource, MatPaginator,
  MatSort
} from '@angular/material';

import { FacturasElectricasDialogComponent } from '../facturas-electricas-dialog/facturas-electricas-dialog.component';
import { ContratoService } from '../services/contrato.service';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/clientes';


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
  pagos: Pago[];
  facturasElectricas: FacturaE[];
  facturasAlquiler: FacturaA[];
  pago: Pago;
  cliente: Cliente = new Cliente(0, '', []);
  dataSource: MatTableDataSource<Pago>;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['fecha', 'monto', 'accion'];
  displayedColumnsPago: string[] = ['fecha', 'monto'];

  constructor(
    private pagoService: PagoService,
    private route: ActivatedRoute,
    private location: Location,
    public dialog: MatDialog,
    public contratoService: ContratoService,
    public clienteService: ClienteService
    ) { }

  ngOnInit() {
    this.getCliente();
    this.getFacturasElectricas();
    this.getFacturasAlquiler();
    this.getPagosContrato();
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
  getPagosContrato(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pagoService.getPagosContrato(id)
      .subscribe(pagos => {
        this.pagos = pagos;
        this.dataSource = new MatTableDataSource<Pago>(pagos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  getCliente(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.contratoService.getContrato(id).subscribe(contrato => {
      this.clienteService.getCliente(contrato.cliente).subscribe(cliente => this.cliente = cliente);
    });
  }


  openDialog(i: number, m: number, f: Date): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {id: i, monto: m, fecha: f}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getFacturasAlquiler();
      this.getFacturasElectricas();
      this.getPagosContrato();
    });
  }

  pagoRapido(i: number, m: number, f: Date): void {
    this.pago = new Pago(m, i, f);
    this.pagoService.addPago(this.pago).subscribe(() => {
      this.getPagosContrato();
      this.getFacturasAlquiler();
      this.getFacturasElectricas();
    });
  }

  openDialogElec(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id
    };
    const dialogRef = this.dialog.open(FacturasElectricasDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => {
      this.getFacturasElectricas();
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
