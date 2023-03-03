import './UserList.css';
import React from "react"
import UserListComponentLogic from "./UserListComponentLogic";
import User from "../user/UserComponentView";
import UserListComponentConectado from "./UserListComponentLogic";
import {connect} from "react-redux";  //"./UserController"; // Equivalente a un import static de java

class UserListComponentView extends UserListComponentLogic{

    render() { //JSX
        if (this.state.datosUsuarios) {
            return (
                <div >
                    {this.state.datosUsuarios.map(datosUsuario =>
                        <div  key={datosUsuario.id}>
                            <User userData={datosUsuario}
                                  editable={!this.props.usuarioEnEdicion || this.props.usuarioEnEdicion === datosUsuario }
                                  borrable={true}
                                  onDelete={(usuario)=>alert("borrando: " + usuario )}
                            ></User>
                        </div>
                        )
                    }
                </div>
            ) // Expresion

            //onUpdateStart={ () =>this.nuevoUsuarioEnEdicion(datosUsuario) }
            //onUpdateEnd={ this.sinUsuarioEnEdicion.bind(this) }



            // Declaro una función, que toma datos de un usuario y devuelve una marca User con los datos pertinentes
            // Esa función la aplico sobre todos los datos de usuario que tengo (MAP)
            // Esto no lo podría hacer nunca con un forEach.
            // Que devuelve un forEach? NADA
            // El map es como el foreach, solo que el map devuelve una lista nueva con los datos resultantes de aplicar la función
        }else{
            return (
                <div>
                    Cargando....
                </div>
            )
        }
    }
}

/// REDUX


function mapStateToProps (state) {
    return {
        usuarioEnEdicion: state.usuarioEnEdicion,
    }
}
// Extender la clase
const UserList = connect(
    mapStateToProps,       // Lo que leo del store
    ()=>{}) // Lo que modifico
    (UserListComponentView);
export default UserList;
