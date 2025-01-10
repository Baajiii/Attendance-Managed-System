import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { LoginData } from '../model/loginData';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup

  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService) { }
  submitted=false;
  ngOnInit(): void {
    this .loginForm = this.formBulider.group({
      email :[''],
      password:['']
    })
  }



  onSubmit()
  {
    this.submitted=true;
   const Logindata = new LoginData(this.loginForm.value.email,this.loginForm.value.password);
   this.authenticationService.authenticate(Logindata);
  }

}
