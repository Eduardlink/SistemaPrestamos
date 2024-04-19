import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderprincipalComponent } from './headerprincipal.component';

describe('HeaderprincipalComponent', () => {
  let component: HeaderprincipalComponent;
  let fixture: ComponentFixture<HeaderprincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderprincipalComponent]
    });
    fixture = TestBed.createComponent(HeaderprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
