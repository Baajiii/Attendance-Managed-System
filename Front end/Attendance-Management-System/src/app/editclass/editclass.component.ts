import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { RestapiService } from '../restapi.service';
import { EditRoomData } from '../model/EditRoom';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrls: ['./editclass.component.css']
})
export class EditclassComponent {

 list: NodeListOf<HTMLElement>;
  public editClassForm !: FormGroup
  formValue !: FormGroup;
  EditModelobj: EditRoomData = new EditRoomData();
  submitted=false;
  loading=false;
  isLoginError: boolean = false;
  rowData: any;
  
  constructor(private formBulider : FormBuilder,private authenticationService : AuthenticationService,private route: ActivatedRoute,private router: Router,private RestapiService : RestapiService) {
    this.list = document.querySelectorAll('.navigation li');
  }
   ngOnInit(): void {
     this.loadExternalCSS();
     this.editClassForm = this.formBulider.group({
      roomno :['',Validators.required],
      degree:['',Validators.required],
      year :['',Validators.required],
      teachername:['',Validators.required],
      password : ['',Validators.required]
    });

    const storedRowData = sessionStorage.getItem('rowData');

     // Check if rowData exists and set form values
     if (storedRowData) {
      this.rowData = JSON.parse(storedRowData);
      sessionStorage.removeItem('rowData'); // Optional: Clear after retrieval
      this.editClassForm.patchValue({
        id: this.rowData.id,
        roomno: this.rowData.roomno,
        degree: this.rowData.degree,
        year: this.rowData.year,
        teachername: this.rowData.staff
      });
    }else {
      console.warn('No rowData found in sessionStorage.');
    }

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
 

  onEdit(){
  // Check if the form is valid
  if (this.editClassForm.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Form Invalid',
      text: 'Please fill out all required fields.',
    });
    return;
  }

    this.EditModelobj.id = this.rowData.id;
    this.EditModelobj.roomno = this.editClassForm.value.roomno;
    this.EditModelobj.degree = this.editClassForm.value.degree;
    this.EditModelobj.password = this.editClassForm.value.password;
    this.EditModelobj.teachername = this.editClassForm.value.teachername;
    this.EditModelobj.year = this.editClassForm.value.year;
    Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to edit this room? This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed){
          this.RestapiService.UpdateClass(this.EditModelobj, this.EditModelobj.id).subscribe(
            (data: any) => {
              if(data.status == true){
                 Swal.fire({
                              icon: 'success',
                              title: data.responseMessage,
                              showConfirmButton: true,
                              customClass: {
                                title: 'small-title' // Apply custom class to the title
                              }
                            });
                            this.formValue.reset();
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
                        text: 'Something went wrong while editing the room details!',
                        showConfirmButton: true,
                      });
                    }
          )
        } 
  });
  this.router.navigate(['/room']);
}

logout() {
  this.authenticationService.logout();
}

}
