import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { Coordinatordata } from '../model/coordinatorData';

@Component({
  selector: 'app-viewstudentsbygender',
  templateUrl: './viewstudentsbygender.component.html',
  styleUrls: ['./viewstudentsbygender.component.css']
})
export class ViewstudentsbygenderComponent {

 list: NodeListOf<HTMLElement>;
 boy:boolean = true;
 girl:boolean = false;

  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
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

  male(){
    sessionStorage.setItem('adminrole',"true");
    sessionStorage
    this.router.navigate(['/home']);   
  }

  female(){
    sessionStorage.setItem('adminrole',"false");
    sessionStorage
    this.router.navigate(['/home']);   
  }

 logout() {
  this.authenticationService.adminlogout();
}

}
