package com.curso.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(
        name = "ListasDeTareas"
)
public class TaskList {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @Getter
    @Setter
    @Column(length = 50, nullable = false)
    private String name;

    @Getter
    @Setter
    @OneToMany(mappedBy="taskList", cascade = CascadeType.ALL)
    private List<Task> tasks;

    @Getter
    @Setter
    @ManyToMany(mappedBy = "taskLists")
    private List<UserWithTaskList> users;
}
