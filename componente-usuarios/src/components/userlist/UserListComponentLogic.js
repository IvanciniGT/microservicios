import './UserList.css';
import React from "react"
import UserListComponentState from "./UserListComponentState";

import {getUserListData} from "../../test/components/user/TestUserController"
//import {getUserListData} from "./UserListComponentController";  //"./UserController"; // Equivalente a un import static de java

class UserListComponentLogic extends React.Component{

    constructor(props){
        super(props);
        this.state=UserListComponentState.defaultState();
    }
    componentDidMount() {
        getUserListData((datos)=> this.nuevosDatosUsuarios(datos) );
    }
    nuevosDatosUsuarios(datosUsuario){
        this.setState( UserListComponentState.updateUserListData(this.state, datosUsuario) );
    }

}

UserListComponentLogic.propTypes={
}
export default UserListComponentLogic;
