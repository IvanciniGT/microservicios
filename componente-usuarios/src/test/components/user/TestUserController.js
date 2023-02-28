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
}



export async function getUserData(id, funcionParaMandarDatosUsuario ) {
    setTimeout(  () =>   funcionParaMandarDatosUsuario(    TestUserController.getDatos(id)    )   ,2000   );
}


