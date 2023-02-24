package com.curso.userapi.v1.pojo;

import com.curso.models.User;
import lombok.Getter;
import lombok.Setter;

public class UserDataInputV1 {

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
