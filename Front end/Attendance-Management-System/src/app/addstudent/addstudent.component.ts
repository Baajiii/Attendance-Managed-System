import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { StudentData } from '../model/StudentData'; 

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent {

list: NodeListOf<HTMLElement>;
  public addStudentForm !: FormGroup
  submitted=false;
  loading=false;
  isLoginError: boolean = false;
  public role: boolean;
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.addStudentForm = this.formBulider.group({
            name :['',Validators.required],
            rollno:['',Validators.required],
            year :['',Validators.required],
            dept:['',Validators.required],
            startYear : ['',Validators.required],
            endYear : ['',Validators.required],
            gender : ['',Validators.required],
            degree : ['',Validators.required]
          });
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
 
 
 addStudent(){
  this.submitted = true;
  if(this.addStudentForm.invalid){
    return;
  }
  if(this.addStudentForm.value.gender === '1'){
    this.role = true;
  }
  if(this.addStudentForm.value.gender === '2'){
    this.role = false;
  }
  this.loading = true;
  const result: StudentData = Object.assign({}, this.addStudentForm.value);
  // console.log(result);
  
  this.RestapiService.addStudent(result.name, result.rollno, result.year, result.dept, result.startYear,result.endYear,result.degree,this.role).subscribe(
    (data: any) => {
      if(data.status == true){
        Swal.fire({
          icon: 'success',
          text: data.responseMessage,
          showConfirmButton: true,
          timer: 3500
        })
      }
      else{
        Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.responseMessage,
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
  this.authenticationService.logout();
}

}
