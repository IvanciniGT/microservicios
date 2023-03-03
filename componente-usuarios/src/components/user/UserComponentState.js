class UserComponentState {

    constructor(component) {
        this.component=component
    }

    updateState(property, value){
        this.state = {
            ...this.state,
        }
        this.state[property]=value
        this.component.setState(this.state)
    }

    defaultState(){
        this.state = {
            "extendido": false,
            "datosUsuario": undefined,
            "editable": false,
            "enEdicion": false,
            "enBorrado": false
        }
        return this.state
    }
    updateEditable(editable){
        this.updateState("editable", editable)
    }
    updateEnEdicion(enEdicion){
        this.updateState("enEdicion", enEdicion)
    }
    updateVisualizationMode(extendido){
        this.updateState("extendido", extendido)
    }
    updateUserData(userData){
        this.updateState("datosUsuario", userData)
    }
    updateEnBorrado(enBorrado){
        this.updateState("enBorrado", enBorrado)
    }
}

export default UserComponentState;