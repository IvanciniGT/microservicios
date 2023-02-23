package com.curso.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class UserWithTaskList extends User{

    @Getter
    @Setter
    @ManyToMany
    @JoinTable(
            name="UsuariosListasDeTareas",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "tasklist_id")
    )
    private List<TaskList> taskLists;
}
