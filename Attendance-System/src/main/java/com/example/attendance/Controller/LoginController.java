package com.example.attendance.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.attendance.Details.CoOrdinatorDetails;
import com.example.attendance.Details.LoginDetails;
import com.example.attendance.Response.LoginResponse;
import com.example.attendance.Servic.LoginServices;

@RestController
@CrossOrigin
public class LoginController {

	@Autowired
	private LoginServices service;
	
	//ClassRoom login
	@PostMapping("/room/login")
	public LoginResponse RoomLogin(@RequestBody LoginDetails details) {
		return service.ClassLogin(details);
	}
	
	//Co-Ordinator login
	@PostMapping("/coordinator/login")
	public LoginResponse CoOrdinatorLogin(@RequestBody CoOrdinatorDetails details) {
		return service.CoOrdinatorLogin(details);
	}
	
	
	
}
