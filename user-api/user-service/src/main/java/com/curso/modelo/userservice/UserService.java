package com.curso.modelo.userservice;

import com.curso.models.User;
import com.curso.repositories.UserRepository;
import com.curso.modelo.userservice.mappers.UserMappers;
import com.curso.modelo.userservice.pojo.UserDataInput;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){ // Inyección de dependencias basada en la Inversión de control
        this.userRepository=userRepository;
    }

    public User addUser(UserDataInput userData){
        User usuario = new User();
        UserMappers.updateUser(usuario,userData);// AQUI ES DONDE PUEDO MANDAR UN EMAIL O LOS QUE NECESITE
        return userRepository.save(usuario);
    }

    public Optional<User> getUser(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> deleteUser(Long userId) {
        Optional<User> usuario =  userRepository.findById(userId);
        if (usuario.isPresent()){
            userRepository.delete(usuario.orElseThrow());
            // Mandar un email...
            // Anotarlo en un registro de auditoria
        }
        return usuario;
    }

    public Optional<User> updateUser(Long userId, UserDataInput userData) {
        Optional<User> optionalUsuario =  userRepository.findById(userId);
        if (optionalUsuario.isPresent()) {
            User usuario=optionalUsuario.orElseThrow();
            UserMappers.updateUser(usuario,userData);// AQUI ES DONDE PUEDO MANDAR UN EMAIL O LOS QUE NECESITE
            userRepository.save(usuario);
        }
        return optionalUsuario;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }
}
