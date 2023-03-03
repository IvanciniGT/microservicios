# Preguntas:

Java? 11
    Los cambios gordos llegaron en Java 9
BBDD? SQL Server
Gestión BBDD desde Java? JPA: SI
Metodología de desarrollo: Waterfal (Cascada)

---

La idea...
La forma de desarrollar apps ha cambiado de narices !
1º Ya no queremos apps monolíticas:
   - Se construye el sistema como un único proyecto
   - Componentes fuertemente ligados entre si
   - Cada evolución/mantenimiento/paso a producción es un follón.
   - Me obligan a usar la misma tecnología para todo el sistema.

2º Queremos sistemas con componentes débilmente acoplados.

Y además, que poder montar usando distintas TECNOLOGIAS
App Web:

FrontEnd                JS

                        Es el lenguaje que se sabe comunicar con los navegadores
                            WEB COMPONENTS -> REUTILIZAR Código HTML + CSS + JS entre proyectos
                                PRIMEFACES Que casi no tiene lógica... solo a nivel de presentación
                        JS tiene muchas más librerías que JAVA para montar FrontEnds




            Nueva marca HTML
                <usuario id="182734562">

            Esa marca genera detrás de la cortina: 
                <div class="usuario">
                    <img>   < Que carga una foto del usuario de un servidor que tengo de fotos
                    <div>
                        <span class="detalle">Nombre</span>Iván Osuna
                        <span class="detalle">Email</span>ivan.osuna.ayuste@gmail.com (ENLACE ) -> Abra correo
                        <span class="detalle">Telefono</span>32495792385798

                    </div>
                </div>

                Y los datos se sacan de una BBDD

            // Todo ello con una determinada estética (CSS)


Backend

Hoy en día la tendencia es MICROSERVICIOS
    Servicios con protocolo REST
    Queremos servicios STATELESS:
        El estado de la aplicación lo gestiona el CLIENTE !

    YA NO HACEMOS USO DE LA SESION DE JAVA HttpSession

    Detrás todo deberían ser servicios WEB JSON.
    La respuesta son DATOS

Un tema es qué entendemos por frontend?

Interfaz de usuario: 
- HTML + CSS + JS ... porque nuestra interfaz de usuario es un navegador WEB
   De echo hoy en día, es la interfaz más usada? Desde hace MUCHOS AÑOS NO !

cuando accedeis al banco, accedeis desde la WEB? NO, desde una app movil

    App Navegador  --->>>>><<<-----                            Servidor
                        datos
    App Android                                                 autenticar usuario
    App iOS                                                     streaming pelicula
    App SmartTV                                                 descargar pelicula
                                                                sugerencias
    Netflix

En backend vamos a montar microservicios: Un servicio MUY LIGERO que se encarga de gestionar un tipo de cosa de mi app.

Y mi app, en backend, será el conjunto de N microservicios, cada uno, un proyecto independiente!, con su repo, con su maven....

Usuarios
Listas de tareas

Cada usuario tiene N listas de tareas

Usuarios  ----< Participante >-----  Listas  -------<  Tareas
Id              UsuarioId            Id                 Id
Nombre          ListaId              Nombre             Detalle
Email                                                   FechaFinalización
Contraseña


--------
1º Definimos el API de servicios que va a tener nuestra APP

https://miservidor/api/v1/
                            usuarios
                                            GET     Listado de usuarios
                                            POST    Nuevo usuario
                            /usuarios/ID_USUARIO
                                            GET     ME da la info del usuario **
                                            PUT     Modifico el usuario       **
                                            DELETE  Borro el usuario

https://miservidor/api/v2/
                            usuarios
                                            Cada usuario también tiene TELEFONO

