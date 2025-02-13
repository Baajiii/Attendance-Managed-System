package com.example.attendance.Servic;

import java.util.List;

import com.example.attendance.Details.StudentDetails;
import com.example.attendance.Details.StudentDetailsEdit;
import com.example.attendance.Models.Students;
import com.example.attendance.Response.ClassAssignResponse;
import com.example.attendance.Response.ClassEditResponse;
import com.example.attendance.Response.StudentDeleteResponse;
import com.example.attendance.Response.StudentEditResponse;
import com.example.attendance.Response.StudentsResponse;

public interface StudentServices {

	public StudentsResponse AddStudent(StudentDetails stu);
	public ClassAssignResponse AssignClass(String rollno, String classname);
	public StudentDeleteResponse deleteStudent(String rollno);
	public StudentEditResponse EditStudent(StudentDetailsEdit details, Long id);
	public List<Students> FindAllStudentsByGender(boolean gender);
	public List<Students> FindStudentByYearAndBatch(int year, String startyear, String endyear, boolean gender);
	public List<Students> FindyByRoomno(String room);
	public ClassEditResponse ClearStudentsByRoomNo(String room);
	public List<Students> FindAllStudents();



}
