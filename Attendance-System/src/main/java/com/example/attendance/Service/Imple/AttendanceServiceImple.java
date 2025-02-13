package com.example.attendance.Service.Imple;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendance.Models.Students;
import com.example.attendance.Models.StudentsAttendance;
import com.example.attendance.Repository.AttendanceRepository;
import com.example.attendance.Repository.StudentsRepository;
import com.example.attendance.Response.AttedanceResponse;
import com.example.attendance.Servic.AttendanceService;

@Service
public class AttendanceServiceImple implements AttendanceService {

	@Autowired
	private StudentsRepository stuRepo;

	@Autowired
	private AttendanceRepository attendRepo;

	// Mark attendance for students
	@Override
	public AttedanceResponse MarkaAttendance(String rollno, boolean status) {

		String message = null;
		boolean flag = true;
		LocalDate currentDate = LocalDate.now();
		AttedanceResponse response = new AttedanceResponse();
		Optional<StudentsAttendance> data = attendRepo.FindByDateAndRollno(currentDate, rollno);
		if (data.isEmpty()) {
			Optional<Students> stu = stuRepo.FindByRoolNo(rollno);
			try {
				Students student = stu.get();
				if (stu.isPresent()) {
					StudentsAttendance attendance = new StudentsAttendance();
					attendance.setClassno(student.getClassroom().getRoomno());
					attendance.setDate(currentDate);
					attendance.setDegree(student.getDegree());
					attendance.setEndYear(student.getEndYear());
					attendance.setRoolno(student.getRollno());
					attendance.setStartYear(student.getStartYear());
					attendance.setStatus(status);
					attendance.setStudentname(student.getName());
					attendance.setTeachername(student.getClassroom().getTeachername());
					attendance.setYear(student.getYear());
					attendance.setGender(student.getGender());
					attendRepo.save(attendance);
				}
				if (status) {
					message = "Mr/Miss " + student.getName() + " Marked as Present";
				} else {
					message = "Mr/Miss " + student.getName() + " Marked as Absent";
				}
				response.setName(student.getName());

			} catch (RuntimeException e) {

				message = "No Student Exist or No Class Assigned";
				flag = false;
				response.setName(rollno);
			}
		} else {
			message = "Already marked for " + rollno;
			flag = false;
			response.setName(rollno);
		}
		response.setResponseMessage(message);
		response.setStatus(flag);
		return response;
	}

	// Edit the attendance
	@Override
	public AttedanceResponse EditAttendance(LocalDate date, String rollno, boolean status) {

		String message;
		boolean flag = true;
		AttedanceResponse response = new AttedanceResponse();
		Optional<StudentsAttendance> stu = attendRepo.FindByDateAndRollno(date, rollno);
		if (stu.isPresent()) {
			StudentsAttendance detail = stu.get();
			detail.setStatus(status);
			attendRepo.save(detail);
		}
		if (status) {
			message = "Roll number " + rollno + " marked as present";
		} else {
			message = "Roll number " + rollno + " marked as absent";
		}

		response.setResponseMessage(message);
		response.setStatus(flag);
		return response;
	}

	// View attendace by year and batch
	@Override
	public List<StudentsAttendance> viewAttendance(int year, String startyear, String endyear, LocalDate date,
			boolean gender) {
		return attendRepo.FindByYear(year, startyear, endyear, date, gender);
	}

	// View attendance by rollno and batch
	@Override
	public List<StudentsAttendance> viewAttendanceByRollno(String rollno) {
		return attendRepo.FindByRollno(rollno);
	}

	// Method to download and export filtered data to Excel
	@Override
	public ByteArrayOutputStream exportAttendanceToExcel(List<StudentsAttendance> attendanceList) throws IOException {

		Workbook workbook = new XSSFWorkbook();
		Sheet sheet = workbook.createSheet("Attendance");

		// Header row
		Row headerRow = sheet.createRow(0);
		headerRow.createCell(0).setCellValue("Student Name");
		headerRow.createCell(1).setCellValue("Roll No");
		headerRow.createCell(2).setCellValue("Attendance Marked By");
		headerRow.createCell(3).setCellValue("Date");
		headerRow.createCell(4).setCellValue("Year");
		headerRow.createCell(5).setCellValue("Start Year");
		headerRow.createCell(6).setCellValue("End Year");
		headerRow.createCell(7).setCellValue("Status");
		headerRow.createCell(8).setCellValue("Room Number");
		headerRow.createCell(9).setCellValue("Degree");
		headerRow.createCell(10).setCellValue("Gender");

		// Fill rows with data
		int rowNum = 1;
		for (StudentsAttendance attendance : attendanceList) {
			Row row = sheet.createRow(rowNum++);
			row.createCell(0).setCellValue(attendance.getStudentname());
			row.createCell(1).setCellValue(attendance.getRollno());
			row.createCell(2).setCellValue(attendance.getTeachername());
			row.createCell(3).setCellValue(attendance.getDate().toString());
			row.createCell(4).setCellValue(attendance.getYear());
			row.createCell(5).setCellValue(attendance.getStartYear());
			row.createCell(6).setCellValue(attendance.getEndYear());
			row.createCell(7).setCellValue(attendance.isStatus() ? "Present" : "Absent");
			row.createCell(8).setCellValue(attendance.getClassno());
			row.createCell(9).setCellValue(attendance.getDegree());
			row.createCell(10).setCellValue(attendance.isGender() ? "Male" : "Female");
		}

		// Resize columns for better display
		for (int i = 0; i < 10; i++) {
			sheet.autoSizeColumn(i);
		}

		// Write the Excel file to a ByteArrayOutputStream
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		workbook.write(outputStream);
		workbook.close();

		return outputStream;

	}

	// Generate dynamic filename for the downloaded Excel file
	@Override
	public String generateExcelFilename(LocalDate date, String startYear, String endYear, String gender) {
		return "Attendance " + date + " (" + startYear + "-" + endYear + ") " + gender + ".xlsx";

	}

	// Generate dynamic filename for the downloaded Excel file
	@Override
	public String generateExcelFilenameByRollno(String rollno) {
		return "Attendance " + rollno + ".xlsx";
	}

}
