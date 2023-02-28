import foto from './resources/persona.png';
import './User.css';
import React from "react"
import PropTypes from "prop-types";
import {getUserData} from "../../test/components/user/TestUserController"
import UserState from "./UserState";  //"./UserController"; // Equivalente a un import static de java

class User extends React.Component{

    constructor(props){
        super(props);
        //this.datos = UserTestData.getDatos(props.id);
        // El día de mañana, habrá que cambiar l linea anterior, por una llamada a un servicio web, que devuelva ese JSON
        this.state=UserState.defaultState();
    }
    componentDidMount() {
        //getUserData(this.props.id, this.nuevosDatosUsuario );
        //getUserData(this.props.id, this.nuevosDatosUsuario.bind(this) );
        getUserData(this.props.id, (datos)=> this.nuevosDatosUsuario(datos) );
    }

    nuevosDatosUsuario(datosUsuario){
        this.setState( UserState.updateUserData(this.state, datosUsuario) );
    }

    cambiarModo(){
        this.setState(UserState.updateVisualizationMode(this.state, !this.state["extendido"] ));
    }

    iniciarEdicion(){
        this.setState(UserState.updateEnEdicion(this.state, true ));
    }
    guardarCambios() {
        // Recopilar los datos nuevos y mandarlos al CONTROLADOR, para que los mande al servicio
        this.setState(UserState.updateEnEdicion(this.state, false ));
    }
    cancelarCambios() {
        // Restaurar valores anteriores
        this.setState(UserState.updateEnEdicion(this.state, false ));
    }
    render() { //JSX

        // 2 == "2"        <- true     // El tipo no se comprueba (se hace un autoconversión de tipos)
        // 2 === "2"       <- false    // El tipo no es el mismo

        if(this.state["datosUsuario"] === undefined )
            return (
                <div className="User">
                    Cargando...
                </div>
            );
        else {
            //////////////////////////////////////////////////////////////////////////////
            /// Botones para el modo edición
            //////////////////////////////////////////////////////////////////////////////
            let botones= ""
            let editable = false;
            if (this.state["editable"]) {
                if (!this.state["enEdicion"]) {
                    botones = <span className="botones">
                                    <span className="boton" onClick={this.iniciarEdicion.bind(this)}>EDITAR</span>
                              </span>
                } else {
                    editable = true;
                    // Estas dos lineas de abajo son iguales. Una con lambda y la otra con el bind
                    botones = <span className="botones">
                                    <span className="boton" onClick={  ()=>this.guardarCambios()        }>GUARDAR</span>
                                    <span className="boton" onClick={  this.cancelarCambios.bind(this)  }>CANCELAR</span>
                                </span>
                }
            }
            //////////////////////////////////////////////////////////////////////////////
            /// Modo extendido
            //////////////////////////////////////////////////////////////////////////////
            let datosExtendidos = "";
            if (this.state["extendido"]){
                datosExtendidos = <div>
                    <strong>Email:</strong> <span contentEditable={editable}> {this.state["datosUsuario"]["email"]}</span>
                                  </div>
            }
            //////////////////////////////////////////////////////////////////////////////
            /// Renderizo
            //////////////////////////////////////////////////////////////////////////////
            return (
                <div className={`User ${this.state["extendido"] && "extendido" || ""}`}>
                    <img onClick={this.cambiarModo.bind(this)}
                         className={`Foto ${this.state["extendido"] && "extendido" || ""}`} src={foto}/>
                    <div>
                        <strong>Nombre:</strong> <span contentEditable={editable}>{this.state["datosUsuario"]["name"]}</span>
                        {botones}
                    </div>
                    {datosExtendidos}
                </div>
            );
        }
  }

}

User.propTypes={
    id: PropTypes.string.isRequired
}
export default User;

// Al usar una marca User, se crea una instancia de esta clase.
// Cada uso de la marca, es una instancia, un componente, de tipo User

// Cada instancia tendrá:
// - Sus propias variables
// - Sus propiedades
// - Su estado

// Básicamente, todas esas cosas son variables...
// Pero tienen distinto comportamiento:
// - Sus propias variables: Yo las creo y las uso y hago lo que quiero con ellas
// - Sus propiedades: Son los atributos que se pasan en la marca HTML
//                    Dentro de la clase, las propiedades las tomo como CONSTANTES.
// - Su estado: Es 1 variable especial. Debe ser de tipo Object (básicamente un Map de Java) (clave-valor)
//              Cada vez que cambie el estado (ese conjunto clave valor) se invoca en automático el método RENDER
