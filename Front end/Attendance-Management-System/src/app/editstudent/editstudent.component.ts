import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { EditStudentData } from '../model/EditStudent';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent {
  list: NodeListOf<HTMLElement>;
  public editStudentForm !: FormGroup
  formValue !: FormGroup;
  EditModelobj: EditStudentData = new EditStudentData();
  submitted=false;
  loading=false;
  isLoginError: boolean = false;
  rowData: any;
  role: boolean;

  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
    }

    ngOnInit(): void {
      this.loadExternalCSS();
      this.editStudentForm = this.formBulider.group({
       name :['',Validators.required],
       rollno:['',Validators.required],
       year :['',Validators.required],
       department:['',Validators.required],
       startyear : ['',Validators.required],
       endyear : ['',Validators.required],
       gender : ['',Validators.required],
       roomno : ['',Validators.required],
       degree : ['',Validators.required]
     });
 
     const storedRowData = sessionStorage.getItem('rowData');
 
      // Check if rowData exists and set form values
      if (storedRowData) {
       this.rowData = JSON.parse(storedRowData);
       sessionStorage.removeItem('rowData'); // Optional: Clear after retrieval
       this.editStudentForm.patchValue({
         id: this.rowData.id,
         name: this.rowData.name,
         rollno: this.rowData.rollno,
         year: this.rowData.year,
         department: this.rowData.dept,
         startyear: this.rowData.startYear,
         endyear: this.rowData.endYear,
         gender: this.rowData.gender,
         roomno: this.rowData.classroom.roomno,
         degree: this.rowData.degree
       });
     }else {
       console.warn('No rowData found in sessionStorage.');
     }
 
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
  
   onEdit(){
 // Check if the form is valid
  if (this.editStudentForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Form Invalid',
      text: 'Please fill out all required fields.',
    });
    return;
  }


  if(this.editStudentForm.value.gender === '1'){
    this.role = true;
  }
  if(this.editStudentForm.value.gender === '2'){
    this.role = false;
  }

    this.EditModelobj.id = this.rowData.id;
    this.EditModelobj.rollno = this.editStudentForm.value.rollno;
    this.EditModelobj.year = this.editStudentForm.value.year;
    this.EditModelobj.dept = this.editStudentForm.value.department;
    this.EditModelobj.startYear = this.editStudentForm.value.startyear;
    this.EditModelobj.endYear = this.editStudentForm.value.endyear;
    this.EditModelobj.gender = this.role;
    this.EditModelobj.roomno = this.editStudentForm.value.roomno;
    this.EditModelobj.name = this.editStudentForm.value.name;
    this.EditModelobj.degree = this.editStudentForm.value.degree;
    Swal.fire({
           title: 'Are you sure?',
           text: 'Do you want to edit this Student? This action cannot be undone!',
           icon: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Yes',
           cancelButtonText: 'Cancel'
         }).then((result) => {
           if (result.isConfirmed){
             this.RestapiService.UpdateStudent(this.EditModelobj, this.EditModelobj.id).subscribe(
               (data: any) => {
                 if(data.status == true){
                    Swal.fire({
                                 icon: 'success',
                                 title: data.responseMessage,
                                 showConfirmButton: true,
                               });
                               this.formValue.reset();
                 } else {
                             Swal.fire({
                               icon: 'error',
                               title: 'Oops...',
                               text: data.responseMessage,
                               showConfirmButton: true,
                             });
                           }
               },
                (error) => {
                         Swal.fire({
                           icon: 'error',
                           title: 'Error',
                           text: 'Something went wrong while editing the Student details!',
                           showConfirmButton: true,
                         });
                       }
             )
           } 
     });
     this.router.navigate(['/student']);
   }
   
   logout() {
    this.authenticationService.logout();
  }
 

}
