package com.example.attendance.Response;

public class ClassAssignResponse {

	private boolean assignStatus;
	private String responseMessage;
	private String classname;
	private String rollno;
	
	public boolean isAssignStatus() {
		return assignStatus;
	}
	public void setAssignStatus(boolean assignStatus) {
		this.assignStatus = assignStatus;
	}
	public String getResponseMessage() {
		return responseMessage;
	}
	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}
	public String getClassname() {
		return classname;
	}
	public void setClassname(String classname) {
		this.classname = classname;
	}
	public String getRollno() {
		return rollno;
	}
	public void setRollno(String rollno) {
		this.rollno = rollno;
	}
	
	
	
}
