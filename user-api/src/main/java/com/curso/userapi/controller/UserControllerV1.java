package com.curso.userapi.controller;

import com.curso.userapi.mappers.UserMappers;
import com.curso.userapi.models.User;
import com.curso.userapi.pojo.UserDataInputV1;
import com.curso.userapi.pojo.UserDataOutputV1;
import com.curso.userapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/v1")
public class UserControllerV1 {

    private final UserRepository userRepository;

    public UserControllerV1(UserRepository userRepository){ // Inyección de dependencias basada en la Inversión de control
        this.userRepository=userRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDataOutputV1>> getAllUsers(){
        List<User> usuarios = userRepository.findAll();
        List<UserDataOutputV1> usersData = usuarios.stream().map(UserMappers::toUserDataV1)
                                                    .collect(Collectors.toList());
        return new ResponseEntity<>(usersData, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<UserDataOutputV1> createUser(@RequestBody UserDataInputV1 userData){
        User usuario = userRepository.save(UserMappers.toUser(userData));
        return new ResponseEntity<>(UserMappers.toUserDataV1(usuario), HttpStatus.CREATED);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDataOutputV1> getUser(@PathVariable("id") Long userId) {
        Optional<User> usuario = userRepository.findById(userId);
        if(usuario.isPresent())
            return new ResponseEntity<>(UserMappers.toUserDataV1(usuario.orElseThrow()), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<UserDataOutputV1> deleteUser(@PathVariable("id") Long userId) {
        Optional<User> usuario = userRepository.findById(userId);
        if(usuario.isPresent()) {
            userRepository.deleteById(userId);
            return new ResponseEntity<>(UserMappers.toUserDataV1(usuario.orElseThrow()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDataOutputV1> updateUser(@PathVariable("id") Long userId, @RequestBody UserDataInputV1 userData) {
        Optional<User> usuario = userRepository.findById(userId);
        if(usuario.isPresent()) {
            User modificado= userRepository.save(UserMappers.updateUser(usuario.orElseThrow(), userData));
            return new ResponseEntity<>(UserMappers.toUserDataV1(modificado), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
