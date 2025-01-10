import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from './model/loginData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly adminUser = new LoginData('admin', '123456');
  isAuthenticated = false;
  constructor(private router: Router) { }
  authenticate(login: LoginData): boolean {
    if (this.checkCredentials(login)) {
      sessionStorage.setItem('username', login.username)
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    alert("Incorrect Login or Password");
    this.router.navigate(['']);
    this.isAuthenticated = false;
    return false;

  }

  checkCredentials(login: LoginData): boolean {
    return this.checkEmail(login.username) && this.checkPassword(login.password);
  }
  
  checkEmail(email: string): boolean {
    return email === this.adminUser.username;
  }
  
  checkPassword(password: string): boolean {
    return password === this.adminUser.password;
  }
  
  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }



}
