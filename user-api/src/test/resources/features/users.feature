#language:es

Requisito: Servicio de usuarios

  Antecedentes:
    Dado un usuario
    Y el usuario tiene por nombre "Ivan"
    Y el usuario tiene por password "password"
    Y el usuario tiene por email "ivan.osuna.ayuste@gmail.com"
    Y el usuario guardado en la base de datos

    Dado un usuario
    Y el usuario tiene por nombre "Xavi"
    Y el usuario tiene por password "password0"
    Y el usuario tiene por email "xavi@gmail.com"
    Y el usuario guardado en la base de datos

  Esquema del escenario: Recuperar usuarios
    Cuando invoco al servicio "/v1/users" con método "GET"
    Entonces se recibe una respuesta con código "OK"
    Y la respuesta contiene un array JSON de longitud 2

    Y el elemento en la posición <posicion>, debe tener por "name": "<nombre>"
    Y el elemento en la posición <posicion>, debe tener por "password": "<password>"
    Y el elemento en la posición <posicion>, debe tener por "email": "<email>"

    Ejemplos:
      | posicion | nombre | password  | email                       |
      | 0        | Ivan   | password  | ivan.osuna.ayuste@gmail.com |
      | 1        | Xavi   | password0 | xavi@gmail.com              |


  Escenario: Borrar usuario que existe
    Cuando invoco al servicio "/v1/users/1" con método "DELETE"
    Entonces se recibe una respuesta con código "OK"
    Y la respuesta devuelve un JSON

    Y que debe tener por "name": "Ivan"
    Y que debe tener por "password": "password"
    Y que debe tener por "email": "ivan.osuna.ayuste@gmail.com"

    Cuando invoco al servicio "/v1/users" con método "GET"
    Entonces se recibe una respuesta con código "OK"
    Y la respuesta contiene un array JSON de longitud 1

    Y el elemento en la posición 0, debe tener por "name": "Xavi"
    Y el elemento en la posición 0, debe tener por "password": "password0"
    Y el elemento en la posición 0, debe tener por "email": "xavi@gmail.com"

  Escenario: Borrar usuario que no existe
    Cuando invoco al servicio "/v1/users/111" con método "DELETE"
    Entonces se recibe una respuesta con código "NOT FOUND"

  Escenario: Recuperar usuario que existe
    Cuando invoco al servicio "/v1/users/2" con método "GET"
    Entonces se recibe una respuesta con código "OK"
    Y la respuesta devuelve un JSON

    Y que debe tener por "name": "Xavi"
    Y que debe tener por "password": "password0"
    Y que debe tener por "email": "xavi@gmail.com"

  Escenario: Recuperar usuario que no existe
    Cuando invoco al servicio "/v1/users/111" con método "GET"
    Entonces se recibe una respuesta con código "NOT FOUND"
