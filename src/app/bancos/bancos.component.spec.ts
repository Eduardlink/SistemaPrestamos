import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancosComponent } from './bancos.component';

describe('BancosComponent', () => {
  let component: BancosComponent;
  let fixture: ComponentFixture<BancosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BancosComponent]
    });
    fixture = TestBed.createComponent(BancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
