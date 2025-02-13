package com.example.attendance.Servic;

import java.util.List;

import com.example.attendance.Details.ClassWithStudentCount;
import com.example.attendance.Models.ClassRooms;
import com.example.attendance.Response.ClassEditResponse;
import com.example.attendance.Response.ClassResponse;
import com.example.attendance.Response.RoomDeleteResponse;
import com.example.attendance.Response.TeacherResponse;

public interface ClassServices {

	public ClassResponse AddClass(ClassRooms addRooms);
	boolean RoomNumberAlreadyExsist(String roomno);
	public TeacherResponse AssignTeacher(ClassRooms assignteacher);
	public RoomDeleteResponse DeleteRoom(String roomno);
	public ClassEditResponse EditClass(ClassRooms details, Long id);
	public List<ClassRooms> FindAllClass();
	public List<ClassWithStudentCount> FindAllClassWithStu();
}
