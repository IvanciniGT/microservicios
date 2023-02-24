package com.curso.userapi.v1.mappers;

import com.curso.models.User;
import com.curso.modelo.userservice.pojo.UserDataInput;
import com.curso.userapi.v1.pojo.UserDataInputV1;
import com.curso.userapi.v1.pojo.UserDataOutputV1;

public interface UserMappers {

    static UserDataInput toUser(UserDataInputV1 userData){
        UserDataInput usuario = new UserDataInput();
        usuario.setName(userData.getName());
        usuario.setPassword(userData.getPassword());
        usuario.setEmail(userData.getEmail());
        usuario.setGenero(User.Genero.Desconocido);
        return usuario;

    }

    static UserDataOutputV1 toUserDataV1(User usuario){
        UserDataOutputV1 userData=new UserDataOutputV1();
        userData.setName(usuario.getName());
        userData.setId(usuario.getId());
        userData.setPassword(usuario.getPassword());
        userData.setEmail(usuario.getEmail());
        return userData;
    }

}