-----------
                            listas          
                                            GET     Listas de un usuario
                                            POST    Nueva lista
                            listas/ID_LISTA
                                            DELETE  Eliminar lista
                            lista/ID_LISTA/users
                                            GET
                                            POST
                                                    Aqui habrá codigo JAVA
                                                        Y tengo que meter un IF usuario no existe: EXPLOTO ! 404 
                            lista/ID_LISTA/users/USER_ID
                                            DELETE
                            lista/ID_LISTA/tasks
                                            GET
                                            POST
                            lista/ID_LISTA/tasks/TAREA_ID
                                            DELETE
                                            PUT
----------
                            auth/login
                                            POST    Genera un JWT        Token de sesión
                            auth/logout
                                            POST    Eliminar el token de sesión

-----------
Luego tendría el proyecto Backend de APP listas de tareas:
Sería un proyecto que auna los 3 proyectos.

// Cada uno sería un proyecto independiente


----
Habrá que tomar una decisión:

Cómo quiero la comunicación entre esos componentes?
    Entre api listas y el api de usuarios?
        Saber si un usuario existe?
            Puedo solicitar esa info vía HTTP               |
                    * Esto sería lo más limpio
                    * También es la más compleja inicialmente
            Puedo acceder a esa info a través de JAVA       |   Acoplar más los módulos
                    * En algunos casos, esto será lo más cómodo
            Puedo acceder a esa info a través de BBDD       v
                    * ESTE NUNCA

Si tengo solo comunicaciones vía HTTP, cada cosa podría estar (API) en su propio servidor de apps corriendo. => ESCALADO
                                                                                                             => Instalaciones
Y cada uno montado con una tecnología diferente

----

El framework con el que hoy en día se montan TODAS ESTAS COSAS es SpringBoot

Cual es el entregable de Springboot?    -> .jar que tiene dentro: el .war de la app y el jar de TOMCAT !

Para qué necesito wildfly? EJBs? Nop! NEcesito un servidor de clase empresarial con soporte de EJBs y .ears) NOP !

Monto apps muy ligeras, muy sencillas y desacopladas

Dar de alta una dependencia en el POM!

----
Jenkins
Update repo git -> Que se empaquete todos los proyectos de una en auto.
Y que te haga el despliegue!


----
Servicio de usuarios:

Clase Usuario : Entity (jpa)                                            MODELO
- Nombre
- Correo
- Password

RepositorioUsuarios: JpaRepository (jpa)

    List<Usuario> getAll();

Exponer esta funcionalidad en forma de un servicio WEB: Controlador     CONTROLADOR

ControladorUsuarios   <    RepositorioUsuario
    endpoints REST
        recuperarTodos
        borrarUno
        Alta
        recuperarUno
        modificarUno



Json -> que se genera en automático                                     VISTA

SPRINGBOOT < SPRING 

Spring es un framework que ofrece:
- Inversión de Control: Spring es el que controla el flujo de ejecución de mi programa ****
                        Spring es quien crea clases, quién borra clases
                        Spring es quien llama a las funciones
- Al ser Spring quien crea las instancias de las clases,
  En el contructor suministrará automáticamente TODOS los objetos que yo haya definido. ESTO ME OFRECE INYECCION DE DEPENDENCIAS


---
Spring se basa en el concepto de Inversión de control

                                        proyecto
                    |-------------------------------------------------------------------------|
CLIENTE --->            CONTROLADOR     --->    REPOSITORIO                --->     MODELOS
                        expone servicios        controla persistencia
                                                modelos

                                                                                    User
                                                                                    Si hago un cambio en el modelo... estoy debería quedar contenido a nivel del proyecto

                        GET /users
                        <- Modelo User


                        v1 del servicio

                        v2 del servicio

                                                                                        telefono


        Aplicacion 1 : Gestión de expedientes de formación
                        De uso interno de la casa
                            Haces aquí un cambio, para meter datos nuevos en el expediente  v2
                            Sigo ofreciendo una version 1 del servicio
                                            ^
        Aplicacion 2 : Consultar a un proveedor el estado de un expediente de formación




JSON:

JS Javascript
ON Object Notation

---
true
---
4
---
"hola"
---
["hola1","adios2"]
---
tabla = {
    "clave1": "valor1",
    "clave2": "valor2",
}
---
Map<String,String> tabla=new HashMap<>();
tabla.put("clave1", "valor1");
tabla.put("clave2", "valor2");

