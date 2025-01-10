package com.example.attendance.Service.Imple;

import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.attendance.Details.CoOrdinatorDetails;
import com.example.attendance.Details.LoginDetails;
import com.example.attendance.Models.ClassRooms;
import com.example.attendance.Models.CoOrdinator;
import com.example.attendance.Repository.ClassRepository;
import com.example.attendance.Repository.CoOrdinatorRepository;
import com.example.attendance.Response.LoginResponse;
import com.example.attendance.Servic.LoginServices;

@Service
public class LoginServiceImple implements LoginServices {

	@Autowired
	private ClassRepository classRepo;

	@Autowired
	private CoOrdinatorRepository coRepo;

	// Login for Class Room
	@Override
	public LoginResponse ClassLogin(LoginDetails details) {

		LoginResponse response = new LoginResponse();
		boolean flag = true;
		String message = "Login Successfully";
		String hashedPassword = DigestUtils.sha256Hex(details.getPassword());
		Optional<ClassRooms> room = classRepo.FindByRoomNumber(details.getName());
		if (room.isPresent()) {
			ClassRooms hall = room.get();
			if (!hashedPassword.equals(hall.getPassword())) {
				flag = false;
				message = "Incorrect Password";
			}
		} else {
			flag = false;
			message = "No Class Room Present";
		}
		response.setMessage(message);
		response.setName(details.getName());
		response.setStatus(flag);
		return response;
	}

	// Login for Co-Ordinator
	@Override
	public LoginResponse CoOrdinatorLogin(CoOrdinatorDetails details) {
		LoginResponse response = new LoginResponse();
		boolean flag = true;
		String message = "Login Successfully";
		boolean role = details.isRole();
		String hashedPassword = DigestUtils.sha256Hex(details.getPassword());
		Optional<CoOrdinator> user = coRepo.FindByName(details.getName());
		if (user.isPresent()) {
			CoOrdinator co = user.get();
			if (!hashedPassword.equals(co.getPassword())) {
				flag = false;
				message = "Incorrect Password";
			}
		} else {
			flag = false;
			message = "No User Found";
		}
		response.setMessage(message);
		response.setName(details.getName());
		response.setStatus(flag);
		response.setRole(role);
		return response;
	}

}
