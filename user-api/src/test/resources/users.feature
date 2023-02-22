Feature: Servicio de usuarios

  Background:
    Given un usuario con los datos
      """
      nombre: Ivan
      password: password
      email: ivan.osuna.ayuste@gmail.com
      """
    And un usuario con los datos
      """
      nombre: Xavi
      password: password
      email: xavi@xavi.com
      """

  Scenario Outline: Recuperar usuarios
    When invoco al servicio "/api/v1/users" con método "GET"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un array JSON de longitud "2"
     And el elemento en la posición <posicion>, debe tener por "nombre": <nombre>
     And el elemento en la posición <posicion>, debe tener por "password": <password>
     And el elemento en la posición <posicion>, debe tener por "email": <email>

    Examples:
        | posicion | nombre | password | email                       |
        | 0        | Ivan   | password | ivan.osuna.ayuste@gmail.com |
        | 1        | Xavi   | password | xavi@xavi.com               |

  Scenario: Eliminar usuario que existe
    When invoco al servicio "/api/v1/users/Ivan" con método "DELETE"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un JSON con el valor "true"
    When invoco al servicio "/api/v1/users" con método "GET"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un array JSON de longitud "1"
     And el elemento en la posición "0", debe tener por "nombre": "Xavi"

  Scenario: Eliminar usuario que no existe
    When invoco al servicio "/api/v1/users/Ruina" con método "DELETE"
    Then se recibe una respuesta con código "404"
     And la respuesta contiene un JSON con el valor "false"
    When invoco al servicio "/api/v1/users" con método "GET"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un array JSON de longitud "1"
     And el elemento en la posición "0", debe tener por "nombre": "Xavi"

  Scenario: Crear usuario que no existe
    When invoco al servicio "/api/v1/users" con método "POST"
     And envío un JSON con
     And el JSON contiene el campo "nombre" con el valor "Viçens"
     And el JSON contiene el campo "password" con el valor "password"
     And el JSON contiene el campo "email" con el valor "correo@correo.com"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un JSON con el valor "true"
    When invoco al servicio "/api/v1/users" con método "GET"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un array JSON de longitud "2"
     And el elemento en la posición "0", debe tener por "nombre": "Xavi"
     And el elemento en la posición "1", debe tener por "nombre": "Viçens"

  Scenario: Crear usuario que ya existe
    When invoco al servicio "/api/v1/users" con método "POST"
     And envío un JSON con
     And el JSON contiene el campo "nombre" con el valor "Xavi"
     And el JSON contiene el campo "password" con el valor "password"
     And el JSON contiene el campo "email" con el valor "correo@correo.com"
    Then se recibe una respuesta con código "409"
     And la respuesta contiene un JSON con el valor "false"
    When invoco al servicio "/api/v1/users" con método "GET"
    Then se recibe una respuesta con código "200"
     And la respuesta contiene un array JSON de longitud "2"
     And el elemento en la posición "0", debe tener por "nombre": "Xavi"
     And el elemento en la posición "1", debe tener por "nombre": "Viçens"