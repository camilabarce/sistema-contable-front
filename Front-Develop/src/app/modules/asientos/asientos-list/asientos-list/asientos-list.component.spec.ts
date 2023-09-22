import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsientosListComponent } from './asientos-list.component';

describe('AsientosListComponent', () => {
  let component: AsientosListComponent;
  let fixture: ComponentFixture<AsientosListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsientosListComponent]
    });
    fixture = TestBed.createComponent(AsientosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
