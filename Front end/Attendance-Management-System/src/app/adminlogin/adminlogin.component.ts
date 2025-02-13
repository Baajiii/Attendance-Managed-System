import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { LoginDataAdmin } from '../model/loginDataAdmin';
import { LoginDataRoom } from '../model/loginDataRoom';
import { Router, ActivatedRoute } from '@angular/router';
import { RestapiService } from '../restapi.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

    public loginFormAdmin !: FormGroup
    submitted=false;
    loading=false;
    isLoginError: boolean = false;
    message:string;
    success: boolean = false;

    constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) { }

    ngOnInit(): void {
      this.loginFormAdmin = this.formBulider.group({
        username :[''],
        password:['']
      })
    }



    onSubmitForAdmin(){
      this.submitted = true;
      if(this.loginFormAdmin.invalid){
       return;
      }
      this.loading = true;
   const result:LoginDataAdmin= Object.assign({}, this.loginFormAdmin.value);
     if(result.username === 'admin'){
       if(result.password === 'admin@jmc'){
         this.success = true;
       }
       else{
        this.success = false;
        this.message = 'Incorrect password';
       }
     }
     else{
      this.success = false;
       this.message = 'Incorrect username';
     }

     if(this.success == true){
       Swal.fire({
                icon: 'success',
                title: 'Login successful',
                showConfirmButton: false,
                timer: 2000
              })
              this.authenticationService.login('admin');
              this.router.navigate(['/admindashboard']);   
     }
     else{
      Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: this.message,
              })
              this.router.navigate(['/adminlogin']);   
               this.loading = false;
     }

    }
}
