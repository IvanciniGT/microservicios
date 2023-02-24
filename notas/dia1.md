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