---
[
    {
        "clave1": "valor1",
        "clave2": "valor2",
    },
    {
        "clave1": "valor1",
        "clave2": "valor2",
    }
]


xml
    XPATH




Tenemos un proyecto con el API de Usuarios

Queremos otro proyecto con el API Tareas

Las tareas están relacionadas con los Usuarios?

Que sean proyectos TOTALMENTE INPENDIENTES o NO. 

Una cosa es el API REST y otra cosa es la gestión de los objetos que hay por debajo.

Nuestro API de usuarios es muy sencillo, no tiene LOGICA 

Qué consideraríamos lógica?


EXPOSICION

LOGICA
    Mandar un email
    Mandar un sms
MODELO

Toda mi gestión de usuarios es algo reutilizable para otros proyectos que no sean el de tareas?


Servicio REST para autenticación y datos del usuario y permisos

Quiero crear un expediente en mi app , ya que mi app es de gestión de expedientes

Y en algún momento un expediente lo vincularé a un usuario: PROPIETARIO, ADMINISTRATIVO, Consultar

BBDD
    TABLA Expedientes
    Alguna información del usuario: NOMBRE 

MODELO:
    Usuario                     = Caso que teneis en pantalla de nuestro proyecto. Qué cambia EL REPOSITORIO, que nos BBDD
        getEmail()
        getNombreCompleto()
                                    Un repo muy simplon, ya que solo admite GET . No es un repo CRUD


Proyectos:

    Modelo:
        Modelo Usuarios             - PROYECTO 1
        Modelo Tareas/Expedientes   - PROYECTO 2 (que tiene depedencias con PROYECTO 1)

    API REST:       SPRING-BOOT
        Usuarios                    - PROYECTO 3
        Expedientes/Tareas          - PROYECTO 5

    
    Front-end
        Pantalla: 
            Datos de un usuario: <COMPONENTE WEB>           <usuario id="19283781">     ---> API REST usuarios      - PROYECTO 4
            Datos de un expediente <COMPONENTE WEB>         <expediente id=2938474">    ----> API REST exp          - PROYECTO 6
            Modificar datos de un expediente <COMPONENTE WEB>    <modificarexpediente id=2938474">    ----> API REST exp - PROYECTO 7
            
                WEB COMPONENTS: **Angular**, ****React****, Vue, Polymer

                        LitElement

                JS


Kotlin es un lenguaje de programación nuevo que compila a fichero byte-code -> Se ejecutan dentro de una JVM
Scala


---

App frontal WEB : 50 pantallas
    Gestión
    Consulta publica

Cambio en el sistema... añades unos campos por ahí

Los has añadido en el modelo del expediente
    De momento cambias el formulario de alta del frontal.. pero no quieres tener que cambiar TODAS las otras 49 pantallas
    para que la gente ya pueda ir usando esta funcionalidad

---

Metodologías ágiles: Manifiesto ágil 
SCRUM / Xtreme programing

Entregar el producto de forma incremental !


----

Node es el equivalente a la JVM

En un interprete de JS

Es el motor/interprete de JS que había dentro del navegador Chromium (Proyecto opensource > Chrome + Edge, Opera, Safari) // Firefox

Visual Studio Code está desarrollado en JS: Linux, Windows, MacOS, Navegador

---
Nuestros proyectos, REACTJS, van a ser proyectos que van a correr dentro de un navegador.
Es decir, para ejecutarlos no necesitamos Node.... para nada

El proyecto al final dará lugar a un fichero .js

Que pondremos en un servidor web, el que queramos (incluso, dentro de tomcat o de wildfly)

Mientras desarrollamos, Node nos va a ser muy cómodo como servidor donde alojar los js y servirlos al navegador.

npx ~ npm 

npm  = Equivalente en el mundo JS a maven:
- TypeScript transpila a JS plano (sin tipos)
- Empaqueta el proyecto -> .js final
- Gestionar dependencias.


