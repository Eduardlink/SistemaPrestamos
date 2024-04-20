import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPrestamosComponent } from './tipos-prestamos.component';

describe('TiposPrestamosComponent', () => {
  let component: TiposPrestamosComponent;
  let fixture: ComponentFixture<TiposPrestamosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposPrestamosComponent]
    });
    fixture = TestBed.createComponent(TiposPrestamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
