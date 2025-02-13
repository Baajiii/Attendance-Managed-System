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
  selector: 'app-viewattendancestudent',
  templateUrl: './viewattendancestudent.component.html',
  styleUrls: ['./viewattendancestudent.component.css']
})
export class ViewattendancestudentComponent {

list: NodeListOf<HTMLElement>;
  StudentData: any =[];
  ClassData: any =[];
  selectedRoom: string = ''; 
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
     this.SearchForm = this.formBulider.group({
       rollno: ['']
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
 
 
  ViewStudentAttendance(){
    this.submitted = true;
    if (this.SearchForm.invalid) {
      console.warn('Form is invalid');
      return;
    }
    this.loading = true;
    const result:any = Object.assign({}, this.SearchForm.value);
   this.RestapiService.viewAttendance(result.rollno).subscribe(res=>{
     this.StudentData = res;
   })
  }

  logout() {
    this.authenticationService.logout();
  }

onEdit(row:any){

  sessionStorage.setItem('rowData', JSON.stringify(row));
  window.location.href = '/editattendance';
}


 }
 
 

