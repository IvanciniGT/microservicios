export async function getUserListData( funcionParaMandarDatosUsuarios ){
    fetch("http://localhost:8080/v1/users/") // Esto es asincrono
        .then(  respuesta => respuesta.json() )
        .then(  datosUsuarios => {
            console.log("En el controlador")
            console.log(datosUsuarios)
            funcionParaMandarDatosUsuarios(datosUsuarios)
        } )
        .catch( error => console.log(error) )
}
