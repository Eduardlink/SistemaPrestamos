import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizacionAlemanaComponent } from './amortizacion-alemana.component';

describe('AmortizacionAlemanaComponent', () => {
  let component: AmortizacionAlemanaComponent;
  let fixture: ComponentFixture<AmortizacionAlemanaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizacionAlemanaComponent]
    });
    fixture = TestBed.createComponent(AmortizacionAlemanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
