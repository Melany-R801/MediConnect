import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Historiales } from './historiales';

describe('Historiales', () => {
  let component: Historiales;
  let fixture: ComponentFixture<Historiales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Historiales],
    }).compileComponents();

    fixture = TestBed.createComponent(Historiales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
