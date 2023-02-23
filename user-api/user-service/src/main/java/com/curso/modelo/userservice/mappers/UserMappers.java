package com.curso.modelo.userservice.mappers;

import com.curso.modelo.models.User;
import com.curso.modelo.userservice.pojo.UserDataInput;

public interface UserMappers {

    static User updateUser(User usuario, UserDataInput userData){
        usuario.setName(userData.getName());
        usuario.setPassword(userData.getPassword());
        usuario.setEmail(userData.getEmail());
        return usuario;
    }

}
