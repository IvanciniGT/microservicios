package com.curso.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "Usuarios"
)
public class User {

    public enum Genero {
        Hombre, Mujer, NoBinario, Desconocido
    }

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;

    @Getter
    @Setter
    @Column(length = 50, nullable = false, updatable = false)
    private String name;

    @Getter
    @Setter
    @Column(length = 100, nullable = false)
    private String email;

    @Getter
    @Setter
    @Column(length = 50, nullable = false)
    private String password;

    @Getter
    @Setter
    @Column(nullable = false)
    private Genero genero = Genero.Desconocido;

}
