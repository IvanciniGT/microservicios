package com.curso.userapi.mappers;

import es.curso.modelo.models.User;
import com.curso.userapi.pojo.UserDataInputV1;
import com.curso.userapi.pojo.UserDataOutputV1;

public interface UserMappers {

    static User toUser(UserDataInputV1 userData){
        return updateUser(new User(), userData);
    }

    static User updateUser(User usuario, UserDataInputV1 userData){
        usuario.setName(userData.getName());
        usuario.setPassword(userData.getPassword());
        usuario.setEmail(userData.getEmail());
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
