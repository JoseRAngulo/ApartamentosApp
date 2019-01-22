import { Injectable } from '@angular/core';
import { Factura, FacturaA, FacturaE, FacturaEAdd } from '../models/facturas';
import { Pago } from '../models/pagos';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, concat, reduce, take} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private url = 'http://127.0.0.1:8000/';

  constructor(
    private http: HttpClient
  ) { }

  getFacturasXContrato(id: number): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.url}facturas_contrato/${id}`);
  }

  addPago(p: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${this.url}addpago/`, p, httpOptions);
  }
  getPagosContrato(id: number): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.url}pagos/contrato/${id}`);
  }
  addFactura(f: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.url}facturas/add`, f, httpOptions);
  }
  addFacturaElectrica(e: FacturaEAdd): Observable<FacturaEAdd> {
    return this.http.post<FacturaEAdd>(`${this.url}facturas_electricas/add`, e, httpOptions);
  }

  getSaldoDebido(id: number): Observable<number> {
    const montosE$ = this.getFacturasElectricas()
    .pipe(
      map(facturasE => facturasE.filter(f => f.factura.contrato === id)),
      map(facturasE => facturasE.map(f => f.monto))
    );
    const montosA$ = this.getFacturasAlquiler()
    .pipe(
      map(facturasA => facturasA.filter(f => f.factura.contrato === id)),
      map(facturasA => facturasA.map(f => f.monto))
    );

    return montosA$
    .pipe(
      concat(montosE$),
      map(montos => montos.reduce((a, b) => +a + +b, 0)),
      reduce((acc, n) => acc + n)
      );
  }

  getFacturasElectricas(): Observable<FacturaE[]> {
    return this.http.get<FacturaE[]>(`${this.url}facturas_electricas/`);
  }
  getFacturasAlquiler(): Observable<FacturaA[]> {
    return this.http.get<FacturaA[]>(`${this.url}facturas_alquiler/`);
  }
}
