import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-viewcoordinator',
  templateUrl: './viewcoordinator.component.html',
  styleUrls: ['./viewcoordinator.component.css']
})
export class ViewcoordinatorComponent {

  list: NodeListOf<HTMLElement>;
  CoordinatorData: any =[];  
   submitted=false;
   loading = false;
   adminName:string = sessionStorage.getItem("adminname") || '';
  adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
   
   constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService,private cdr: ChangeDetectorRef) {
     this.list = document.querySelectorAll('.navigation li');
   }
    ngOnInit(): void {
      this.loadExternalCSS();
      this.getCoordinator();
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
  
  
   getCoordinator(){
    this.RestapiService.getCoordinator().subscribe(res=>{
      this.CoordinatorData = res;
    })
   }

 
  deleteRoom(name) {
   Swal.fire({
     title: 'Are you sure?',
     text: 'Do you want to delete this Co-ordinator? This action cannot be undone!',
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!',
     cancelButtonText: 'Cancel'
   }).then((result) => {
     if (result.isConfirmed) {
       this.RestapiService.deleteCoordinator(name).subscribe(
         (response: HttpResponse<any>) => {
           if (response.status >= 200 && response.status < 300) {
             Swal.fire({
               icon: 'success',
               title: 'Coordinator deleted successfully!',
               showConfirmButton: true,
             });
             this.getCoordinator();
           } else {
             Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Something went wrong!',
               showConfirmButton: true,
             });
           }
         },
         (error) => {
           Swal.fire({
             icon: 'error',
             title: 'Error',
             text: 'Failed to delete coordinator: ${error.message}`',
             showConfirmButton: true,
           });
         }
       );
     }
   });
 }
 
 logout() {
   this.authenticationService.adminlogout();
 }

  }
  
  
 