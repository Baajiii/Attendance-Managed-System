package com.example.attendance.Servic;

import java.time.LocalDate;

import com.example.attendance.Models.CoOrdinator;
import com.example.attendance.Response.CoOrdinateResponse;
import com.example.attendance.Response.CoOrdinatorDashboardResponse;

public interface CoOrdinatorService {

	public CoOrdinateResponse AddCoOrdinator(CoOrdinator user);
	public void DeleteCoOrdinator(String name);
	public CoOrdinatorDashboardResponse dasboard(LocalDate date, boolean gender);
	public CoOrdinatorDashboardResponse Classdasboard(LocalDate date, int year);
	public CoOrdinatorDashboardResponse Roomdasboard(LocalDate date, String room);


}
