class UserListComponentState {

    constructor(component) {
        this.component=component
    }
    defaultState(){
        this.state= {
            "datosUsuarios": undefined,
            "usuarioEnEdicion": undefined
        }
        return this.state
    }
    updateState(property, value){
        this.state = {
            ...this.state,
        }
        this.state[property]=value
        this.component.setState(this.state)
    }

    updateUserListData( userListData){
        this.updateState("datosUsuarios", userListData)
    }
    asignarUsuarioEnEdicion( user){
        this.updateState("usuarioEnEdicion", user)
    }
    desasignarUsuarioEnEdicion(){
        this.updateState("usuarioEnEdicion", undefined)
    }

}

export default UserListComponentState;