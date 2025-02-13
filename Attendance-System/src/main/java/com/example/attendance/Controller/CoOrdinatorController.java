package com.example.attendance.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.Models.CoOrdinator;
import com.example.attendance.Response.CoOrdinateResponse;
import com.example.attendance.Response.CoOrdinatorDashboardResponse;
import com.example.attendance.Servic.CoOrdinatorService;

@RestController
@CrossOrigin
public class CoOrdinatorController {

	@Autowired
	private CoOrdinatorService Service;

	// Add new Co-Ordinator
	@PostMapping("/add/new/coordinator")
	public CoOrdinateResponse AddNewCoOrdinator(@RequestBody CoOrdinator details) {
		return Service.AddCoOrdinator(details);
	}
	
	// Find all Co-ordinator
	@GetMapping("/view/coordinator")
	public List<CoOrdinator> ViewCoOrdinator() {
		return Service.viewCoordinator();
	}

	// Delete the Co-ordinator
	@GetMapping("/delete/coordinator/{name}")
	public void DeleteCoOrdinator(@PathVariable("name") String name) {
		Service.DeleteCoOrdinator(name);
	}

	// Admin home dashboard
	@GetMapping("/admin/dashboard/{date}")
	public CoOrdinatorDashboardResponse Admindashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		return Service.admindashboard(date);
	}

	// Co-ordinator home dashboard
	@GetMapping("/admin/dashboard/{date}/{gender}")
	public CoOrdinatorDashboardResponse dashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable("gender") boolean gender) {
		return Service.dasboard(date, gender);
	}

	// Co-ordinator portal year dashboard
	@GetMapping("/admin/year/dashboard/{date}/{year}/{gender}/{degree}")
	public CoOrdinatorDashboardResponse classDashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable("year") int year, @PathVariable("gender") boolean gender,
			@PathVariable("degree") String degree) {
		return Service.Classdasboard(date, year, gender, degree);
	}

	// Co-ordinator portal room dashboard//////////
	@GetMapping("/admin/room/dashboard/{date}/{room}")
	public CoOrdinatorDashboardResponse YearDashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable("room") String room) {
		return Service.Roomdasboard(date, room);
	}

}
