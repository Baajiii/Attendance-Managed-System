package com.example.attendance.Service.Imple;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendance.Details.ClassWithStudentCount;
import com.example.attendance.Models.ClassRooms;
import com.example.attendance.Repository.ClassRepository;
import com.example.attendance.Repository.StudentsRepository;
import com.example.attendance.Response.ClassEditResponse;
import com.example.attendance.Response.ClassResponse;
import com.example.attendance.Response.RoomDeleteResponse;
import com.example.attendance.Response.TeacherResponse;
import com.example.attendance.Servic.ClassServices;

@Service
public class ClassServicesImple implements ClassServices {

	@Autowired
	private ClassRepository classRepo;

	@Autowired
	private StudentsRepository stuRepo;

	// Add new class
	@Override
	public ClassResponse AddClass(ClassRooms addRooms) {

//		ClassRooms newRoom = new ClassRooms();
		ClassResponse classresponse = new ClassResponse();
		boolean flag = true;
		String message = "New Class Added for " + addRooms.getYear() + "yr " + addRooms.getDegree() + " Successfully";
		if (RoomNumberAlreadyExsist(addRooms.getRoomno())) {
			message = "Room number is Already Present for " + addRooms.getYear() + "Yr "
					+ " Class try with Another Class Name";
			flag = false;
		}

		if (flag) {
			String hashedPassword = DigestUtils.sha256Hex(addRooms.getPassword());
			addRooms.setPassword(hashedPassword);
//			newRoom.setRoomno(addRooms.getRoomno());
//			newRoom.setYear(addRooms.getYear());
//			newRoom.setDegree(addRooms.getDegree());
//			newRoom.setUsername(addRooms.getUsername());
			classRepo.save(addRooms);
		}

		classresponse.setClassStatus(flag);
		classresponse.setResponseMessage(message);
		classresponse.setRoomNo(addRooms.getRoomno());
		classresponse.setYear(addRooms.getYear());
		return classresponse;

	}

	// To find room number is already allocated for year
	@Override
	public boolean RoomNumberAlreadyExsist(String roomno) {

		Optional<ClassRooms> room = classRepo.FindByRoomNumber(roomno);
		return (room.isPresent()) ? true : false;	
	}

	// To assign teacher to the class
	@Override
	public TeacherResponse AssignTeacher(ClassRooms assignteacher) {
		TeacherResponse response = new TeacherResponse();
		Optional<ClassRooms> op = classRepo.FindByRoomNumber(assignteacher.getRoomno());
		boolean flag = true;
		String message = "Mr/Miss: " + assignteacher.getTeachername() + " is Assigned to Room Number "
				+ assignteacher.getRoomno() + " " + assignteacher.getYear() + "yr " + assignteacher.getDegree()
				+ " Successfully";
		if (op.isEmpty()) {
			message = "No Class Allocated to this Room Number " + assignteacher.getRoomno();
			flag = false;
		} else {
			ClassRooms room = op.get();
			room.setTeachername(assignteacher.getTeachername());
			classRepo.save(room);
		}
		response.setStatus(flag);
		response.setResponseMessage(message);
		response.setDegree(assignteacher.getDegree());
		response.setTeachername(assignteacher.getTeachername());
		response.setYear(assignteacher.getYear());

		return response;
	}

	// Delete the class room and unassigned the students
	@Override
	public RoomDeleteResponse DeleteRoom(String roomno) {

		RoomDeleteResponse response = new RoomDeleteResponse();
		boolean flag = true;
		String message = "Room Number " + roomno + " Deleted Sucessfully And Students Assigned to this Room No: " + roomno
				+ " are Unassigned";
		Optional<ClassRooms> room = classRepo.FindByRoomNumber(roomno);
		if (room.isPresent()) {
			Long id = room.get().getId();
			stuRepo.clearClassroomId(id);
			classRepo.deleteByRoomNumber(roomno);
		} else {
			flag = false;
			message = "Room Number " + roomno + " Not Present";
		}
		response.setResponseMessage(message);
		response.setRoomno(roomno);
		response.setStatus(flag);
		return response;
	}

	//Edit the Class Room details
	@Override
	public ClassEditResponse EditClass(ClassRooms details, Long id) {
		
		ClassEditResponse response = new ClassEditResponse();
		boolean flag = true;
		String message = "Room Number " + details.getRoomno() + " Updated Successfully";
		Optional<ClassRooms> room = classRepo.findById(id);
		if(room.isPresent()) {
			ClassRooms hall = room.get();
			hall.setDegree(details.getDegree());
			hall.setPassword(DigestUtils.sha256Hex(details.getPassword()));
			hall.setRoomno(details.getRoomno());
			hall.setStudents(details.getStudents());			
			hall.setTeachername(details.getTeachername());
			hall.setYear(details.getYear());
			classRepo.save(hall);
		}
		else {
			flag = false;
			message = " No Room Number Exist";
		}
		
		response.setResponseMessage(message);
		response.setRoomno(details.getRoomno());
		response.setStatus(flag);
		return response;
	}

	//Find All the classrooms
	@Override
	public List<ClassRooms> FindAllClass() {
		
		return classRepo.findAll();
	}

	
	// Find all the classRooms with student count
	@Override
	public List<ClassWithStudentCount> FindAllClassWithStu() {
		
		 List<ClassRooms> room = classRepo.findAll();
		 List<ClassWithStudentCount> studentcount = new ArrayList<ClassWithStudentCount>();
		 for(ClassRooms r  : room) {
			 ClassWithStudentCount count = new ClassWithStudentCount();
			 count.setId(r.getId());
			 count.setDegree(r.getDegree());
			 count.setRoomno(r.getRoomno());
			 count.setStaff(r.getTeachername());
			 count.setYear(r.getYear());
			 count.setStudentcount(r.getStudents().size());
			 count.setPassword(r.getPassword());
			 studentcount.add(count);
		 }
		 return studentcount;
		 
		 
	}

	
}