SPA: Single page application




----


Expedientes

Alta de un expediente:
Nombre,
Personas....
Otros datos


Fecha de creación       Es de salida / no de entrada
Fecha de modificación   Es de salida / no de entrada
Id                      Es de salida / no de entrada
Estado                  Es de salida / no de entrada


-----
                        INFORMATICA 
                        Logica                                                  Datos
CAPA 3 - Cliente
         COMPONENTE WEB
         Programa exportación BBDD (Datawarehouse)
            VVVVVVV

CAPA 2 - EXPOSICION funcionalidad
                        Controlador REST (API) v1
                            Devolver usuario                                    Vista del modelo2_v1 (User)
                            Alta usuario                                                        Datos nuevo Usuario 2_v1
                            Modificar usuario                                                               Datos modificar Usuario 2_v1
                        Controlador REST (API) v2
                            Devolver usuario                                    Vista del modelo2_v2 (User)
                            Alta usuario                                                        Datos nuevo Usuario 2_v2
                            Modificar usuario                                                               Datos modificar Usuario 2_v2
CAPA 1 - LOGICA NEGOCIO
                        Servicio                                                     
                            Devolver usuario                                    Vista del modelo (User)
                            Alta usuario                                                        Datos nuevo Usuario 
                            Modificar usuario                                                               Datos modificar Usuario 
CAPA 0 - MODELO
                        Repositorio                                             User * Campo nuevo
                        Gestión (CRUD)



Promesa

Promise (JS) = Future (JAVA)

Este objeto lo manejamos cuando invocamos una función ASINCRONA
---
HILO MAIN EN EJECUCION
1- Imprimir algo por pantalla:                                                                  BIENVENIDO
2- Llamar a una función asincronamente (llamar a un servicio HTTP y obtener una respuesta)      funcionLlamarAlServicio (CALLBACK)
3- Imprimir otra cosa por pantalla                                                              ESPERANDO DATOS DEL USUARIO....

funcion CALLBACK(){
    pinta los datos que hemos pedido
}

funcionLlamarAlServicio( FUNCION CALLBACK ){
    Abre un hilo Paralelo 1 que hará sus cositas (FUNCION CALLBACK)
}

HILO PARALELO 1
    hace la peticion
    EJECUTE LA FUNCION CALLBACK
---


HILO MAIN EN EJECUCION
1- Imprimir algo por pantalla:                                                                  BIENVENIDO
2- Llamar a una función asincronamente (llamar a un servicio HTTP y obtener una respuesta)      funcionLlamarAlServicioConPromesa()
   Obtengo como resultado una promesa
3- Imprimir otra cosa por pantalla                                                              ESPERANDO DATOS DEL USUARIO....


    4- while (promesa not RESUELTA)... espera
    5- pinta los datos que hemos pedido                                                             ESTOS SON LOS DATOS DEL USUAIRO 
        Los saco de la promesa

    Normalmente las promesas ofrecen una funcion THEN

funcionLlamarAlServicioConPromesa(  ){
    Creo una promesa
    Abre un hilo Paralelo 1 que hará sus cositas (promesa)
    Devuelvo la Promesa/Futuro
}
HILO PARALELO 1
    hace la peticion
    pone en la promesa:
        valor: ASIGNADO
        RESUELTA: TRUE

class Promesa(){
    Boolean RESUELTA
    Object valor

    then( CALLBACK )
    set(RESUELTA=TRUE) -> Llamar a la función de CALLBACK
}




PANTALLA PRINCIPAL DE LA APLICACION

    Mostrando una lista de usuarios
        Y en un usuario hacen click para editarlo
            Y el componente del usuario cambia su representación para mostrar un formulario
            Pero por este usuario entrar en modo de edición... que pasa con el resto de componentes usuario?
                A lo mejor quiero desactivar en ellos la opción de editar

Vamos a tener un ESTADO a nivel de la aplciación (que es otra tabla HASH -> otro Object {} )            REDUX
    ID en Edición : 1
