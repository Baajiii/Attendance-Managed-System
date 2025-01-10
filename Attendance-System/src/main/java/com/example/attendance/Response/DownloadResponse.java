package com.example.attendance.Response;

import org.springframework.http.HttpStatus;

public class DownloadResponse {

	private String message;
	private HttpStatus status;
	private boolean flag;
	
	
	public DownloadResponse(String message, HttpStatus status, boolean flag) {
		this.message = message;
		this.status = status;
		this.flag = flag;
	}
	
	
	public boolean isFlag() {
		return flag;
	}


	public void setFlag(boolean flag) {
		this.flag = flag;
	}


	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	
	
}
