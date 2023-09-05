import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasDetailComponent } from './cuentas-detail.component';

describe('CuentasDetailComponent', () => {
  let component: CuentasDetailComponent;
  let fixture: ComponentFixture<CuentasDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentasDetailComponent]
    });
    fixture = TestBed.createComponent(CuentasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
