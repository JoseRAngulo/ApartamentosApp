import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../models/contratos';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private url = 'http://127.0.0.1:8000/';

  constructor(
    private http: HttpClient
  ) { }

  getContratos(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.url}contratos`);
  }
  getContrato(c: number): Observable<Contrato> {
    return this.http.get<Contrato>(`${this.url}contratos/${c}/`);
  }
  addContrato(c: Contrato): Observable<Contrato> {
    return this.http.post<Contrato>(`${this.url}contratos/add`, c, httpOptions);
  }
  updateContrato(c: Contrato): Observable<Response> {
    return this.http.put<Response>(`${this.url}contratos/${c.id}/edit`, c, httpOptions);
  }
  deleteContrato(c: Contrato) {
    return this.http.delete(`${this.url}contratos/${c.id}/remove`, httpOptions);
  }
  deleteContratoById(id: number) {
    return this.http.delete(`${this.url}contratos/${id}/remove`, httpOptions);
  }
}
