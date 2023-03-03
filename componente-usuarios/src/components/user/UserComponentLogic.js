import './User.css';
import React from "react"
import PropTypes from "prop-types";
import {getUserData} from "../../test/components/user/TestUserController"
import UserComponentState from "./UserComponentState";
import {AsignarUsuarioEnEdicion, DesasignarUsuarioEnEdicion} from "../../actions/UsuariosEdicionActions";
import {connect} from "react-redux";  //"./UserController"; // Equivalente a un import static de java

class UserComponentLogic extends React.Component{

    constructor(props){
        super(props);
        this.componentState=new UserComponentState(this)
        this.state=this.componentState.defaultState();
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
    }
    // Esta funcion se llama después de crearse el componente en memoria y al pincharse en el HTML
    // Cuantas veces se llama esta función? 1
    // Esta función no se vuelve a llamar si cambia una propiedad
    // Si una propiedad cambia, REACT nos avisa llamando al método: componenDidUpdate
    componentDidMount() {
        this.componentState.updateEditable(this.props.editable);
        if(this.props.id) // Sería igual que if(this.props.id === undefined)
            getUserData(this.props.id, (datos)=> this.nuevosDatosUsuario(datos) );
        else if (this.props.userData) {
            this.nuevosDatosUsuario(this.props.userData)
        }

        //else
        // Definir un estado de error: Esto mostraría en la pantalla: NO SE HAN SUMINISTRADO DATOS DE USUARIO!
    }
    componentDidUpdate(prevProp){
        if(this.props.editable !== prevProp.editable) {
            this.componentState.updateEditable(this.props.editable);
        }
    }

    nuevosDatosUsuario(datosUsuario){
         this.componentState.updateUserData(datosUsuario) ;
    }

    cambiarModo(){
        this.componentState.updateVisualizationMode(!this.state["extendido"] );
    }

    iniciarEdicion(){
        this.componentState.updateEnEdicion(true );
        if(this.props.onUpdateStart)
            this.props.onUpdateStart(this.state.userData)
    }
    guardarCambios() {
        // Recopilar los datos nuevos y mandarlos al CONTROLADOR, para que los mande al servicio
        let nuevoNombre = this.nameInput.current.value;
                                                // value js puro y duro
                                        // HTMLElement del DOM . Equivalente en js a document.getElementById(ID)
        let nuevoEmail = this.emailInput.current.value;
        console.log("Nuevo nombre", nuevoNombre)
        console.log("Nuevo email", nuevoEmail)
        this.componentState.updateEnEdicion( false );
        if(this.props.onUpdateEnd)
            this.props.onUpdateEnd()

    }
    cancelarCambios() {
        // Restaurar valores anteriores
        this.componentState.updateEnEdicion( false );
        if(this.props.onUpdateEnd)
            this.props.onUpdateEnd()
    }

    iniciarBorrado() {
        this.componentState.updateEnBorrado( true );

    }
    cancelarBorrado() {
        this.componentState.updateEnBorrado( false );
    }
    confirmarBorrado() {
        if(this.props.onDelete)
            this.props.onDelete(this.state.datosUsuario)
        this.componentState.updateEnBorrado( false );
    }
}

UserComponentLogic.propTypes={
    id: PropTypes.string,
    userData: PropTypes.object,

    editable: PropTypes.bool,
    onUpdateStart: PropTypes.func,
    onUpdateEnd: PropTypes.func,

    borrable: PropTypes.bool,
    onDelete: PropTypes.func,


    // DISABLED: No se muestra botón de editar
        // ENABLED: Se muestra botón de editar
}
UserComponentLogic.defaultProps = {
    editable : false,
    borrable : false
}

// Extender la clase
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
