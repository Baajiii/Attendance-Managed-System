import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { AddclassComponent } from './addclass/addclass.component';
import { CodashboardComponent } from './codashboard/codashboard.component';
import { SecondyearUgComponent } from './secondyear-ug/secondyear-ug.component';
import { SecondyearPgComponent } from './secondyear-pg/secondyear-pg.component';
import { FirstyearUgComponent } from './firstyear-ug/firstyear-ug.component';
import { FirstyearPgComponent } from './firstyear-pg/firstyear-pg.component';
import { ThirdyearUgComponent } from './thirdyear-ug/thirdyear-ug.component';
import { RoomComponent } from './room/room.component';
import { StudentComponent } from './student/student.component';
import { EditclassComponent } from './editclass/editclass.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { FindstudentComponent } from './findstudent/findstudent.component';
import { SearchbyyearComponent } from './searchbyyear/searchbyyear.component';
import { MarkattendanceComponent } from './markattendance/markattendance.component';
import { ViewattendancestudentComponent } from './viewattendancestudent/viewattendancestudent.component';
import { ViewattendancebydateComponent } from './viewattendancebydate/viewattendancebydate.component';
import { EditattendanceComponent } from './editattendance/editattendance.component';
import { EditattendanceforstaffComponent } from './editattendanceforstaff/editattendanceforstaff.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { AuthGuard } from './auth.guard';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddcoordinatorComponent } from './addcoordinator/addcoordinator.component';
import { ViewcoordinatorComponent } from './viewcoordinator/viewcoordinator.component';
import { ViewstudentsbygenderComponent } from './viewstudentsbygender/viewstudentsbygender.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddstudentComponent,
    AddclassComponent,
    CodashboardComponent,
    SecondyearUgComponent,
    SecondyearPgComponent,
    FirstyearUgComponent,
    FirstyearPgComponent,
    ThirdyearUgComponent,
    RoomComponent,
    StudentComponent,
    EditclassComponent,
    EditstudentComponent,
    FindstudentComponent,
    SearchbyyearComponent,
    MarkattendanceComponent,
    ViewattendancestudentComponent,
    ViewattendancebydateComponent,
    EditattendanceComponent,
    EditattendanceforstaffComponent,
    NotAuthorizedComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    AddcoordinatorComponent,
    ViewcoordinatorComponent,
    ViewstudentsbygenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
