import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authEmpresaGuard } from './auth-empresa.guard';

describe('authEmpresaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authEmpresaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
