import './UserList.css';
import React from "react"
import UserListComponentLogic from "./UserListComponentLogic";
import User from "../user/UserComponentView";  //"./UserController"; // Equivalente a un import static de java

class UserList extends UserListComponentLogic{

    render() { //JSX
        if (this.state.datosUsuarios) {
            return (
                <div >
                    {this.state.datosUsuarios.map(datosUsuario =>
                        <div  key={datosUsuario.id}>
                            <User userData={datosUsuario}
                                  editable={!this.state.usuarioEnEdicion || this.state.usuarioEnEdicion === datosUsuario }
                                  onUpdateStart={ () =>this.nuevoUsuarioEnEdicion(datosUsuario) }
                                  onUpdateEnd={ this.sinUsuarioEnEdicion.bind(this) }
                                  borrable={true}
                                  onDelete={(usuario)=>alert("borrando: " + usuario )}
                            ></User>
                        </div>
                        )
                    }
                </div>
            ) // Expresion
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

export default UserList;
