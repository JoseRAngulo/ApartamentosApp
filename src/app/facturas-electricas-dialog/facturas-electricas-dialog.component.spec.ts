import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasElectricasDialogComponent } from './facturas-electricas-dialog.component';

describe('FacturasElectricasDialogComponent', () => {
  let component: FacturasElectricasDialogComponent;
  let fixture: ComponentFixture<FacturasElectricasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasElectricasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasElectricasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
