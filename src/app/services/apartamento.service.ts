import { Injectable } from '@angular/core';
import { Apartamento } from '../models/apartamentos';
import { DetalleApartamento } from '../models/apartamento_detalles';

import { MessageService } from '../services/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class ApartamentoService {
private url = 'http://127.0.0.1:8000/';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getApartamentos(): Observable<Apartamento[]> {
    return this.http.get<Apartamento[]>(`${this.url}apartamentos`);
  }
  getDetalleApartamento(id: number): Observable<DetalleApartamento[]> {
    return this.http.get<DetalleApartamento[]>(`${this.url}contratoapartamento/${id}`);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}
