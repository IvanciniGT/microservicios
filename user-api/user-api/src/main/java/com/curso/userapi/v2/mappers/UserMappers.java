package com.curso.userapi.v2.mappers;

import com.curso.modelo.userservice.pojo.UserDataInput;
import com.curso.models.User;
import com.curso.userapi.v2.pojo.UserDataInputV2;
import com.curso.userapi.v2.pojo.UserDataOutputV2;

public interface UserMappers {

    static UserDataInput toUser(UserDataInputV2 userData){
        UserDataInput usuario = new UserDataInput();
        usuario.setName(userData.getName());
        usuario.setPassword(userData.getPassword());
        usuario.setEmail(userData.getEmail());
        usuario.setGenero(userData.getGenero());
        return usuario;

    }

    static UserDataOutputV2 toUserDataV1(User usuario){
        UserDataOutputV2 userData=new UserDataOutputV2();
        userData.setName(usuario.getName());
        userData.setId(usuario.getId());
        userData.setPassword(usuario.getPassword());
        userData.setEmail(usuario.getEmail());
        userData.setGenero(usuario.getGenero());
        return userData;
    }

}
