import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mainadminGuard } from './mainadmin.guard';

describe('mainadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mainadminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
