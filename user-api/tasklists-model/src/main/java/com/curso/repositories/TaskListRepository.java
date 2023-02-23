package com.curso.repositories;

import com.curso.models.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {

    List<TaskList> findByNameStartsWithIgnoreCase(String name);
    //StartsWith
    //EndsWith    + IgnoreCase
    //Containing
}
