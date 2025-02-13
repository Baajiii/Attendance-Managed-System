package com.example.attendance.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendance.Models.Students;

@Repository
public interface StudentsRepository extends JpaRepository<Students, Long> {

	@Query("SELECT f FROM Students f WHERE f.rollno = :rollno")
	Optional<Students> FindByRoolNo(@Param("rollno") String rollno);

	@Query("SELECT f FROM Students f WHERE f.rollno = :rollno AND f.year = :year")
	Optional<Students> FindByRoolNoAndYear(@Param("rollno") String rollno, @Param("year") int year);

	@Modifying
	@Transactional
	@Query("UPDATE Students s SET s.classroom = NULL WHERE s.classroom.id = :classroomId")
	void clearClassroomId(@Param("classroomId") Long classroomId);

	@Modifying
	@Transactional
	@Query("DELETE FROM Students f WHERE f.rollno = :rollno")
	void DeleteStudent(@Param("rollno") String rollno);

	@Query("SELECT f FROM Students f WHERE f.year = :year AND f.startYear = :startYear AND f.endYear = :endYear AND f.gender = :gender")
	List<Students> FindByYearAndDepartment(@Param("year") int year, @Param("startYear") String startYear,
			@Param("endYear") String endYear, @Param("gender") boolean gender);

	@Query("SELECT s FROM Students s WHERE s.classroom.roomno = :roomno")
	List<Students> findByRoomno(String roomno);
	
	@Query("SELECT s FROM Students s WHERE s.gender = :gender")
	List<Students> findBygender(boolean gender);

}
