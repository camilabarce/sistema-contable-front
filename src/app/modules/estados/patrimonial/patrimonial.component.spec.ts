import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonialComponent } from './patrimonial.component';

describe('PatrimonialComponent', () => {
  let component: PatrimonialComponent;
  let fixture: ComponentFixture<PatrimonialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatrimonialComponent]
    });
    fixture = TestBed.createComponent(PatrimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
