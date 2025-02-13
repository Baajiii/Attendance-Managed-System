package com.example.attendance.Service.Imple;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendance.Details.StudentDetails;
import com.example.attendance.Details.StudentDetailsEdit;
import com.example.attendance.Models.ClassRooms;
import com.example.attendance.Models.Students;
import com.example.attendance.Repository.ClassRepository;
import com.example.attendance.Repository.StudentsRepository;
import com.example.attendance.Response.ClassAssignResponse;
import com.example.attendance.Response.ClassEditResponse;
import com.example.attendance.Response.StudentDeleteResponse;
import com.example.attendance.Response.StudentEditResponse;
import com.example.attendance.Response.StudentsResponse;
import com.example.attendance.Servic.StudentServices;

@Service
public class StudentServicesImple implements StudentServices {

	@Autowired
	private StudentsRepository stuRepo;

	@Autowired
	private ClassRepository classRepo;

	// Add new student
	@Override
	public StudentsResponse AddStudent(StudentDetails stu) {

		StudentsResponse response = new StudentsResponse();
		boolean flag = true;
		String message = "Mr/Miss: " + stu.getName() + " Added to " + stu.getDept() + " " + stu.getYear() + "Yr "
				+ stu.getDegree() + " Successfully";
		Optional<Students> op = stuRepo.FindByRoolNoAndYear(stu.getRollno(), stu.getYear());
		if (op.isEmpty()) {
			Students student = new Students();
			student.setName(stu.getName());
			student.setYear(stu.getYear());
			student.setDegree(stu.getDegree());
			student.setGender(stu.getGender());
			student.setStartYear(stu.getStartYear());
			student.setEndYear(stu.getEndYear());
			student.setDept(stu.getDept());
			student.setRollno(stu.getRollno());
			stuRepo.save(student);
		} else {
			flag = false;
			Students exsistingStudent = op.get();
			message = "Roll Number " + stu.getRollno() + " is Already Present for " + exsistingStudent.getName() + " "
					+ exsistingStudent.getDept() + " " + exsistingStudent.getYear() + "Yr "
					+ exsistingStudent.getDegree();
		}

		response.setDegree(stu.getDegree());
		response.setStatus(flag);
		response.setResponseMessage(message);
		response.setDept(stu.getDept());
		response.setName(stu.getName());
		response.setYear(stu.getYear());
		return response;

	}

	// Assign students to class
	@Override
	public ClassAssignResponse AssignClass(String rollno, String roomno) {
		ClassAssignResponse response = new ClassAssignResponse();
		boolean flag = true;
		String message;
		Optional<ClassRooms> room = classRepo.FindByRoomNumber(roomno);
		Optional<Students> stu = stuRepo.FindByRoolNo(rollno);

		if (room.isPresent()) {
			ClassRooms classroom = room.get();
			if (stu.isPresent()) {
				Students student = stu.get();
				message = "Mr/Miss " + student.getName() + " Assigned to Room Number " + classroom.getRoomno()
						+ " Successfully";
				student.setClassroom(classroom);
				stuRepo.save(student);
			} else {
				flag = false;
				message = "No Student found";
			}
		} else {
			flag = false;
			message = "No class Exist";
		}
		response.setResponseMessage(message);
		response.setAssignStatus(flag);
		response.setClassname(roomno);
		response.setRollno(rollno);
		return response;

	}

	// Delete student
	@Override
	public StudentDeleteResponse deleteStudent(String rollno) {

		StudentDeleteResponse response = new StudentDeleteResponse();
		Optional<Students> student = stuRepo.FindByRoolNo(rollno);
		boolean flag = true;
		String message = null;
		if (student.isPresent()) {
			Students stu = student.get();
			message = "Mr/Miss " + stu.getName() + " from " + stu.getYear() + "Yr " + stu.getDept() + " Department "
					+ "Batch " + stu.getStartYear() + "-" + stu.getEndYear() + " Deleted Successfully";
			stuRepo.DeleteStudent(rollno);
			response.setDegree(stu.getDegree());
			response.setEndYear(stu.getEndYear());
			response.setName(stu.getName());
			response.setStartYear(stu.getStartYear());
			response.setYear(stu.getYear());
		} else {
			flag = false;
			message = "No Student Exist";
		}
		response.setMessage(message);
		response.setStatus(flag);
		return response;
	}

	// Edit the student details
	@Override
	public StudentEditResponse EditStudent(StudentDetailsEdit details, Long id) {

		StudentEditResponse response = new StudentEditResponse();
		boolean flag = true;
		String message = "Mr/Miss " + details.getName() + " Rool Number " + details.getRollno()
				+ " Updated Successfully";
		Optional<Students> student = stuRepo.findById(id);
		if (student.isPresent()) {
			Optional<ClassRooms> room = classRepo.FindByRoomNumber(details.getRoomno());
			if (room.isPresent()) {
				Students stu = student.get();
				stu.setClassroom(room.get());
				stu.setDegree(details.getDegree());
				stu.setDept(details.getDept());
				stu.setEndYear(details.getEndYear());
				stu.setGender(details.getGender());
				stu.setName(details.getName());
				stu.setRollno(details.getRollno());
				stu.setStartYear(details.getStartYear());
				stu.setYear(details.getYear());
				stuRepo.save(stu);
			} else {
				flag = false;
				message = "No Room Number Exist";
			}
		} else {
			flag = false;
			message = "No Student Exist";
		}

		response.setResponseMessage(message);
		response.setName(details.getName());
		response.setStatus(flag);
		return response;
	}

	// Find all students based on gender
	@Override
	public List<Students> FindAllStudentsByGender(boolean gender) {
		return stuRepo.findBygender(gender);
	}
	
	
    // Find all the students
	@Override
	public List<Students> FindAllStudents() {
		return stuRepo.findAll();
	}

	// Find the students based on year and batch
	@Override
	public List<Students> FindStudentByYearAndBatch(int year, String startyear, String endyear, boolean gender) {
		return stuRepo.FindByYearAndDepartment(year, startyear, endyear, gender);
	}

	// Find students by room no
	@Override
	public List<Students> FindyByRoomno(String room) {
		return stuRepo.findByRoomno(room);
	}

	//Clear all students from classroom
	@Override
	public ClassEditResponse ClearStudentsByRoomNo(String room) {

		ClassEditResponse response = new ClassEditResponse();
		boolean flag = true;
		String message = "Successfully Delete All the Students from Room Number " + room;
		List<Students> students = stuRepo.findByRoomno(room);
		if (classRepo.FindByRoomNumber(room).isPresent()) {
			for (Students stu : students) {
				stu.setClassroom(null);
			}
			stuRepo.saveAll(students);
		} else {
			flag = false;
			message = " No Room Number "+ room + " Exists";
		}
		response.setResponseMessage(message);
		response.setRoomno(room);
		response.setStatus(flag);
		return response;
	}

}
