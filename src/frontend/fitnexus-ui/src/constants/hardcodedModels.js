export const EXERCISES = [
    {
      "nombreEjercicio": "Press banca",
      "repeticion": 5,
      "serie": 5,
      "peso": 10,
      "cardio": "No"
    },
    {
      "nombreEjercicio": "Sentadillas",
      "repeticion": 10,
      "serie": 10,
      "peso": 10,
      "cardio": "No"
    },
    {
      "nombreEjercicio": "3 km andando",
      "repeticion": "NA",
      "serie": 1,
      "peso": "NA",
      "cardio": "Si"
    },
  ]

export const USUARIOS = [
    {
        "nombre": "Luke",
        "apellido": "Skywalker",
        "email": "luke@skywalker.com",
        "objetivo": "PERDER GRASA",
        "genero": "HOMBRE",
        "edad": 25,
        "peso": 80,
        "altura": 175,
        "clienteDesde": "2023-07-12 10:42 AM"
    },
    {
        "nombre": "Leia",
        "apellido": "Skywalker",
        "email": "leia@skywalker.com",
        "objetivo": "PERDER GRASA",
        "genero": "MUJER",
        "edad": 25,
        "peso": 80,
        "altura": 175,
        "clienteDesde": "2023-07-12 10:42 AM"
    }
]

export const RUTINAS = [
    {
      "id": 0,
      "nombreRutina": "string",
      "fechaInicio": "2024-10-13",
      "fechaFinal": "2024-10-13",
      "version": 0,
      "ejercicios": [
        {
          "id": 0,
          "nombreEjercicio": "string",
          "repeticion": 0,
          "serie": 0,
          "peso": 0,
          "cardioRealizado": true,
          "version": 0
        }
      ]
    }
  ]

  export const PLAN = [
    {
      "id": 0,
      "nombrePlan": "string",
      "fechaInicio": "2024-10-13",
      "fechaFinal": "2024-10-13",
      "version": 0,
      "rutinas": [
        {
          "id": 0,
          "nombreRutina": "string",
          "fechaInicio": "2024-10-13",
          "fechaFinal": "2024-10-13",
          "version": 0,
          "ejercicios": [
            {
              "id": 0,
              "nombreEjercicio": "string",
              "repeticion": 0,
              "serie": 0,
              "peso": 0,
              "cardioRealizado": true,
              "version": 0
            }
          ]
        }
      ]
    }
  ]

  export const NUTRI = [
    {
      "id": 0,
      "proteina": 0,
      "hidratoDeCarbono": 0,
      "grasa": 0,
      "kcal": 0,
      "fechaInicio": "2024-10-13",
      "fechaFinal": "2024-10-13",
      "version": 0
    }
  ]

  export const VALORACION = [
    {
      "id": 0,
      "comentario": "string",
      "version": 0,
      "cliente": {
        "id": 0,
        "fitNexusId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "nombre": "string",
        "apellido": "string",
        "email": "string",
        "role": "ADMIN",
        "objetivo": "PERDER_GRASA",
        "genero": "HOMBRE",
        "edad": 0,
        "peso": 0,
        "altura": 0,
        "entrenador": {
          "id": 0,
          "fitNexusId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "nombre": "string",
          "apellido": "string",
          "email": "string",
          "role": "ADMIN",
          "asesorNutricional": true
        }
      },
      "planDeEntrenamiento": {
        "id": 0,
        "nombrePlan": "string",
        "fechaInicio": "2024-10-13",
        "fechaFinal": "2024-10-13",
        "version": 0,
        "rutinas": [
          {
            "id": 0,
            "nombreRutina": "string",
            "fechaInicio": "2024-10-13",
            "fechaFinal": "2024-10-13",
            "version": 0,
            "ejercicios": [
              {
                "id": 0,
                "nombreEjercicio": "string",
                "repeticion": 0,
                "serie": 0,
                "peso": 0,
                "cardioRealizado": true,
                "version": 0
              }
            ]
          }
        ]
      }
    }
  ]