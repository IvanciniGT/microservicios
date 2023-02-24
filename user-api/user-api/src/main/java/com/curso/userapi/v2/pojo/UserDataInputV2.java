package com.curso.userapi.v2.pojo;

import com.curso.models.User;
import lombok.Getter;
import lombok.Setter;

public class UserDataInputV2 {

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
