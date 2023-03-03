import foto from './resources/persona.png';
import './User.css';
import React from "react"
import UserComponentLogic from "./UserComponentLogic";  //"./UserController"; // Equivalente a un import static de java

class User extends UserComponentLogic{

    render() { //JSX

        // 2 == "2"        <- true     // El tipo no se comprueba (se hace un autoconversión de tipos)
        // 2 === "2"       <- false    // El tipo no es el mismo

        if(this.state["datosUsuario"] === undefined ) {
            return (
                <div className="User">
                    Cargando...
                </div>
            );
        } else {
            let extendido = this.state["extendido"]
            //////////////////////////////////////////////////////////////////////////////
            /// Botones para el modo edición
            //////////////////////////////////////////////////////////////////////////////
            let botones= ""
            let enEdicion = false;
            if (this.state.editable) {
                if (!this.state["enEdicion"]) {
                    botones = <span className="botones">
                                    <span className="boton" onClick={this.iniciarEdicion.bind(this)}>EDITAR</span>
                              </span>
                } else {
                    enEdicion = true;
                    // Estas dos lineas de abajo son iguales. Una con lambda y la otra con el bind
                    botones = <span className="botones">
                                    <span className="boton" onClick={  ()=>this.guardarCambios()        }>GUARDAR</span>
                                    <span className="boton" onClick={  this.cancelarCambios.bind(this)  }>CANCELAR</span>
                                </span>
                    extendido = true
                }
            }
            //////////////////////////////////////////////////////////////////////////////
            /// Botones para el modo borrado
            //////////////////////////////////////////////////////////////////////////////
            let botones_borrado = "";
            if (this.props.borrable && !enEdicion) {
                if (!this.state["enBorrado"] ) {
                    botones_borrado = <span className="botones">
                                    <span className="boton" onClick={this.iniciarBorrado.bind(this)}>BORRAR</span>
                              </span>
                } else {
                    // Estas dos lineas de abajo son iguales. Una con lambda y la otra con el bind
                    botones_borrado = <span className="botones">
                                    <span className="boton" onClick={  ()=>this.confirmarBorrado()        }>CONFIRMAR</span>
                                    <span className="boton" onClick={  this.cancelarBorrado.bind(this)  }>CANCELAR</span>
                                </span>
                    botones = ""
                }
            }
            //////////////////////////////////////////////////////////////////////////////
            /// Modo extendido
            //////////////////////////////////////////////////////////////////////////////
            let datosExtendidos = "";
            if (extendido){
                if(enEdicion){
                    datosExtendidos = <div>
                        <strong>Email:</strong> <input ref={this.emailInput} size="50" name="email" defaultValue={this.state["datosUsuario"]["email"]}></input>
                    </div>
                }else{
                    datosExtendidos = <div>
                        <strong>Email:</strong> <span > {this.state["datosUsuario"]["email"]}</span>
                    </div>
                }
            }            //////////////////////////////////////////////////////////////////////////////
            /// Modo extendido
            //////////////////////////////////////////////////////////////////////////////
            let datos = "";
            if(enEdicion){
                datos =  <span><strong>Nombre:</strong> <input ref={this.nameInput} size="30" name="nombre" defaultValue={this.state["datosUsuario"]["name"]}></input></span>
            }else{
                datos =<span><strong>Nombre:</strong> <span>{this.state["datosUsuario"]["name"]}</span></span>
            }
            //////////////////////////////////////////////////////////////////////////////
            /// Renderizo
            //////////////////////////////////////////////////////////////////////////////
            return (
                <div className={`User ${extendido && "extendido" || ""}`}>
                    <img onClick={this.cambiarModo.bind(this)}
                         className={`Foto ${extendido && "extendido" || ""}`} src={foto}/>
                    <div>
                        {datos}
                        {botones}
                        {botones_borrado}
                    </div>
                    {datosExtendidos}
                </div>
            );
        }
  }

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
