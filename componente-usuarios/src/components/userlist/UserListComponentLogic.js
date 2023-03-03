import './UserList.css';
import React from "react"
import UserListComponentState from "./UserListComponentState";

import {getUserListData} from "../../test/components/user/TestUserController"
import {AsignarUsuarioEnEdicion, DesasignarUsuarioEnEdicion} from "../../actions/UsuariosEdicionActions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
//import {getUserListData} from "./UserListComponentController";  //"./UserController"; // Equivalente a un import static de java

class UserListComponentLogic extends React.Component{

    constructor(props){
        super(props);
        this.componentState=new UserListComponentState(this)
        this.state = this.componentState.defaultState();
    }
    componentDidMount() {
        getUserListData((datos)=> this.nuevosDatosUsuarios(datos) );
    }
    nuevosDatosUsuarios(datosUsuario){
        this.componentState.updateUserListData( datosUsuario );
    }
    /*
    nuevoUsuarioEnEdicion(usuario){
        this.componentState.asignarUsuarioEnEdicion( usuario );
    }
    sinUsuarioEnEdicion(){
        this.componentState.desasignarUsuarioEnEdicion();
    }
*/
}

UserListComponentLogic.propTypes={
    usuarioEnEdicion: PropTypes.any
}


export default UserListComponentLogic;
