class UserState {
    static defaultState(){
        return {
            "extendido": false,
            "datosUsuario": undefined,
            "editable": true,
            "enEdicion": false
        }
    }
    static updateEditable(currentState, editable){
        return {
            ...currentState,
            "editable": editable
        }
    }
    static updateEnEdicion(currentState, enEdicion){
        return {
            ...currentState,
            "enEdicion": enEdicion
        }
    }
    static updateVisualizationMode(currentState, extendido){
        return {
            ...currentState,
            "extendido": extendido
        }
    }
    static updateUserData(currentState, userData){
        return {
            ...currentState,
            "datosUsuario": userData
        }
    }
}

export default UserState;