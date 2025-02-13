import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

// Add hovered class to selected list item
list: NodeListOf<HTMLElement>;
ClassData: any[] = [];
StudentData: any =[];
attendanceDetails:any = {
   studentCount: 0,
   present: 0,
   absent: 0
 };
public adminForm !: FormGroup
public classForm !: FormGroup
submitted=false;
loading = false;
adminName: string = sessionStorage.getItem("adminname") || '';
totalClasses: number = 0;
 adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
 departmentCounts: { [key: string]: number } = {};

constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService,private cdr: ChangeDetectorRef) {
  this.list = document.querySelectorAll('.navigation li');
}
 ngOnInit(): void {
   this.loadExternalCSS();
   this.getAllClass();
   this.getAllStudents();
   this.adminForm = this.formBulider.group({
     date: [''],
   });
   }

   private loadExternalCSS(): void {
     const link = document.createElement('link');
     link.rel = 'stylesheet';
     link.href = 'assets/css/style.css'; // Path to your external CSS file
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

getAllClass(){
 this.RestapiService.getAllClass().subscribe(res=>{
   this.ClassData = res;
   this.totalClasses = res.length;
   this.cdr.detectChanges(); 
 },(err) => {
   console.error('Error loading classes:', err); // Updated: Added error handling
 }
);
}

getAllStudents(){
 this.RestapiService.getAllStudents().subscribe(res=>{
   this.StudentData = res;
   this.calculateCounts();
   this.cdr.detectChanges(); 
 })
}

calculateCounts(): void{
this.departmentCounts = this.StudentData.reduce((counts, student) => {
 counts[student.dept] = (counts[student.dept] || 0) + 1;
 return counts;
},{});
}

adminDashboard(){
 console.log('Admin form submitted');
 this.submitted = true;
 if (this.adminForm.invalid) {
   return;
 }
 this.loading = true;
 const result:any = Object.assign({}, this.adminForm.value);

 this.RestapiService.AdminDashboard(result.date).subscribe(res=>{
   console.log(res);
   this.attendanceDetails = res;
 })  
}


logout() {
  this.authenticationService.adminlogout();
}
}

