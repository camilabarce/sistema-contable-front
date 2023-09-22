import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosDetailComponent } from './asientos-detail.component';

describe('AsientosDetailComponent', () => {
  let component: AsientosDetailComponent;
  let fixture: ComponentFixture<AsientosDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsientosDetailComponent]
    });
    fixture = TestBed.createComponent(AsientosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
