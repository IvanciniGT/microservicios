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
                                            GET     ME da la info del usuario
                                            PUT     Modifico el usuario
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