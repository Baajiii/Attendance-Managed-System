import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CodashboardComponent } from './codashboard/codashboard.component';
import { FirstyearUgComponent } from './firstyear-ug/firstyear-ug.component';
import { SecondyearUgComponent } from './secondyear-ug/secondyear-ug.component';
import { ThirdyearUgComponent } from './thirdyear-ug/thirdyear-ug.component';
import { FirstyearPgComponent } from './firstyear-pg/firstyear-pg.component';
import { SecondyearPgComponent } from './secondyear-pg/secondyear-pg.component';
import { RoomComponent } from './room/room.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { StudentComponent } from './student/student.component';
import { AddclassComponent } from './addclass/addclass.component';
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
import { adminGuard } from './admin.guard';
import { staffGuard } from './staff.guard';
import { mainadminGuard } from './mainadmin.guard';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddcoordinatorComponent } from './addcoordinator/addcoordinator.component';
import { ViewcoordinatorComponent } from './viewcoordinator/viewcoordinator.component';
import { ViewstudentsbygenderComponent } from './viewstudentsbygender/viewstudentsbygender.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: CodashboardComponent, canActivate: [adminGuard] },
  { path: 'firstyear', component: FirstyearUgComponent, canActivate: [adminGuard] },
  { path: 'secondyearug', component: SecondyearUgComponent, canActivate: [adminGuard] },
  { path: 'thirdyearug', component: ThirdyearUgComponent, canActivate: [adminGuard] },
  { path: 'firstyearpg', component: FirstyearPgComponent, canActivate: [adminGuard] },
  { path: 'secondyearpg', component: SecondyearPgComponent, canActivate: [adminGuard] },
  { path: 'room', component: RoomComponent, canActivate: [adminGuard] },
  { path: 'addstudent', component: AddstudentComponent, canActivate: [adminGuard] },
  { path: 'student', component: StudentComponent, canActivate: [adminGuard] },
  { path: 'addclass', component: AddclassComponent, canActivate: [adminGuard] },
  { path: 'editclass', component: EditclassComponent, canActivate: [adminGuard] },
  { path: 'editstudent', component: EditstudentComponent, canActivate: [adminGuard] },
  { path: 'findstudent', component: FindstudentComponent, canActivate: [adminGuard] },
  { path: 'searchbyyear', component: SearchbyyearComponent, canActivate: [adminGuard] },
  { path: 'markattendance', component: MarkattendanceComponent, canActivate: [staffGuard] },
  { path: 'attendancerollno', component: ViewattendancestudentComponent, canActivate: [adminGuard] },
  { path: 'attendancedate', component: ViewattendancebydateComponent, canActivate: [adminGuard] },
  { path: 'editattendance', component: EditattendanceComponent, canActivate: [adminGuard] },
  { path: 'editattendancebystaff', component: EditattendanceforstaffComponent, canActivate: [staffGuard] },
  { path: 'adminlogin', component: AdminloginComponent},
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [mainadminGuard]},
  { path: 'addCoordinator', component:AddcoordinatorComponent, canActivate: [mainadminGuard]},
  { path: 'viewCoordinator', component:ViewcoordinatorComponent, canActivate: [mainadminGuard]},
  { path: 'viewbygender', component:ViewstudentsbygenderComponent, canActivate: [mainadminGuard]},
  { path: 'notauthorized', component: NotAuthorizedComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Wildcard route for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
