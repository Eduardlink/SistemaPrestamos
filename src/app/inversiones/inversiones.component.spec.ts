import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InversionesComponent } from './inversiones.component';

describe('InversionesComponent', () => {
  let component: InversionesComponent;
  let fixture: ComponentFixture<InversionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InversionesComponent]
    });
    fixture = TestBed.createComponent(InversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
