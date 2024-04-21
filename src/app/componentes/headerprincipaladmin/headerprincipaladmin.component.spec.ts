import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderprincipaladminComponent } from './headerprincipaladmin.component';

describe('HeaderprincipaladminComponent', () => {
  let component: HeaderprincipaladminComponent;
  let fixture: ComponentFixture<HeaderprincipaladminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderprincipaladminComponent]
    });
    fixture = TestBed.createComponent(HeaderprincipaladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
