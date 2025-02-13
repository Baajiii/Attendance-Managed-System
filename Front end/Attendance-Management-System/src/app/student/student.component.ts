import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { ChangeDetectorRef } from '@angular/core';
import { saveAs } from 'file-saver'; // Import the file-saver library

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  list: NodeListOf<HTMLElement>;
  StudentData: any =[];
  ClassData: any =[];
  selectedRoom: string = ''; 
  public studentForm !: FormGroup
  submitted=false;
  loading = false;
  adminName:string = sessionStorage.getItem("adminname") || '';
  adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService,private cdr: ChangeDetectorRef) {
    this.list = document.querySelectorAll('.navigation li');
  }
  
  ngOnInit(): void {
    this.loadExternalCSS();
    this.getAllStudentsbyGender();
    this.getAllClass();
    this.studentForm = this.formBulider.group({
      roomno: [''],
    });
  }

  private loadExternalCSS(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/css/student.css'; // Path to your external CSS file
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

  getAllStudentsbyGender(){
    this.RestapiService.getAllStudentsbyGender(this.adminRole).subscribe(res=>{
      this.StudentData = res;
    });
  }

  getAllClass(){
    this.RestapiService.getAllClass().subscribe(res=>{
      this.ClassData = res;
    });
  }

  assignClass(row){
    console.log(row);
    this.submitted = true;
    if (this.studentForm.invalid) {
      return;
    }
    this.loading = true;
    if(row.classroom !== null){
      Swal.fire({
        title: 'Classroom Already Assigned!',
        text: `The assigned room number is ${row.classroom.roomno}. Do you still want to change it?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Change it!',
        cancelButtonText: 'No, Keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          // User confirmed: Call the API
          this.RestapiService.assignClass(row.rollno,row.selectedRoom).subscribe(
            (response) => {
              Swal.fire({
                position: 'top', // Top-right corner
                icon: 'success',
                title: response.responseMessage,
                showConfirmButton: false,
                timer: 1000,
                customClass: {
                  popup: 'extra-small-popup' // Apply a custom small popup class
                }
              });       
              this.getAllStudentsbyGender();
             },
            (error) => {
              Swal.fire('Error!', 'Failed to update the Student detail.', 'error');
            }
          );
        } 
      });
    } else {
      this.RestapiService.assignClass(row.rollno,row.selectedRoom).subscribe(
        (response) => {
          Swal.fire({
            position: 'top', 
            icon: 'success',
            title: response.responseMessage,
            showConfirmButton: false,
            timer: 1000 
          });   
          this.getAllStudentsbyGender();
        },
        (error) => {
          Swal.fire('Error!', 'Failed to update the Student detail.', 'error');
        }
      );
    }
  }

  deleteRoom(rollno) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Student? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.RestapiService.DeleteStudent(rollno).subscribe(
          (data: any) => {
            if (data.status == true) {
              Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: true,
              });
              this.getAllStudentsbyGender();
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.messages,
                showConfirmButton: true,
              });
            }
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong while deleting the Student!',
              showConfirmButton: true,
            });
          }
        );
      }
    });
  }

  onEdit(row:any){
    // console.log(row);
    sessionStorage.setItem('rowData', JSON.stringify(row)); // Save data to sessionStorage
    window.location.href = '/editstudent';
  }

  logout() {
    this.authenticationService.logout();
  }
  
  download(rollno: string) {
    this.RestapiService.DownloadReport(rollno).subscribe(
      (response) => {
        // Extract the filename from the Content-Disposition header
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'attendance_' + rollno + '.xlsx'; // Default filename if none is provided
  
        if (contentDisposition) {
          const matches = /filename="([^"]+)"/.exec(contentDisposition);
          if (matches && matches[1]) {
            fileName = matches[1];
          }
        }
  
        // Create a Blob and trigger download
        const blob = new Blob([response.body], { type: response.body.type });
        saveAs(blob, fileName);
      },
      (error) => {
        console.error('Download failed', error);
  
        // Check if the API response status is 404 (Not Found)
        if (error.status === 404) {
          Swal.fire('Not Record Found!', error.error.message, 'warning');
        } else {
          // Show general error message for any other errors
          Swal.fire('Error!', 'Failed to download the file.', 'error');
        }
      }
    );
  }
  
}
