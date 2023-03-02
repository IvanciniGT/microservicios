import foto from './resources/persona.png';
import './User.css';
import React from "react"
import PropTypes from "prop-types";
import {getUserData} from "../../test/components/user/TestUserController"
import UserComponentState from "./UserComponentState";  //"./UserController"; // Equivalente a un import static de java

class UserComponentLogic extends React.Component{

    constructor(props){
        super(props);
        //this.datos = UserTestData.getDatos(props.id);
        // El día de mañana, habrá que cambiar l linea anterior, por una llamada a un servicio web, que devuelva ese JSON
        this.state=UserComponentState.defaultState();
    }
    componentDidMount() {
        if(this.props.id) // Sería igual que if(this.props.id === undefined)
            getUserData(this.props.id, (datos)=> this.nuevosDatosUsuario(datos) );
        else if (this.props.userData)
            this.nuevosDatosUsuario(this.props.userData)
        //else
        // Definir un estado de error: Esto mostraría en la pantalla: NO SE HAN SUMINISTRADO DATOS DE USUARIO!
    }

    nuevosDatosUsuario(datosUsuario){
        this.setState( UserComponentState.updateUserData(this.state, datosUsuario) );
    }

    cambiarModo(){
        this.setState(UserComponentState.updateVisualizationMode(this.state, !this.state["extendido"] ));
    }

    iniciarEdicion(){
        this.setState(UserComponentState.updateEnEdicion(this.state, true ));
    }
    guardarCambios() {
        // Recopilar los datos nuevos y mandarlos al CONTROLADOR, para que los mande al servicio
        this.setState(UserComponentState.updateEnEdicion(this.state, false ));
    }
    cancelarCambios() {
        // Restaurar valores anteriores
        this.setState(UserComponentState.updateEnEdicion(this.state, false ));
    }
}

UserComponentLogic.propTypes={
    id: PropTypes.string,
    userData: PropTypes.object,
    updateMode: PropTypes.bool
        // DISABLED: No se muestra botón de editar
        // ENABLED: Se muestra botón de editar
}
export default UserComponentLogic;

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
