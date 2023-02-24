import foto from './persona.png';
import './User.css';
import React from "react"
import PropTypes from "prop-types";
import UserTestData from "./UserTestData";

class User extends React.Component{

    constructor(props){
        super(props);
        this.datos = UserTestData.getDatos(props.id);
        // El día de mañana, habrá que cambiar l linea anterior, por una llamada a un servicio web, que devuelva ese JSON
        this.state=({"extendido": false});
    }

    cambiarModo(){
        this.setState({"extendido": !this.state["extendido"]});
    }

  render() { //JSX
    return (
        <div className={ `User ${ this.state["extendido"] && "extendido" || "" }`}>
            <img onClick={this.cambiarModo.bind(this)} className={ `Foto ${ this.state["extendido"] && "extendido" || "" }`} src={foto}/>
            <div><strong>Nombre:</strong> { this.datos["name"] } </div>
            { this.state["extendido"] && <div><strong>Email:</strong> { this.datos["email"] } </div> }

        </div>
    );
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
