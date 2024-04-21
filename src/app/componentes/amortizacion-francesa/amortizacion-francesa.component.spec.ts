import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizacionFrancesaComponent } from './amortizacion-francesa.component';

describe('AmortizacionFrancesaComponent', () => {
  let component: AmortizacionFrancesaComponent;
  let fixture: ComponentFixture<AmortizacionFrancesaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizacionFrancesaComponent]
    });
    fixture = TestBed.createComponent(AmortizacionFrancesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
