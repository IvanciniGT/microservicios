import foto from './resources/persona.png';
import './User.css';
import React from "react"
import PropTypes from "prop-types";
import {getUserData} from "../../test/components/user/UserTestData"  //"./UserController"; // Equivalente a un import static de java

class User extends React.Component{

    constructor(props){
        super(props);
        //this.datos = UserTestData.getDatos(props.id);
        // El día de mañana, habrá que cambiar l linea anterior, por una llamada a un servicio web, que devuelva ese JSON
        this.state=this.cambiarEstado();
    }
    componentDidMount() {
        getUserData(this.props.id, (datos)=>this.nuevosDatosUsuario(datos) );
    }

    nuevosDatosUsuario(datosUsuario){
        console.log("En el componente")
        console.log(datosUsuario)
        this.setState(this.cambiarEstado( this.state["extendido"], datosUsuario ));
    }

    cambiarEstado(extendido = false, datosUsuario = undefined ){
        return {
            "extendido": extendido,
            "datosUsuario": datosUsuario
        }
    }

    cambiarModo(){
        this.setState(this.cambiarEstado( !this.state["extendido"] ));
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
        else
            return (
                <div className={ `User ${ this.state["extendido"] && "extendido" || "" }`}>
                    <img onClick={this.cambiarModo.bind(this)} className={ `Foto ${ this.state["extendido"] && "extendido" || "" }`} src={foto}/>
                    <div><strong>Nombre:</strong> { this.state["datosUsuario"]["name"] } </div>
                    { this.state["extendido"] && <div><strong>Email:</strong> {  this.state["datosUsuario"]["email"] } </div> }

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
