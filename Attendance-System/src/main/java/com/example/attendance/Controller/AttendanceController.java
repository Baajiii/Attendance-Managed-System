package com.example.attendance.Controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.Models.StudentsAttendance;
import com.example.attendance.Response.AttedanceResponse;
import com.example.attendance.Response.DownloadResponse;
import com.example.attendance.Service.Imple.AttendanceServiceImple;

@RestController
@CrossOrigin
public class AttendanceController {

	@Autowired
	private AttendanceServiceImple Service;

	// Mark attendance
	@GetMapping("/mark/attendance/{rollno}/{status}")
	public AttedanceResponse MarkAttendance(@PathVariable("rollno") String rollno, @PathVariable boolean status) {
		return Service.MarkaAttendance(rollno, status);
	}

	//Edit the attendance
	@GetMapping("edit/attendance/{date}/{rollno}/{status}")
	public AttedanceResponse EditAttendance(@PathVariable("date") String strdate, @PathVariable("rollno") String rollno, @PathVariable("status") boolean status ) {
		LocalDate date = LocalDate.parse(strdate);
        return Service.EditAttendance(date, rollno, status);
	}
	
    //View attendance based on year for particular date	
	@GetMapping("/view/attendance/{year}/{startyear}/{endyear}/{date}/{gender}")
	public List<StudentsAttendance> viewAttendanceByYear(@PathVariable("year") int year,
			@PathVariable("startyear") String startyear, @PathVariable("endyear") String endyear,
			@PathVariable("date") String strdate,@PathVariable("gender") boolean gender) {

		LocalDate date = LocalDate.parse(strdate);
		return Service.viewAttendance(year, startyear, endyear, date, gender);
	}

	//View attendance for particular students
	@GetMapping("/view/attendance/{rollno}")
	public List<StudentsAttendance> viewAttendanceByRollno(@PathVariable("rollno") String rollno) {
		return Service.viewAttendanceByRollno(rollno);
	}

	// Endpoint to download the filtered attendance in Excel format based year and
	// batch
	@GetMapping("/download/{year}/{startyear}/{endyear}/{date}/{gender}")
	public ResponseEntity<?> downloadAttendance(@PathVariable("year") int year,
			@PathVariable("startyear") String startyear, @PathVariable("endyear") String endyear,
			@PathVariable("date") String strdate,@PathVariable("gender") boolean gender) throws IOException {

		LocalDate date = LocalDate.parse(strdate);
		List<StudentsAttendance> attendanceList = Service.viewAttendance(year, startyear, endyear, date, gender);
		if (attendanceList == null || attendanceList.isEmpty()) {
			// Return a message if no attendance data found
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
					new DownloadResponse("Attendance not found for " + year + " Yr " + startyear + "-" + endyear + " On this date " + date, HttpStatus.NOT_FOUND, false));
		}
		ByteArrayOutputStream excelFile = Service.exportAttendanceToExcel(attendanceList);
		String Gender = (gender) ? "Male" : "Female";
		String fileName = Service.generateExcelFilename(date, startyear, endyear, Gender);
		// Set headers and return the file as a response
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=" + fileName);
		return ResponseEntity.ok().headers(headers).body(excelFile.toByteArray());
	}

	// Endpoint to download the filtered attendance in Excel format based on rollno
	@GetMapping("/download/{rollno}")
	public ResponseEntity<?> downloadAttendanceByRoolno(@PathVariable("rollno") String rollno) throws IOException {

		List<StudentsAttendance> attendanceList = Service.viewAttendanceByRollno(rollno);
		if (attendanceList == null || attendanceList.isEmpty()) {
			// Return a message if no attendance data found
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
					new DownloadResponse("Attendance not found for Student: " + rollno, HttpStatus.NOT_FOUND, false));
		}
		ByteArrayOutputStream excelFile = Service.exportAttendanceToExcel(attendanceList);
		String fileName = Service.generateExcelFilenameByRollno(rollno);
		// Set headers and return the file as a response
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=" + fileName);
		return ResponseEntity.ok().headers(headers).body(excelFile.toByteArray());
	}
}
