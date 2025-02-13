import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { EditAttendanceData } from '../model/EditAttendance';

@Component({
  selector: 'app-editattendance',
  templateUrl: './editattendance.component.html',
  styleUrls: ['./editattendance.component.css']
})
export class EditattendanceComponent {

list: NodeListOf<HTMLElement>;
  public editAttendanceForm !: FormGroup
  formValue !: FormGroup;
  EditModelobj: EditAttendanceData = new EditAttendanceData();
  submitted=false;
  loading=false;
  role: boolean;
  isLoginError: boolean = false;
  rowData: any;
  Editdata:any;
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.editAttendanceForm = this.formBulider.group({
      studentname :['',Validators.required],
      rollno:['',Validators.required],
      status :['',Validators.required],
      date:['',Validators.required],
    });

    const storedRowData = sessionStorage.getItem('rowData');

     // Check if rowData exists and set form values
     if (storedRowData) {
      this.rowData = JSON.parse(storedRowData);
      sessionStorage.removeItem('rowData'); // Optional: Clear after retrieval
      this.editAttendanceForm.patchValue({
        id: this.rowData.id,
        studentname: this.rowData.studentname,
        rollno: this.rowData.rollno,
        status: this.rowData.status,
        date: this.rowData.date
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
  if (this.editAttendanceForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Form Invalid',
      text: 'Please fill out all required fields.',
    });
    return;
  }
  const selectedStatus = this.editAttendanceForm.get('status')?.value;

  if(selectedStatus === "1"){
    this.role = true;
  }else{
    this.role = false;
  }

  this.EditModelobj.id = this.rowData.id;
  this.EditModelobj.studentname = this.editAttendanceForm.value.studentname;
  this.EditModelobj.rollno = this.editAttendanceForm.value.rollno;
  this.EditModelobj.status = this.role;
  this.EditModelobj.date = this.editAttendanceForm.value.date;
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this room '+ this.EditModelobj.rollno +'? This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed){
          this.RestapiService.UpdateAttendance(this.EditModelobj.date, this.EditModelobj.rollno, this.EditModelobj.status).subscribe(
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
                        text: 'Something went wrong while editing the Attendance details!',
                        showConfirmButton: true,
                      });
                    }
          )
        } 
  });
  this.router.navigate(['/attendancerollno']);
}

logout() {
  this.authenticationService.logout();
}

}
