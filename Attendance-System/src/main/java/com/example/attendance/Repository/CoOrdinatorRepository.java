package com.example.attendance.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.attendance.Models.CoOrdinator;

public interface CoOrdinatorRepository extends JpaRepository<CoOrdinator, Integer> {

	@Query("SELECT f FROM CoOrdinator f WHERE f.name = :name")
	 Optional<CoOrdinator> FindByName(@Param("name") String name);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM CoOrdinator f WHERE f.name = :name")
	void DeleteCoOrdinator(@Param("name") String name);
	
	
}
