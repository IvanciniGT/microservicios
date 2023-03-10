package com.curso.modelo.userservice.pojo;

import com.curso.models.User;
import lombok.Getter;
import lombok.Setter;

public class UserDataInput {

    @Getter
    @Setter
    private String name;

    @Getter
    @Setter
    private String email;

    @Getter
    @Setter
    private String password;

    @Getter
    @Setter
    private User.Genero genero;

}