------------
                Usuario 1
                    | Ivan            |        GUARDAR CANCELAR                           ESTADO LOCAL: Modo edicion: ON
                Usuario 2
                    Marta                                                                 ESTADO LOCAL: Modo edicion: DISABLED


                Cada componente tiene 3 modos de edición: ON OFF DISABLED
------------


PANTALLA PRINCIPAL DE LA APLICACION
    Mostrando una lista de usuarios
        Y en un usuario hacen click para editarlo -> Llamar a otro HTML que genera un formulario 

------------


<user id="23">


User.js                 Qué hace?                                                   Cuando se llama?
    Constructor         Creo el componente en memoria                               Al usar la marca <user>
                        Y haré las cosas que me interesen
                        Los atributos HTML llegan al contructor como argumento props
                        Desde este momento, dentro de la clase son accesibles mediante this.props

                        Aqui puedo crear mis propias variables asociadas a esta instancia de User

                        Aquí puedo también crear una variable muy especial llamada this.state

    componentDidMount                                                               El elemento es pinchado dentro del HTML
                        Y haré las cosas que me interesen
                        Desde este momento, tengo a mi disposición la función this.setState() SIN DATOS DE USUARIO
                            para realizar un cambio en el state... y por ende que se invoque en automatico al render
                        EN PARALELO : Solicito la carga de los datos del usuario.. y cuando estén cargados? 
                                Los quiero poner en el estado... pero esto es en paralelo (asíncrono)
                                Que me llamen a la función datosCargados, pasandome los datos del usuario
    datosCargados(datos)
                        Meto los datos en el estado

    render              Devuelve el HTML que se debe mostrar en el navegador        Una vez al pincharse el elemento dentro del HTML
                                                                                    Cada vez que cambia el this.state

                        Mostramos el nombre del usuario... siempre??? Cuando están cargados
                        Donde guardo esos datos? En el state
                        Y si no están cargados? Muestro CARGANDO


State:
- datos usuario
- modo visualizacion

state en JS(React) lo almacenamos en la variable this.state
Qué es esa variable?
{   <<<< Este objeto es el state... que estará ubicado en una determinada posición de memoria... El equivalente a un MAP de java
    "datosUsuario": {
        "name": "Ivan",
        "email": "ivan.osuna.ayuste@gmail.com"
    },
    "extendido": true
}

Como resolvemos esta situación? 

Generando un nuevo estado con los datos de interés cambiados.
{   <<<< Este objeto es el state... que estará ubicado en una determinada posición de memoria... El equivalente a un MAP de java
    "datosUsuario": {
        "name": "Ivan",
        "email": "ivan.osuna.ayuste@gmail.com"
    },
    "extendido": false
}


Comunicacion entre componentes:

De padre a hijo: Mediante 
De hijo a padre: Mediante funciones de callback

Entre componentes independientes: Con un estado global (REDUX)

-------


Web component: User
- Mostrar los datos de un usuario, en distintos formatos
- Modificar los datos de un usuario
- Alta? NOP
- Baja? Me puede interesar tener un botón delete....
  Que haga qué? La baja de un usuario? SIEMPRE? NO

---
Más chulo va a ser esto!

----
App1 en la que voy a meter el componente:
- App que gestiona sus propios usuarios... y los doy de alta y de baja
  En ella, el botón borrar, podría interesarme que borre el usuario.

App2 (que podría ser la misma app1).... Tengo una pantalla llamada: Expediente.
En ella, me muestra los datos de un expediente y los usuarios asignados a su tramitación.
Qué haría en esa pantalla el botón borrar? Desasignar al usuario del expediente

---

