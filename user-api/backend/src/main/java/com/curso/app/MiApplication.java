package app.curso.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@ComponentScan("com.curso")
@EnableJpaRepositories(basePackages={"com.curso"})
@EntityScan(basePackages={"com.curso"})
@SpringBootApplication
public class MiApplication {

    public static void main(String[] args) {
        SpringApplication.run(MiApplication.class, args);
    }

}
