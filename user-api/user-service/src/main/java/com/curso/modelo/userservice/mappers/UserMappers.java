package com.curso.modelo.userservice.mappers;

import com.curso.models.User;
import com.curso.modelo.userservice.pojo.UserDataInput;

public interface UserMappers {

    static User updateUser(User usuario, UserDataInput userData){
        usuario.setName(userData.getName());
        usuario.setPassword(userData.getPassword());
        usuario.setEmail(userData.getEmail());
        usuario.setGenero(userData.getGenero());
        return usuario;
    }

}
