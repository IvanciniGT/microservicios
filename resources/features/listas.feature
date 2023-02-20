Feature: El servicio de Listas de tareas

  Background: 
    Given que tengo un usuario con los datos:
    """
    usuario: Ivan
    email: ivan.osuna.ayuste@gmail.com
    password: password
    """
    And que nos hemos autenticado con el usuario "Ivan", con contraseña "password"

  Scenario: Solicitar las listas de tareas de un usuario

    When llame al servicio "/api/v1/listas" con método "GET"
    Then obtengo una respuesta con código "200"
    And obtengo una respuesta con el contenido JSON: "[]"
    
  Scenario: Dar de alta una lista de tareas
    When llame al servicio "/api/v1/listas" con método "POST"
    And el contenido JSON:
    """
    {
      "nombre": "Lista de tareas de prueba"
    }
    """
    Then obtengo una respuesta con código "201"
    And obtengo una respuesta con el contenido JSON:
    """
    {
      "id": 1,
      "nombre": "Lista de tareas de prueba"
    }
    """
  
  Scenario: Solicitar una lista de tareas
    Given que tengo una lista de tareas con los datos:
    """
    nombre: Lista de tareas de prueba
    """
    When llame al servicio "/api/v1/listas/1" con método "GET"
    Then obtengo una respuesta con código "200"
    And obtengo una respuesta con el contenido JSON:
    """
    {
      "id": 1,
      "nombre": "Lista de tareas de prueba"
    }
    """

  Scenario: Eliminar una lista de tareas
    Given que tengo una lista de tareas con los datos:
    """
    nombre: Lista de tareas de prueba
    """
    When llame al servicio "/api/v1/listas/1" con método "DELETE"
    Then obtengo una respuesta con código "204"
    And obtengo una respuesta con el contenido JSON:
    """
    {
      "id": 1,
      "nombre": "Lista de tareas de prueba"
    }
    """