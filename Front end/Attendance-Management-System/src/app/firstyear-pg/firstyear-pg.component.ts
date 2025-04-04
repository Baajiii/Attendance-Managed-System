import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';

@Component({
  selector: 'app-firstyear-pg',
  templateUrl: './firstyear-pg.component.html',
  styleUrls: ['./firstyear-pg.component.css']
})
export class FirstyearPgComponent {

  list: NodeListOf<HTMLElement>;
  ClassData: any;
  StudentData: any =[];
  filteredClassData: any = []; 
  attendanceDetails:any = {
    studentCount: 0,
    present: 0,
    absent: 0
  };
  yearFilter: number = 1; // Default year filter
  degreeFilter: string = 'PG';
  public adminForm !: FormGroup
  public classForm !: FormGroup
  submitted=false;
  loading = false;
  adminName:string = sessionStorage.getItem("adminname");
  totalClasses: number = 0;
   adminRole: boolean = JSON.parse(sessionStorage.getItem('adminrole'));
   departmentCounts: { [key: string]: number } = {};
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.getAllClass();
     this.getAllStudents();
     this.adminForm = this.formBulider.group({
       date: [''],
       year: 1,
       role: this.adminRole,
       degree: ['PG']
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
     this.filteredClassData = res;
     this.filterClasses(); // Apply the initial filter based on default values
     this.totalClasses = this.filteredClassData.length;

   }) 
  }

  filterClasses(): void {
    this.filteredClassData = this.ClassData.filter((classItem) =>
      (this.yearFilter ? classItem.year === this.yearFilter : true) &&
      (this.degreeFilter ? classItem.degree === this.degreeFilter : true)
    );
  }
 
  getAllStudents(){
   this.RestapiService.getAllStudents().subscribe(res=>{
     this.StudentData = res;
     this.calculateCounts();
   })
  }
 
  calculateCounts(): void{
    const firstYearStudents = this.StudentData.filter(student => student.year === 1  && student.degree === 'PG');
    console.log(firstYearStudents);


 this.departmentCounts = firstYearStudents.reduce((counts, student) => {
   counts[student.dept] = (counts[student.dept] || 0) + 1;
   return counts;
 },{});
  }
 
  adminDashboard(){
   this.submitted = true;
   if (this.adminForm.invalid) {
     return;
   }
   this.loading = true;
   const result:any = Object.assign({}, this.adminForm.value);
 
   this.RestapiService.adminYearDasboard(result.date,result.year,result.role,result.degree).subscribe(res=>{
     console.log(res);
     this.attendanceDetails = res;
   })  
 }

 logout() {
  this.authenticationService.logout();
}
 }
 
