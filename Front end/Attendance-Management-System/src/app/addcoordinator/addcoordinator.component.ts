import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { Coordinatordata } from '../model/coordinatorData';

@Component({
  selector: 'app-addcoordinator',
  templateUrl: './addcoordinator.component.html',
  styleUrls: ['./addcoordinator.component.css']
})
export class AddcoordinatorComponent {

 list: NodeListOf<HTMLElement>;
  public addCoordinatorForm !: FormGroup
  submitted=false;
  loading=false;
  isLoginError: boolean = false;
  role: boolean;
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.addCoordinatorForm = this.formBulider.group({
      name :[''],
      password : [''],
      gender:['']
    })

     }
 
     private loadExternalCSS(): void {
       const link = document.createElement('link');
       link.rel = 'stylesheet';
       link.href = 'assets/css/addclass.css'; // Path to your external CSS file
       document.head.appendChild(link);
     }
 
  ngAfterViewInit() {
    this.list.forEach((item) => {
      item.addEventListener('mouseover', this.activeLink.bind(this));
    });
 
    const toggle = document.querySelector('.toggle');
    const navigation = document.querySelector('.navigation');
    const main = document.querySelector('.main');
 
    if (toggle && navigation && main) {
      toggle.addEventListener('click', () => {
        navigation.classList.toggle('active');
        main.classList.toggle('active');
      });
    }
  }
 
  activeLink(event: MouseEvent) {
    this.list.forEach((item) => {
      item.classList.remove('hovered');
    });
 
    const target = event.currentTarget as HTMLElement;
    target.classList.add('hovered');
  }

 addCoordinator(){
  this.submitted = true;
  console.log(this.addCoordinatorForm);
  if(this.addCoordinatorForm.invalid){
    return;
  }
  if(this.addCoordinatorForm.value.gender === '1'){
    this.role = true;
  }
  if(this.addCoordinatorForm.value.gender === '2'){
    this.role = false;
  }
  this.loading = true;
  const result: Coordinatordata = Object.assign({}, this.addCoordinatorForm.value);
  this.RestapiService.addCoordinator(result.name,result.password,this.role).subscribe(
    (data: any) => {
      if(data.status == true){
        Swal.fire({
          icon: 'success',
          text: data.message,
          showConfirmButton: true,
          timer: 3500
        })
      }
      else{
        Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.message,
                })
                this.loading = false;
      }
    },
    (err : HttpErrorResponse)=>{
      this.isLoginError = true;
    }
  )
 }

 logout() {
  this.authenticationService.adminlogout();
}

}
