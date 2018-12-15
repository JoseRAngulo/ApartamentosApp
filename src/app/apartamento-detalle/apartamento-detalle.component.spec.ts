import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartamentoDetalleComponent } from './apartamento-detalle.component';

describe('ApartamentoDetalleComponent', () => {
  let component: ApartamentoDetalleComponent;
  let fixture: ComponentFixture<ApartamentoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartamentoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartamentoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
