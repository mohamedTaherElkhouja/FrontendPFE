import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authUserguardGuard } from './auth-userguard.guard';

describe('authUserguardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authUserguardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
