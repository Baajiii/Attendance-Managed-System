import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { ClassRoomdata } from '../model/ClassRoom';

@Component({
  selector: 'app-addclass',
  templateUrl: './addclass.component.html',
  styleUrls: ['./addclass.component.css']
})
export class AddclassComponent {

  list: NodeListOf<HTMLElement>;
  public addClassForm !: FormGroup
  submitted=false;
  loading=false;
  isLoginError: boolean = false;
  StudentData: any =[];

  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.getAllClassWithCount();
     this.updateVisibleCards();
     window.addEventListener('resize', this.updateVisibleCards.bind(this));
     this.addClassForm = this.formBulider.group({
      roomnumber :[''],
      degree:[''],
      year :[''],
      password : ['']
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
 
 currentTranslateX: number = 0; // Starting position
 visibleCards: number = 3; // Number of cards visible at once
 cardWidth: number = 250 + 30; // Card width + margin (adjust based on your styles)

 prevSlide() {
   const maxTranslateX = 0; // No more sliding to the left beyond this point
   this.currentTranslateX = Math.min(this.currentTranslateX + 100, maxTranslateX);
 }

 nextSlide() {
   const maxTranslateX = -((this.StudentData.length - this.visibleCards) * 100); // Calculate max slide
   this.currentTranslateX = Math.max(this.currentTranslateX - 100, maxTranslateX);
 }

 updateVisibleCards() {
  const screenWidth = window.innerWidth;
  if (screenWidth > 991) {
    this.visibleCards = 4;
  } else if (screenWidth > 768) {
    this.visibleCards = 3;
  } else if (screenWidth > 480) {
    this.visibleCards = 2;
  } else {
    this.visibleCards = 1;
  }
 }


 getAllClassWithCount(){
  this.RestapiService.getAllClasswithstudentcount().subscribe(res=>{
    this.StudentData = res;
  })
 }

 addClass(){
  this.submitted = true;
  console.log(this.addClassForm);
  if(this.addClassForm.invalid){
    return;
  }
  this.loading = true;
  const result: ClassRoomdata = Object.assign({}, this.addClassForm.value);
  this.RestapiService.addClass(result.roomnumber, result.year,result.password,result.degree).subscribe(
    (data: any) => {
      if(data.classStatus == true){
        Swal.fire({
          icon: 'success',
          text: data.responseMessage,
          showConfirmButton: true,
          timer: 3500
        })
        this. getAllClassWithCount();
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
