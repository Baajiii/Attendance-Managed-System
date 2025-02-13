package com.example.attendance.Servic;

import java.time.LocalDate;
import java.util.List;

import com.example.attendance.Models.CoOrdinator;
import com.example.attendance.Response.CoOrdinateResponse;
import com.example.attendance.Response.CoOrdinatorDashboardResponse;

public interface CoOrdinatorService {

	public CoOrdinateResponse AddCoOrdinator(CoOrdinator user);
	public void DeleteCoOrdinator(String name);
	public CoOrdinatorDashboardResponse dasboard(LocalDate date, boolean gender);
	public CoOrdinatorDashboardResponse Classdasboard(LocalDate date, int year, boolean gender, String degree);
	public CoOrdinatorDashboardResponse Roomdasboard(LocalDate date, String room);
	public CoOrdinatorDashboardResponse admindashboard(LocalDate date);
	public List<CoOrdinator> viewCoordinator();


}
