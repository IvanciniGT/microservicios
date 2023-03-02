class TestUserController {

    static usuarios= {
        "1" : {
            "name": "Ivan",
            "email": "ivan.osuna.ayuste@gmail.com"
        },
        "2" : {
            "name": "Xavi",
            "email": "xavi@gmail.com"
        },
        "3" : {
            "name": "Marta",
            "email": "marta@gmail.com"
        },
        "4" : {
            "name": "Viçens",
            "email": "vicens@gmail.com"
        },
    };
    static getDatos(id){
        return TestUserController.usuarios[id];
    }
    static getTodosDatos(){
        const listado=[]
        for(const [clave, valor] of Object.entries(TestUserController.usuarios))
            listado.push({...valor, "id": clave})
        return listado;
    }
}

export async function getUserListData( funcionParaMandarDatosUsuarios ) {
    setTimeout(  () =>   funcionParaMandarDatosUsuarios(    TestUserController.getTodosDatos()    )   ,2000   );
}

export async function getUserData(id, funcionParaMandarDatosUsuario ) {
    setTimeout(  () =>   funcionParaMandarDatosUsuario(    TestUserController.getDatos(id)    )   ,2000   );
}


