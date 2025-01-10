package com.example.attendance.Servic;

import com.example.attendance.Details.CoOrdinatorDetails;
import com.example.attendance.Details.LoginDetails;
import com.example.attendance.Response.LoginResponse;

public interface LoginServices {

	public LoginResponse ClassLogin(LoginDetails details);
	public LoginResponse CoOrdinatorLogin(CoOrdinatorDetails details);
}
