package com.example.attendance.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.Details.StudentDetails;
import com.example.attendance.Details.StudentDetailsEdit;
import com.example.attendance.Models.Students;
import com.example.attendance.Response.ClassAssignResponse;
import com.example.attendance.Response.ClassEditResponse;
import com.example.attendance.Response.StudentDeleteResponse;
import com.example.attendance.Response.StudentEditResponse;
import com.example.attendance.Response.StudentsResponse;
import com.example.attendance.Servic.StudentServices;

@RestController
@CrossOrigin
public class StudentController {

	@Autowired
	private StudentServices Service;

	// Add new Student
	@PostMapping("/add/new/student")
	public StudentsResponse AddNewStudent(@RequestBody StudentDetails details) {
		return Service.AddStudent(details);
	}

	// Assign students to class
	@GetMapping("/assign/student_to_class/{rollno}/{classname}")
	public ClassAssignResponse AssignClass(@PathVariable("rollno") String rollno,
			@PathVariable("classname") String classname) {
		return Service.AssignClass(rollno, classname);
	}

	// Delete the student
	@DeleteMapping("/delete/student/{rollno}")
	public StudentDeleteResponse DeleteStudent(@PathVariable("rollno") String roolno) {
		return Service.deleteStudent(roolno);
	}

	// Update the student details
	@PutMapping("/edit/student/{id}")
	public StudentEditResponse EditStudent(@RequestBody StudentDetailsEdit details, @PathVariable("id") Long id) {
		return Service.EditStudent(details, id);
	}

	// Find all the Students based on gender
	@GetMapping("/findall/students/{gender}")
	public List<Students> FindAllStudentsByGender(@PathVariable("gender") boolean gender) {
		return Service.FindAllStudentsByGender(gender);
	}

	// Find all the Students
	@GetMapping("/findall/students")
	public List<Students> FindAllStudents() {
		return Service.FindAllStudents();
	}

	// Find student based on year and batch
	@GetMapping("/findbyyear/{year}/{startyear}/{endyear}/{gender}")
	public List<Students> FindStudentByYearAndBatch(@PathVariable("year") int year,
			@PathVariable("startyear") String startyear, @PathVariable("endyear") String endyear,
			@PathVariable("gender") boolean gender) {
		return Service.FindStudentByYearAndBatch(year, startyear, endyear, gender);
	}

	// Find student based on roomno
	@GetMapping("/findbyroom/{roomno}")
	public List<Students> FindStudentByRoomNO(@PathVariable("roomno") String roomno) {
		return Service.FindyByRoomno(roomno);
	}

	// Clear student based on roomno////
	@GetMapping("/clear/students/{roomno}")
	public ClassEditResponse ClearStudentsByRoom(@PathVariable("roomno") String roomno) {
		return Service.ClearStudentsByRoomNo(roomno);
	}

}
