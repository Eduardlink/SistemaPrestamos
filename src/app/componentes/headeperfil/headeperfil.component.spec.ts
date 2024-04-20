import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadeperfilComponent } from './headeperfil.component';

describe('HeadeperfilComponent', () => {
  let component: HeadeperfilComponent;
  let fixture: ComponentFixture<HeadeperfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadeperfilComponent]
    });
    fixture = TestBed.createComponent(HeadeperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
