import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if the user is authenticated
    if (!this.authenticationService.isAuthenticated) {
      this.router.navigate(['']);
      return false;
    }

    // Get the user role from authentication service
    const userRole = this.authenticationService.getRole();

    // Allow only "staff" or "admin"
    if (['admin'].includes(userRole)) {
      this.router.navigate(['/admindashboard']);
      return true;
    }

    // If role is not allowed, redirect to "not authorized" page
    this.router.navigate(['/notauthorized']);
    return false;
  }
}
