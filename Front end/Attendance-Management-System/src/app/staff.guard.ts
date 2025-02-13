import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const staffGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getRole() === 'staff') {
    return true;
  } else {
    router.navigate(['/notauthorized']);
    return false;
  }
};
