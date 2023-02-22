package es.curso.modelo.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "Usuarios"
)
public class User {

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
    @Column(length = 100, nullable = false)
    private String email;

    @Getter
    @Setter
    @Column(length = 50, nullable = false)
    private String password;

}
