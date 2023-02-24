package com.curso.userapi.v1;

import com.curso.modelo.userservice.UserService;
import com.curso.userapi.v1.mappers.UserMappers;
import com.curso.models.User;
import com.curso.userapi.v1.pojo.UserDataInputV1;
import com.curso.userapi.v1.pojo.UserDataOutputV1;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/v1")
public class UserControllerV1 {

    private final UserService userService;

    public UserControllerV1(UserService userService){ // Inyección de dependencias basada en la Inversión de control
        this.userService=userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDataOutputV1>> getAllUsers(){
        List<User> usuarios = userService.getUsers();
        List<UserDataOutputV1> usersData = usuarios.stream().map(UserMappers::toUserDataV1)
                                                    .collect(Collectors.toList());
        return new ResponseEntity<>(usersData, HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<UserDataOutputV1> createUser(@RequestBody UserDataInputV1 userData){
        User usuario = userService.addUser(UserMappers.toUser(userData));
        return new ResponseEntity<>(UserMappers.toUserDataV1(usuario), HttpStatus.CREATED);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDataOutputV1> getUser(@PathVariable("id") Long userId) {
        Optional<User> usuario = userService.getUser(userId);
        if(usuario.isPresent())
            return new ResponseEntity<>(UserMappers.toUserDataV1(usuario.orElseThrow()), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<UserDataOutputV1> deleteUser(@PathVariable("id") Long userId) {
        Optional<User> usuario = userService.deleteUser(userId);
        if(usuario.isPresent()) {
            return new ResponseEntity<>(UserMappers.toUserDataV1(usuario.orElseThrow()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserDataOutputV1> updateUser(@PathVariable("id") Long userId, @RequestBody UserDataInputV1 userData) {
        Optional<User> usuario = userService.updateUser(userId,UserMappers.toUser(userData));
        if(usuario.isPresent()) {
            return new ResponseEntity<>(UserMappers.toUserDataV1(usuario.orElseThrow()), HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
