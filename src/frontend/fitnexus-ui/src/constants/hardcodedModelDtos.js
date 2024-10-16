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

export const CLIENTES = [
    {
        "nombre": "Luke",
        "apellido": "Skywalker",
        "email": "luke@skywalker.com",
        "objetivo": "PERDER GRASA",
        "genero": "HOMBRE",
        "edad": 25,
        "peso": 80,
        "altura": 175,
        "clienteDesde": "2023-07-12"
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
        "clienteDesde": "2023-07-12"
    }
]

export const RUTINAS = [
  {
    "nombreRutina": "Torso Fuerza",
    "fechaInicio": "2024-10-13",
    "fechaFinal": "2024-12-13",
      "ejercicios": [
          {
              "nombreEjercicio": "Torso fuerza",
          },
          {
              "nombreEjercicio": "Torso fuerza",
          }
      ]
  }
]

  export const PLAN = [
    {
      "nombrePlan": "Definicion verano",
      "fechaInicio": "2024-10-13",
      "fechaFinal": "2024-10-13",
      "rutinas": [
          {
              "nombreRutina": "Torso fuerza",
              "ejercicios": [
                  {
                      "nombreEjercicio": "Torso fuerza",
                  },
                  {
                      "nombreEjercicio": "Torso fuerza",
                  }
              ]
          },
          {
              "nombreRutina": "Torso fuerza",
              "ejercicios": [
                  {
                      "nombreEjercicio": "Torso fuerza",
                  },
                  {
                      "nombreEjercicio": "Torso fuerza",
                  }
              ]
          }
      ]
    }
  ]

  export const NUTRI = [
    {
      "proteina": 0,
      "hidratoDeCarbono": 0,
      "grasa": 0,
      "kcal": 0,
      "fechaInicio": "2024-10-13",
      "fechaFinal": "2024-10-13",
    }
  ]

  export const VALORACION = [
    {
      "comentario": "Muy bien, un poco cansadx.",
        "planDeEntrenamiento":
            {
                "nombrePlan": "Hipertrofia Enero",
            }
    }
  ]