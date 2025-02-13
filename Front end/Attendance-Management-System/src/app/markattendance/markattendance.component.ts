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
  selector: 'app-markattendance',
  templateUrl: './markattendance.component.html',
  styleUrls: ['./markattendance.component.css']
})
export class MarkattendanceComponent {

list: NodeListOf<HTMLElement>;
  StudentData: any =[];
  selectedRoom: string = ''; 
  public studentForm !: FormGroup
  public SearchForm !: FormGroup
  submitted=false;
  loading = false;
  adminName:string = sessionStorage.getItem("adminname") || '';
  adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
  roomnumber: string = sessionStorage.getItem("roomnumber") || ''
  notification: string | null = null;
  notificationColor: string;
  isLoginError: boolean = false;

  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService,private cdr: ChangeDetectorRef) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.SearchStudents();
     this.studentForm = this.formBulider.group({
       roomno: [''],
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
   this.RestapiService.SearchByRoom(this.roomnumber).subscribe(res=>{
     this.StudentData = res;
   })
  }


onEdit(row:any){

  sessionStorage.setItem('rowData', JSON.stringify(row)); // Save data to sessionStorage
  window.location.href = '/editattendancebystaff';
}

logout() {
  this.authenticationService.logout();
}

markattendance(rollno: string, status: number) {
  
  const attendance = status === 1 ? true : false
    this.RestapiService.markattendance(rollno,attendance).subscribe(
      (data: any) => {
        if(data.status == false){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.responseMessage,
            showConfirmButton: true
          })
        }else{
          const infoSymbol = ' ℹ️ ';
          const message = status === 1 ? infoSymbol +' Roll no: '+ rollno+' Present' : infoSymbol + ' Roll no: '+ rollno+' Absent';
          this.notificationColor = status === 1 ? '#90EE90': '#FF6347';
          this.notification = message;
          setTimeout(() => {
          this.notification = null;
          }, 1000);
        }
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;

      }
    )
}


}