UserList

    User 1
        cuando Entres En Edicion, me avisas: Llama a A(indicando que eres el usuario 1)
        cuando salgas de edicion, me avisas: llamas a B
    User 2
        cuando Entres En Edicion, me avisas: Llama a A(indicando que eres el usuario 2)
        cuando salgas de edicion, me avisas: llamas a B
    User 3
        cuando Entres En Edicion, me avisas: Llama a A(indicando que eres el usuario 3)
        cuando salgas de edicion, me avisas: llamas a B
    User 4
        cuando Entres En Edicion, me avisas: Llama a A(indicando que eres el usuario 4)
        cuando salgas de edicion, me avisas: llamas a B


ReactJS 

Genera la representación de un componente en HTML => Le genera un DOM (Es un DOM que no es el del navegador)
                                                                        VirtualDOM
React compara el VirtualDom con el DOM del navegador... y actualiza solo las partes que han cambiado.
Esto es para mejorar el rendimiento y la interactividad.

Para REACT, es complicado hacer ese trabajo en listas generadas. Hay que ayudarle.

Listado que muestra 3 usuarios
<user key="VALOR">
<user>
<user>

El valor debe ser UNICO EN LA LISTA

Listado que muestra 100 usuarios.
Y ahora le aplico un filtro y se quedan 50 usuarios.

------

UserList                                                            User
props                                                               props
state                                                               state




                                                                                    componentDidMount         componentDidUpdate
--------------------------------------------------------------------------------------------------------------------------------
User
--------------------------------------------------------------------------------------------------------------------------------
props:                                                      state:                      Al montar el componente        Dinámica
    datosUsuario    ---->                                       datosUsuario                        √                     x
    id              ---->   GET Servicio REST                   datosUsuario                        √                     x
    editable        ---->                                       editable                            √                     √
                                                                enEdicion
    onUpdateStart                                                                                   √                     x
    onUpdateEnd                                                                                     √                     x
    borrable                                                                                        √                     x
                                                                enBorrado=false
                                                                    -> true Cuando apretan el boton
--------------------------------------------------------------------------------------------------------------------------------
^^^^                                                        ^^^^
Pasar información del padre al componente                   Forzar un renderizado
vvvv                                                        vvvv
--------------------------------------------------------------------------------------------------------------------------------
UserList
--------------------------------------------------------------------------------------------------------------------------------
props:                                                      state:
    ninguna                                                     datosUsuarios:      [1,2,3,4,5]
                                                                usuarioEnEdicion:   -
--------------------------------------------------------------------------------------------------------------------------------

El usuarioEnEdicion (en UserList) se utilizara para rellenar el valor de editable (en User) al renderizar UserList
Cuando un User se pone en modo edición (Le apretamos en el botón editar):
    Hay que poner usuarioEnEdicion(del componente UserList) con el dato de ese usuario
    User puede acceder a los datos del UserList? NO... ENCAPSULACION DE CODIGO

Clase a                 Clase B
                            private prop b1 // Encapsulación
a le pide a b que cambie el valor (set)     // llamando a una función de B

---

Poner un botón de Eliminar -> Usuario

Cuando se haga click en ese botón -> preguntar si estamos seguros
                                  -> Si estamos seguros
                                        -> Llamamos a una función que nos hayan suministrado



public class Usuario{

    private boolean borrable;                           // ESTADO  = state Datos a nivel de instancia

    public Usuario (boolean borrable){                  // INICIALIZACION DE LA PROPIEDAD al crear el objeto
        this.nuevoBorrable=nuevoBorrable;
    }

    public void setBorrable(boolean nuevoBorrable){     // CAMBIO DE PROPIEDAD
        this.nuevoBorrable=nuevoBorrable;
    }
}


                                                    ? Si prop.borrable == true && state.enBorrado = false
            Usuario:Ivan                            |BORRAR|            ---> state.enBorrado = true

                                vvvvv
                                                    ? Si prop.borrable == true && state.enBorrado = true
            Usuario:Ivan                            |SI| |NO|           ----> state.enBorrador = false
                                                     |
                                                     |
                                                     v
                                                     llamar a una función que me hayan dicho

