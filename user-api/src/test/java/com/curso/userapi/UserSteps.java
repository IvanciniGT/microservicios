package com.curso.userapi;

public class UserSteps {
    @Given("^un usuario con los datos$")
    public void unUsuarioConLosDatos() {
        // Dar de alta un usuario en el repositorio
    }

    @When("^invoco al servicio \"([^\"]*)\" con método \"([^\"]*)\"$")
    public void invocoAlServicioConMetodo(String arg0, String arg1) throws Throwable {
    }

    @Then("^se recibe una respuesta con código \"([^\"]*)\"$")
    public void seRecibeUnaRespuestaConCodigo(String arg0) throws Throwable {
    }

    @Then("^la respuesta contiene un array JSON de longitud \"([^\"]*)\"$")
    public void laRespuestaContieneUnArrayJSONDeLongitud(String arg0) throws Throwable {
    }

    @Then("^la respuesta contiene un JSON con el valor \"([^\"]*)\"$")
    public void laRespuestaContieneUnJSONConElValor(String arg0) throws Throwable {
    }

    @Then("^el elemento en la posición \"([^\"]*)\", debe tener por \"([^\"]*)\": \"([^\"]*)\"$")
    public void elElementoEnLaPosicionDebeTenerPor(String arg0, String arg1, String arg2) throws Throwable {
    }

    @When("^envío un JSON con$")
    public void envioUnJSONCon() {
    }

    @When("^el JSON contiene el campo \"([^\"]*)\" con el valor \"([^\"]*)\"$")
    public void elJSONContieneElCampoConElValor(String arg0, String arg1) throws Throwable {
    }
}
