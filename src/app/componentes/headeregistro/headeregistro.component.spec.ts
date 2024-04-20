import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderegistroComponent } from './headeregistro.component';

describe('HeaderegistroComponent', () => {
  let component: HeaderegistroComponent;
  let fixture: ComponentFixture<HeaderegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderegistroComponent]
    });
    fixture = TestBed.createComponent(HeaderegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
