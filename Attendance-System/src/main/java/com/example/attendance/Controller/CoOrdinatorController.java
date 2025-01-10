package com.example.attendance.Controller;

import java.time.LocalDate;

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

	// Delete the Co-ordinator
	@GetMapping("/delete/coordinator/{name}")
	public void DeleteCoOrdinator(@PathVariable("name") String name) {
		Service.DeleteCoOrdinator(name);
	}

	// Admin dashboard
	@GetMapping("/admin/dashboard/{date}/{gender}")
	public CoOrdinatorDashboardResponse dashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable("gender") boolean gender) {
		return Service.dasboard(date, gender);
	}

	// Admin portal year dashboard
	@GetMapping("/admin/year/dashboard/{date}/{year}")
	public CoOrdinatorDashboardResponse classDashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable("year") int year) {
		return Service.Classdasboard(date, year);
	}

	// Admin portal room dashboard
	@GetMapping("/admin/room/dashboard/{date}/{room}")
	public CoOrdinatorDashboardResponse YearDashboard(
			@PathVariable("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date,
			@PathVariable("room") String room) {
		return Service.Roomdasboard(date, room);
	}

}
