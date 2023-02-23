class UserTestData {

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
        return UserTestData.usuarios[id];
    }
}

export default UserTestData;