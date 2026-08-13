import { TestBed } from '@angular/core/testing';

import { Historiales } from './historiales';

describe('Historiales', () => {
  let service: Historiales;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Historiales);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
