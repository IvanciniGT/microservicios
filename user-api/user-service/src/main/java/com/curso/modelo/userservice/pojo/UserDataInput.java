package com.curso.modelo.userservice.pojo;

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

}
