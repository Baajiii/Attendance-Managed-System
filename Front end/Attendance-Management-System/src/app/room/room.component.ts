import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { ChangeDetectorRef } from '@angular/core';
import { EditRoomData } from '../model/EditRoom';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  list: NodeListOf<HTMLElement>;
  StudentData: any =[];  
   teacherForm !: FormGroup;
  formValue !: FormGroup;
  RoomModelObj: EditRoomData = new EditRoomData();
  submitted=false;
  loading = false;
  adminName:string = sessionStorage.getItem("adminname") || '';
   adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService,private cdr: ChangeDetectorRef) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.getAllClassWithCount();
     this.teacherForm = this.formBulider.group({
       staffname: ['']
     });
     this.formValue = this.formBulider.group({
      roomno :[''],
      staff :[''],
      degree :[''],
      password :[''],
      year :['']  
    })
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
 
 
  getAllClassWithCount(){
   this.RestapiService.getAllClasswithstudentcount().subscribe(res=>{
     this.StudentData = res;
   })
  }
   
  AssignTeacher(row : any){
   this.submitted = true;
   if (this.teacherForm.invalid) {
     return;
   }
   this.loading = true;
   const result:any = Object.assign({}, this.teacherForm.value);
   this.RestapiService.assignteacher(row.degree,row.roomno,row.year,result.staffname).subscribe(
    (data: any) => {
      if(data.status == true){
        Swal.fire({
                  icon: 'success',
                  title: data.responseMessage,
                  showConfirmButton: false,
                  timer: 3000
                })
                this.getAllClassWithCount();
                this.teacherForm.reset();
      }
      else{
        Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.responseMessage,
                  showConfirmButton: true,
                })
      }
    }
   )
 }

 deleteRoom(roomno) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to delete this room? This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      this.RestapiService.DeleteClass(roomno).subscribe(
        (data: any) => {
          if (data.status == true) {
            Swal.fire({
              icon: 'success',
              title: data.responseMessage,
              showConfirmButton: true,
              customClass: {
                title: 'small-title' // Apply custom class to the title
              }
            });
            this.getAllClassWithCount();
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
            text: 'Something went wrong while deleting the room!',
            showConfirmButton: true,
          });
        }
      );
    }
  });
}

onEdit(row:any){

  sessionStorage.setItem('rowData', JSON.stringify(row)); // Save data to sessiontorage
  window.location.href = '/editclass';
}

logout() {
  this.authenticationService.logout();
}
 }
 
 
