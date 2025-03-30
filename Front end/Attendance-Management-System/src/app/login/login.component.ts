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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginFormAdmin !: FormGroup
  public loginFormRoom !: FormGroup
  submitted=false;
  loading=false;
  isLoginError: boolean = false;
  selectedValue: boolean;
  isActive: boolean = false;


  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) { }

  ngOnInit(): void {
    this.loginFormAdmin = this.formBulider.group({
      username :[''],
      password:[''],
      role :null
    })
    this.loginFormRoom = this.formBulider.group({
      roomnumber :[''],
      password :['']
    })
  }

  roles = [
    { role: "Male", value: true },
    { role: "Female", value: false }
  ]

  filterSelected(value){
    this.selectedValue = value;
  }

  toggleForm(isRegister: boolean): void {
    this.isActive = isRegister;
  }


  onSubmitForAdmin()
  {
    this.submitted = true;
   if(this.loginFormAdmin.invalid){
    return;
   }
   this.loading = true;
   const result:LoginDataAdmin= Object.assign({}, this.loginFormAdmin.value);
   this.RestapiService.coOrdinatorEntry(result.password, result.username, this.selectedValue).subscribe(
    (data: any) => {
      sessionStorage.setItem('adminname',data.name);
      sessionStorage.setItem('adminrole',data.role);
      sessionStorage
      if(data.status==true){
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 2000
        })
        this.authenticationService.login('coordinator');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
        this.router.navigate(['/login']);   
         this.loading = false;
      }
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    }
   );
   this.authenticationService.authenticate(this.isLoginError);
  }

  onSubmitForRoom()
  {
   this.submitted = true;
   if(this.loginFormRoom.invalid){
    return;
   }

   this.loading = true;
   const result:LoginDataRoom= Object.assign({}, this.loginFormRoom.value);
   this.RestapiService.roomEntry(result.roomnumber, result.password).subscribe(
    (data : any) => {
      sessionStorage.setItem('login',data.status);
      sessionStorage.setItem('roomnumber',data.name);
      sessionStorage
      if(data.status==true){
        Swal.fire({
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 2000
        })
        this.authenticationService.login('staff');
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
        })
        this.router.navigate(['/login']);   
         this.loading = false;
      }
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    }
   );

   this.authenticationService.authenticate(this.isLoginError);
  }

}
