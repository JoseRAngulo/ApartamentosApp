import { Injectable } from '@angular/core';
import { Factura } from '../models/facturas';
import { Pago } from '../models/pagos';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
