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
  selector: 'app-viewattendancebydate',
  templateUrl: './viewattendancebydate.component.html',
  styleUrls: ['./viewattendancebydate.component.css']
})
export class ViewattendancebydateComponent {

 list: NodeListOf<HTMLElement>;
  StudentData: any =[];
  ClassData: any =[];
  selectedRoom: string = ''; 
  public studentForm !: FormGroup
  public SearchForm !: FormGroup
  submitted=false;
  loading = false;
  adminName:string = sessionStorage.getItem("adminname") || '';
  adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService,private cdr: ChangeDetectorRef) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.studentForm = this.formBulider.group({
       roomno: [''],
     });
     this.SearchForm = this.formBulider.group({
       year: [''],
       date:[''],
       startYear: [''],
       endYear: ['']
     });
     }
 
     private loadExternalCSS(): void {
       const link = document.createElement('link');
       link.rel = 'stylesheet';
       link.href = 'assets/css/findstudent.css'; // Path to your external CSS file
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
 
 
  SearchStudents(){

    this.submitted = true;
    if (this.SearchForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
    this.loading = true;
    const result:any = Object.assign({}, this.SearchForm.value);
console.log(result);
   this.RestapiService.viewAttendanceByYear(result.year,result.startYear,result.endYear,result.date,this.adminRole).subscribe(res=>{
     this.StudentData = res;
   })
  }

  

onEdit(row:any){

  sessionStorage.setItem('rowData', JSON.stringify(row)); // Save data to sessionStorage
  window.location.href = '/editstudent';
}

 download(data:any) {

  const result:any = Object.assign({}, data);
  const gendername = this.adminName ? 'Male' : 'Female';

  this.RestapiService.DownloadReportByYear(result.year,result.startYear,result.endYear,result.date,this.adminRole).subscribe(
    (response) => {
      // Extract the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let fileName = 'Attendance '+ result.date + ' (' + result.startYear + '-' + result.endYear + ' )' + gendername +'.xlsx'; // Default filename if none is provided

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

     logout() {
      this.authenticationService.logout();
    }
 }
 
 

