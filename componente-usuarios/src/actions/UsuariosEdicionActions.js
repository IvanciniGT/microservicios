export const USUARIOS_EN_EDICION_ACTIONS ={
    ASIGNAR_USUARIO: "ASIGNAR_USUARIO",
    DESASIGNAR_USUARIO: "DESASIGNAR_USUARIO",
}

export function AsignarUsuarioEnEdicion(usuario){
    return {
        "type": USUARIOS_EN_EDICION_ACTIONS.ASIGNAR_USUARIO,
        "user": usuario
    }
}

export const DesasignarUsuarioEnEdicion= () => {
    return {
        "type": USUARIOS_EN_EDICION_ACTIONS.DESASIGNAR_USUARIO
    }
}