package com.example.attendance.Servic;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import com.example.attendance.Models.StudentsAttendance;
import com.example.attendance.Response.AttedanceResponse;

public interface AttendanceService {

	public AttedanceResponse MarkaAttendance(String rollno, boolean status);
	public List<StudentsAttendance> viewAttendance(int year,String startyear,String endyear, LocalDate date, boolean gender);
	public List<StudentsAttendance> viewAttendanceByRollno(String rollno);
	public String generateExcelFilename(LocalDate date, String startYear, String endYear,String gender);
    public ByteArrayOutputStream exportAttendanceToExcel(List<StudentsAttendance> attendanceList) throws IOException;
	public String generateExcelFilenameByRollno(String rollno);
	public AttedanceResponse EditAttendance(LocalDate date, String rollno, boolean status);

}
