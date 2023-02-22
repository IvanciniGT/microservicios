Feature: Servicio de usuarios

  Background:
    Given un usuario
    And con el nombre "Ivan"
    And con el password "password"
    And con el email "ivan.osuna.ayuste@gmail.com"
    And el usuario guardado en la base de datos

    Given un usuario
    And con el nombre "Xavi"
    And con el password "password0"
    And con el email "xavi@gmail.com"
    And el usuario guardado en la base de datos

  Scenario Outline: Recuperar usuarios
    When invoco al servicio "/v1/users" con método "GET"
    Then se recibe una respuesta con código "OK"
    And la respuesta contiene un array JSON de longitud 2

    And el elemento en la posición <posicion>, debe tener por "name": "<nombre>"
    And el elemento en la posición <posicion>, debe tener por "password": "<password>"
    And el elemento en la posición <posicion>, debe tener por "email": "<email>"

    Examples:
      | posicion | nombre | password  | email                       |
      | 0        | Ivan   | password  | ivan.osuna.ayuste@gmail.com |
      | 1        | Xavi   | password0 | xavi@gmail.com              |


  Scenario: Borrar usuario que existe
    When invoco al servicio "/v1/users/1" con método "DELETE"
    Then se recibe una respuesta con código "OK"
    And la respuesta devuelve un JSON

    And que debe tener por "name": "Ivan"
    And que debe tener por "password": "password"
    And que debe tener por "email": "ivan.osuna.ayuste@gmail.com"

    When invoco al servicio "/v1/users" con método "GET"
    Then se recibe una respuesta con código "OK"
    And la respuesta contiene un array JSON de longitud 1

    And el elemento en la posición 0, debe tener por "name": "Xavi"
    And el elemento en la posición 0, debe tener por "password": "password0"
    And el elemento en la posición 0, debe tener por "email": "xavi@gmail.com"

  Scenario: Borrar usuario que no existe
    When invoco al servicio "/v1/users/111" con método "DELETE"
    Then se recibe una respuesta con código "NOT FOUND"

  Scenario: Recuperar usuario que existe
    When invoco al servicio "/v1/users/2" con método "GET"
    Then se recibe una respuesta con código "OK"
    And la respuesta devuelve un JSON

    And que debe tener por "name": "Xavi"
    And que debe tener por "password": "password0"
    And que debe tener por "email": "xavi@gmail.com"

  Scenario: Recuperar usuario que no existe
    When invoco al servicio "/v1/users/111" con método "GET"
    Then se recibe una respuesta con código "NOT FOUND"