Pasos:
1 - Añadir la propiedad     borrable
1,5 - Añadir la propiedad   funcionALaQueLlamarCuandoConfirmenBorrado
2 - Añadir el estado        en borrado
3 - crear el metodo:        enBorrado -> cambiar en el estado en borrado = true
4 - crear el metodo:        yaNoEnBorrado -> cambiar en el estado en borrado = false
4,5 - crear el metodo:      borradoConfirmado ->
                                                    Llamar a la funcion que me hayan suministrado dinamicamente ????
                                                            prop.funcionALaQueLlamarCuandoConfirmenBorrado(EL USUARIO QUE SE BORRA)
                                                    yaNoEnBorrado()
5- render

    if ( prop.borrable == true)
        if( state.enBorrado = false ){
            <boton 
                click="enBorrado"
            >BORRAR</boton>
        }else{
            <boton 
                click="borradoConfirmado"
            >SI</boton>
            <boton 
                click="yaNoEnBorrado"
            >NO</boton>
        }
    }


    <button onClick="confirmarBorrado();" >Borrar</button>
    <script language="javascript>
        function confirmarBorrado(){
            confirm()....
        }
    </script>



User - Este es un componente que puede funcionar por si solo
    Comunicaciones con este componente:
        - Como mandarle datos/información
          - Propiedades.... Quien puede pasar propiedades a un componente???? Su padre.. el creador del componente WEB
                id: PropTypes.string,
                userData: PropTypes.object,
                editable: PropTypes.bool,
                onUpdateStart: PropTypes.func,
                onUpdateEnd: PropTypes.func,
                borrable: PropTypes.bool,
                onDelete: PropTypes.func,

        - Como nos manda datos/informacion
                Mediante funciones de callback! Invocando funciones
                Como pasamos esas funciones? Con las propiedades
                Y quien puede por tanto pasar esas funciones? De nuevo el padre

Todas las comunicaciones son:
    De padre a hijo
        De userList a User -> mediante propiedades
    De hijo a padre
        De user a su UserList -> mediante funciones de callback, definidas por el padre


REDUX: Es una libreria que nos permite definir un estado global, accesible desde cualquier componente

REDUX se basa en el concepto de STORE: Un store es un almacenamiento de ESTADOS

Dentro de REDUX se usan 2 conceptos:
    REDUCER: Un objeto que gestiona los estados referentes a una característica de mi aplicación
    ACTION:  Un action es una función que cambiar el estado de un Reducer

A pesar de que vamos a tener estados globales, me puede interesar tener esos estados agrupados por funcionalidad



Sea la app: Gestion de expedientes de XXXXX
Estados globales:                                           STORE
    Usuario logeado                                 \   
        datos del usuario logueado                   >      REDUCER
        tiempo de sesion                            /
    Expediente gestionado
        expediente que se está consultando
        Si estamos en modo edición o no
        Estado del expediente
    Usuarios gestioandos
        Si hay un usuario en edición
        Si hay un usuario en borrado
    Errores
        ErrorANotificar
        Historial de errores notificados
        Si el error ya ha sido notificado


Equivalente en JAVA:
    Store = HttpSession
    Solo que no tengo un único HttpSession.
    Un HttpSession es algo así como un MAP
    Pues lo que tengo es un Map de Maps
    Es decir, varios maps, cada uno identificado por una clave.


En un store, de define una cola de REDUCERS

STORE: APP expedientes
        REDUCER: datos del expediente
            Cada reducer gestionará un conjunto de ACCIONES
                ACCION: nuevoExpediente en tramitacion
        REDUCER: datos de usuario logeado
                ACCION: login
                ACCION: logout
        REDUCER: errores
                ACCION: notificarNuevoError
                ACCION: errorNotificado

Esas acciones hay que definirlas

Y lo que hacemos en Redux es al STORE:
APP expredientes le hacemos un "dispach" de una ACCION


Hasta aqui REDUX PURO Y DURO.

Pero nosotros estamos usando REACT-> REACT-REDUX
Que permite esta libreria:
Mapear en automático:
Los estados de REDUX <-> PROPIEDADES DE COMPONENTES REACT