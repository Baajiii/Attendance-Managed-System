package com.example.attendance.Response;

public class ClassResponse {

	private boolean classStatus;
	private String responseMessage;
	private int year;
	private String roomNo;

	public boolean isClassStatus() {
		return classStatus;
	}

	public void setClassStatus(boolean classStatus) {
		this.classStatus = classStatus;
	}

	public String getResponseMessage() {
		return responseMessage;
	}

	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getRoomNo() {
		return roomNo;
	}

	public void setRoomNo(String roomNo) {
		this.roomNo = roomNo;
	}

}
