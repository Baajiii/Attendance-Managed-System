package com.example.attendance.Service.Imple;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendance.Models.CoOrdinator;
import com.example.attendance.Models.StudentsAttendance;
import com.example.attendance.Repository.AttendanceRepository;
import com.example.attendance.Repository.CoOrdinatorRepository;
import com.example.attendance.Response.CoOrdinateResponse;
import com.example.attendance.Response.CoOrdinatorDashboardResponse;
import com.example.attendance.Servic.CoOrdinatorService;

@Service
public class CoOrdinatorServiceImple implements CoOrdinatorService {

	@Autowired
	private CoOrdinatorRepository repo;

	@Autowired
	private AttendanceRepository attendRepo;

	@Override
	public CoOrdinateResponse AddCoOrdinator(CoOrdinator user) {

		CoOrdinateResponse response = new CoOrdinateResponse();
		boolean flag = true;
		String gender = user.isRole() ? "Boys" : "Girls";
		String message = " Mr/Miss " + user.getName() + " Successfully Added as Co-Ordinator for " + gender;
		Optional<CoOrdinator> co = repo.FindByName(user.getName());
		if (co.isEmpty()) {
			CoOrdinator User = new CoOrdinator();
			User.setName(user.getName());
			User.setPassword(DigestUtils.sha256Hex(user.getPassword()));
			User.setRole(user.isRole());
			repo.save(User);
		} else {
			gender = co.get().isRole() ? "Boys" : "Girls";
			flag = false;
			message = "User already Present";
		}
		response.setMessage(message);
		response.setRole(gender);
		response.setStatus(flag);
		return response;
	}

	// Delete the Co-ordinator
	@Override
	public void DeleteCoOrdinator(String name) {

		Optional<CoOrdinator> co = repo.FindByName(name);
		if (co.isPresent()) {
			repo.DeleteCoOrdinator(name);
		}
	}

	// Co-Ordinator Dashboard
	@Override
	public CoOrdinatorDashboardResponse dasboard(LocalDate date, boolean gender) {

		CoOrdinatorDashboardResponse response = new CoOrdinatorDashboardResponse();

		List<StudentsAttendance> attendancelist = attendRepo.FindByDateAndGender(date, gender);

		List<StudentsAttendance> OverAllPresent = attendancelist.stream().filter(attendance -> attendance.isStatus())
				.collect(Collectors.toList());

		List<StudentsAttendance> OverAllAbsent = attendancelist.stream().filter(attendance -> !attendance.isStatus())
				.collect(Collectors.toList());
		response.setStudentCount(attendancelist.size());
		response.setPresent(OverAllPresent.size());
		response.setAbsent(OverAllAbsent.size());
		return response;
	}

	// Co-Ordinator class dasboard
	@Override
	public CoOrdinatorDashboardResponse Classdasboard(LocalDate date, int year) {
		CoOrdinatorDashboardResponse response = new CoOrdinatorDashboardResponse();

		List<StudentsAttendance> attendancelist = attendRepo.FindByDateAndClass(date, year);
		List<StudentsAttendance> OverAllPresent = attendancelist.stream().filter(attendance -> attendance.isStatus())
				.collect(Collectors.toList());

		List<StudentsAttendance> OverAllAbsent = attendancelist.stream().filter(attendance -> !attendance.isStatus())
				.collect(Collectors.toList());
		response.setStudentCount(attendancelist.size());
		response.setPresent(OverAllPresent.size());
		response.setAbsent(OverAllAbsent.size());
		return response;
	}

	@Override
	public CoOrdinatorDashboardResponse Roomdasboard(LocalDate date, String room) {
		CoOrdinatorDashboardResponse response = new CoOrdinatorDashboardResponse();
		List<StudentsAttendance> attendancelist = attendRepo.FindByDateAndYear(date, room);
		List<StudentsAttendance> OverAllPresent = attendancelist.stream().filter(attendance -> attendance.isStatus())
				.collect(Collectors.toList());
		List<StudentsAttendance> OverAllAbsent = attendancelist.stream().filter(attendance -> !attendance.isStatus())
				.collect(Collectors.toList());
		response.setStudentCount(attendancelist.size());
		response.setPresent(OverAllPresent.size());
		response.setAbsent(OverAllAbsent.size());
		return response;

	}

}
