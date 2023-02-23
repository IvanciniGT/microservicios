package com.curso.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "Tareas"
)
public class Task {

    public enum Status {
        PENDING, IN_PROGRES, COMPLETED
    }

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
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(nullable = false, updatable = false)
    private TaskList taskList;

}
