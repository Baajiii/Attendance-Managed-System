package com.example.attendance.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.attendance.Models.StudentsAttendance;

@Repository
public interface AttendanceRepository extends JpaRepository<StudentsAttendance, Long> {

	@Query("SELECT f FROM StudentsAttendance f WHERE f.year = :year AND f.startYear = :startYear AND f.endYear = :endYear AND f.date = :date AND f.gender = :gender")
	List<StudentsAttendance> FindByYear(@Param("year") int year,@Param("startYear") String startYear,@Param("endYear") String endYear,@Param("date") LocalDate date,@Param("gender") boolean gender);

	@Query("SELECT f FROM StudentsAttendance f WHERE f.rollno = :rollno")
	List<StudentsAttendance> FindByRollno(@Param("rollno") String rollno);
	
    @Query(value = "SELECT f FROM StudentsAttendance f WHERE f.date = :date AND f.gender = :gender")
	List<StudentsAttendance> FindByDateAndGender(@Param("date") LocalDate date,@Param("gender") boolean gender);
	
    @Query(value = "SELECT f FROM StudentsAttendance f WHERE f.date = :date AND f.year = :year")
	List<StudentsAttendance> FindByDateAndClass(@Param("date") LocalDate date,@Param("year") int year);
    
    @Query(value = "SELECT f FROM StudentsAttendance f WHERE f.date = :date AND f.classno = :room")
	List<StudentsAttendance> FindByDateAndYear(@Param("date") LocalDate date,@Param("room") String room);
	
}
