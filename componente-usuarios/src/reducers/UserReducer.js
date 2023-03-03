import {USUARIOS_EN_EDICION_ACTIONS} from "../actions/UsuariosEdicionActions";

const estadoInicial = {
    "usuarioEnEdicion": undefined
}

export function UserReducer (state = estadoInicial, action) {
    console.log(action)
    switch(action.type){
        case USUARIOS_EN_EDICION_ACTIONS.ASIGNAR_USUARIO :
            return {
                ... state,
                "usuarioEnEdicion": action.user
            }
        case USUARIOS_EN_EDICION_ACTIONS.DESASIGNAR_USUARIO :
            return {
                ... state,
                "usuarioEnEdicion": undefined
            }
        default:
            return state;
    }

    // Debe devolver el estado...
    // OJO, aunque no lo modifique
}