package com.curso.repositories;

import com.curso.models.UserWithTaskList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserWithTaskList, Long> {

}
