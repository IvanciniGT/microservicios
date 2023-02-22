package com.curso.userapi;

import com.curso.userapi.models.User;
import com.curso.userapi.repositories.UserRepository;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.cucumber.spring.CucumberContextConfiguration;
import org.hamcrest.Matchers;
import org.hamcrest.collection.IsCollectionWithSize;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@Suite                               // Esta clase contiene una suite de pruebas de JUNIT
@IncludeEngines("cucumber")          // Esto es también de JUNIT. Le indica a JUNIT que estamos usando cucumber
@SelectClasspathResource("features") // Aqui indicamos donde estan los ficheros features
@CucumberContextConfiguration         //Pone en marcha cucumber

@SpringBootTest(classes = UserApiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT) // Este arranca el servidor de pruebas
@TestPropertySource( locations = "classpath:application-unittest.properties") // Que fichero de configuración de spring vamos a usar
@ExtendWith(SpringExtension.class)

//Este anotación hace que se genere un cliente de pruebas y que pueda conectarme a él de manera sencilla.
@AutoConfigureMockMvc
public class UserSteps {

    private final MockMvc cliente;
    private User user;
    private JSONObject objetoJson;
    private final UserRepository userRepository;
    private ResultActions respuesta;

    public UserSteps(UserRepository userRepository, MockMvc cliente){ // Inyección de dependencias de Spring
        this.userRepository=userRepository;
        this.cliente = cliente;
    }

    @Given("un objeto JSON")
    public void unJson() {
        objetoJson = new JSONObject();
    }

    @Given("el objeto JSON tiene el campo {string}, con valor {string}")
    public void conElCampoConValor(String campo,String valor) throws JSONException {
        objetoJson.put(campo, valor);
    }
    @Given("un usuario")
    public void unUsuario() {
        user = new User();
    }

    @Given("el usuario tiene por nombre {string}")
    public void conElNombre(String nombre) {
        user.setName(nombre);
    }
    @Given("el usuario tiene por password {string}")
    public void conElPassword(String password) {
        user.setPassword(password);
    }
    @Given("el usuario tiene por email {string}")
    public void conElEmail(String email) {
        user.setEmail(email);
    }

    @Given("el usuario guardado en la base de datos")
    public void guardarUsuario() {
        if (userRepository.findByName(user.getName()).size()==0)
            userRepository.save(user);
    }

    @When("invoco al servicio {string} con método {string}")
    public void invocoAlServicioConMetodo(String endpoint, String metodo) throws Exception {
        switch(metodo){
            case "GET":
                respuesta=this.cliente.perform( MockMvcRequestBuilders.get(endpoint) );
                break;
            case "DELETE":
                respuesta=this.cliente.perform( MockMvcRequestBuilders.delete(endpoint) );
                break;
            case "POST":
                respuesta=this.cliente.perform( MockMvcRequestBuilders.post(endpoint)
                                                                      .contentType("application/json")
                                                                      .content(objetoJson.toString())
                                              );
                break;
        }
    }

    @Then("se recibe una respuesta con código {string}")
    public void seRecibeUnaRespuestaConCodigo(String codigoRespuesta) throws Throwable {
        switch(codigoRespuesta){
            case "OK":
                respuesta.andExpect(status().isOk());
                break;
            case "NOT FOUND":
                respuesta.andExpect(status().isNotFound());
                break;
            case "CREATED":
                respuesta.andExpect(status().isCreated());
                break;
        }
    }


    @Then("la respuesta contiene un array JSON de longitud {int}")
    public void laRespuestaContieneUnArrayJSONDeLongitud(int longitud) throws Throwable {
        respuesta.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.*", IsCollectionWithSize.hasSize(longitud)));
    }

    @Then("la respuesta devuelve un JSON")
    public void laRespuestaDevuelveUnJSON() throws Throwable {
        respuesta.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }


    @Then("el elemento en la posición {int}, debe tener por {string}: {string}")
    public void elElementoEnLaPosiciónPosicionDebeTenerPorNombre(int posicion, String campo, String valor) throws Exception {
        respuesta.andExpect(jsonPath("$["+posicion+"]."+campo             , Matchers.is(valor)));
                                                //"$[0].name"
    }
    @Then("que debe tener por {string}: {string}")
    public void queDebeTenerPor(String campo, String valor) throws Exception {
        respuesta.andExpect(jsonPath("$."+campo             , Matchers.is(valor)));
    }












    @Then("^la respuesta contiene un JSON con el valor \"([^\"]*)\"$")
    public void laRespuestaContieneUnJSONConElValor(String arg0) throws Throwable {
    }


    @When("^envío un JSON con$")
    public void envioUnJSONCon() {
    }

    @When("^el JSON contiene el campo \"([^\"]*)\" con el valor \"([^\"]*)\"$")
    public void elJSONContieneElCampoConElValor(String arg0, String arg1) throws Throwable {
    }


}
