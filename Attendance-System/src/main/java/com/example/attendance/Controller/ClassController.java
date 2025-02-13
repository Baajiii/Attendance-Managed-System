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

import com.example.attendance.Details.ClassWithStudentCount;
import com.example.attendance.Models.ClassRooms;
import com.example.attendance.Response.ClassEditResponse;
import com.example.attendance.Response.ClassResponse;
import com.example.attendance.Response.RoomDeleteResponse;
import com.example.attendance.Response.TeacherResponse;
import com.example.attendance.Servic.ClassServices;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ClassController {

	@Autowired
	private ClassServices Service;

	// Add new Classes
	@PostMapping("/add/new/class")
	public ClassResponse AddNewClass(@RequestBody ClassRooms rooms) {
		return Service.AddClass(rooms);
	}

	// Assign teacher to class
	@PostMapping("/assign/teacher/class")
	public TeacherResponse AssignTeacher(@RequestBody ClassRooms rooms) {
		return Service.AssignTeacher(rooms);
	}

	// Delete the class room and unassigned the students
	@DeleteMapping("/delete/room/{roomno}")
	public RoomDeleteResponse DeleteRoom(@PathVariable("roomno") String roomno) {
		return Service.DeleteRoom(roomno);
	}

	// Edit the Class Room details
	@PutMapping("/edit/class/{id}")
	public ClassEditResponse EditClass(@RequestBody ClassRooms details, @PathVariable("id") Long id) {
		return Service.EditClass(details, id);
	}

	// Find all the class rooms
	@GetMapping("/findall/class")
	public List<ClassRooms> FindAllClassRooms() {
		return Service.FindAllClass();
	}

	// Find all the class rooms with student count
	@GetMapping("/findall/classwithstudentcount")
	public List<ClassWithStudentCount> FindAllClassRoomsWithStudentcount() {
		return Service.FindAllClassWithStu();
	}
	
	

}
