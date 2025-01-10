package com.example.attendance.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendance.Models.ClassRooms;

public interface ClassRepository extends JpaRepository<ClassRooms, Long> {

	@Query("SELECT f FROM ClassRooms f WHERE f.roomno = :roomno")
	Optional<ClassRooms> FindByRoomNumber(@Param("roomno") String roomno);

	@Query("SELECT f FROM ClassRooms f WHERE f.roomno = :roomno")
	ClassRooms FindClassByRoomNumber(@Param("roomno") String roomno);

	@Modifying
	@Transactional
	@Query("DELETE FROM ClassRooms f WHERE f.roomno = :roomno")
	void deleteByRoomNumber(@Param("roomno") String roomno);

}
