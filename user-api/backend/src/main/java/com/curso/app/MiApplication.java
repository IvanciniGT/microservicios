package com.curso.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan("com.curso")
@EnableJpaRepositories(basePackages={"com.curso"})
@EntityScan(basePackages={"com.curso"})
@SpringBootApplication
public class MiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MiApplication.class, args);
    }

}