import {map} from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  readonly url = 'http://localhost:8081/';

  constructor(private http:HttpClient) { }

  roomEntry(roomnumber:string,password:string){
    var body = {
      name: roomnumber,
      password: password
    }
    console.log(body);
    return this.http.post(this.url + '/room/login', body)
  }

  coOrdinatorEntry(password:string,name:string,role:boolean){
    var body = {
      password: password,
      name: name,
      role: role
    }
    console.log(body);
    return this.http.post(this.url + '/coordinator/login', body)
  }

  public addClass(roomnumber:string,year:number,password:string,degree:string){
    var body ={
      roomno: roomnumber,
      year: year,
      password: password,
      degree: degree
    }
    return this.http.post(this.url + '/add/new/class',body)
  }

  addStudent(name:string,rollno:string, year:number, dept:string, startYear:string, endYear:string, degree:string, gender:boolean){
    var body = {
      name: name,
      rollno:rollno,
      year:year,
      dept:dept,
      startYear:startYear,
      endYear:endYear,
      degree:degree,
      gender:gender
    }
    console.log(body);
    return this.http.post(this.url + '/add/new/student', body)
  }

  public assignteacher(degree:string,roomno:string,year:number, teachername:string){
    var body = {
      degree: degree,
      roomno: roomno,
      year: year,
      teachername: teachername
    }
    return this.http.post(this.url + '/assign/teacher/class', body)
  }

  public getAllClass(){
    return this.http.get<any>(this.url + '/findall/class').pipe(map((res:any)=>{
    return res;
    }))
  }

  public getAllClasswithstudentcount(){
    return this.http.get<any>(this.url + '/findall/classwithstudentcount').pipe(map((res:any)=>{
    return res;
    }))
  }

  public getAllStudents():Observable<any[]>{
    return this.http.get<any>(this.url + 'findall/students').pipe(map((res:any)=>{
    return res;
    }))
  }
   
  public getAllStudentsbyGender(gender:boolean){
    return this.http.get<any>(this.url + '/findall/students/' + gender).pipe(map((res:any)=>{
      return res;
      }))
  }

  public assignClass(rollno:string,roomno:string){
    return this.http.get<any>(this.url + '/assign/student_to_class/' + rollno + '/' + roomno).pipe(map((res:any)=>{
      return res;
      }))
  }

  adminDasboard(date:Date,role:boolean){
    return this.http.get<any>(this.url + '/admin/dashboard/' + date +'/' + role);
      }

  AdminDashboard(date:Date){
    return this.http.get<any>(this.url + '/admin/dashboard/' + date);
  }

  adminYearDasboard(date:Date,year:number,role:boolean,degree:string){
     return this.http.get<any>(this.url + '/admin/year/dashboard/' + date +'/' + year +'/' + role +'/' + degree);
          }

  DeleteClass(roomno:string){
    return this.http.delete<any>(this.url + '/delete/room/' + roomno)
  }
  
  DeleteStudent(rollno:string){
    return this.http.delete<any>(this.url + '/delete/student/' + rollno)
  }

  UpdateClass(data: any, id: number){
    return this.http.put<any>(this.url + 'edit/class/' + id, data )
    .pipe(map((res:any) => {
      return res;
    }))
  }
  
  UpdateStudent(data: any, id: number){
    return this.http.put<any>(this.url + '/edit/student/' + id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  SearchByRoom(roomno:string){
    return this.http.get<any>(this.url + '/findbyroom/' + roomno)
  }

  FindStudentbyYear(year:number,startYear:string,endYear:string,gender:boolean){
     return this.http.get<any>(this.url + '/findbyyear/' + year + '/' + startYear + '/' + endYear + '/' + gender)
  }

  DownloadReport(rollno: string): Observable<HttpResponse<Blob>> {
    return this.http.get(this.url + '/download/' + rollno, {
      responseType: 'blob',
      observe: 'response', // Include this to get both headers and the body
    });
  }

  DownloadReportByYear(year:number,startyear:string,endyear:string,date:string,gender:boolean): Observable<HttpResponse<Blob>> {
    return this.http.get(this.url + '/download/' + year + '/' + startyear + '/' + endyear + '/' + date + '/' + gender, {
      responseType: 'blob',
      observe: 'response', // Include this to get both headers and the body
    });
  }

  viewAttendance(rollno: string){
    return this.http.get(this.url + '/view/attendance/' + rollno)
  }

  viewAttendanceByYear(year:number,startyear:string,endyear:string,date:string,gender:boolean){
    return this.http.get(this.url + '/view/attendance/' + year + '/' + startyear + '/' + endyear + '/' + date + '/' + gender)
  }
  
  UpdateAttendance(date:string,rollno:string,status:boolean){
    return this.http.get(this.url + '/edit/attendance/' + date + '/' + rollno + '/' + status)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  markattendance(rollno:string,status:boolean){
    return this.http.get(this.url +'/mark/attendance/' + rollno + '/' + status)
  }

  getCoordinator(){
    return this.http.get<any>(this.url + '/view/coordinator')
  }

  deleteCoordinator(name:string): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.url + '/delete/coordinator/' + name, { observe: 'response' });
  }

  public addCoordinator(name:string,password:string,role:boolean){
    var body ={
      name: name,
      password: password,
      role: role,
    }
    return this.http.post(this.url + '/add/new/coordinator',body)
  }
}
  




