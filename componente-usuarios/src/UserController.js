export async function getUserData(id, funcionParaMandarDatosUsuario ){
    fetch("http://localhost:8080/v1/users/"+id) // Esto es asincrono
        .then(  respuesta => respuesta.json() )
        .then(  datosUsuario => {
            console.log("En el controlador")
            console.log(datosUsuario)
            funcionParaMandarDatosUsuario(datosUsuario)
        } )
        .catch( error => console.log(error) )
}


//REDUX