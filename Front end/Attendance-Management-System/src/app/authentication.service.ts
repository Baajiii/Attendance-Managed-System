import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated = false;
  private userRole: string | null = null;
  constructor(private router: Router) { }
  
  authenticate(isLoginError: boolean):boolean{
    if(isLoginError == false){
      this.isAuthenticated=true;
      return true;
    }
    else{
    this.isAuthenticated = false;
    return false;
  }
}
login(role: string) {
  this.userRole = role;
  sessionStorage.setItem('userRole', role); // Store role in local storage
  this.redirectUser(role);
}

logout() {
  this.userRole = null;
  sessionStorage.clear(); // Clears all session storage items
  this.router.navigate(['/login']); // Redirect to login page
}

adminlogout(){
  this.userRole = null;
  sessionStorage.clear(); // Clears all session storage items
  this.router.navigate(['/adminlogin']); // Redirect to login page  
}

getRole(): string | null {
  return sessionStorage.getItem('userRole'); // Get role from local storage
}

isLoggedIn(): boolean {
  return this.getRole() !== null;
}

redirectUser(role: string) {
  if (role === 'admin') {
    this.router.navigate(['/admindashboard']);
  } else if (role === 'staff') {
    this.router.navigate(['/markattendance']);
  } else if (role === 'coordinator') {
    this.router.navigate(['/home']);

  }
}

}
