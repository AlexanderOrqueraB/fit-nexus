export const mockClients = [
    {
        "nombre": "Luke",
        "apellido": "Skywalker",
        "email": "luke@skywalker.com",
        "objetivo": "PERDER_GRASA",
        "genero": "HOMBRE",
        "frecuenciaEjercicioSemanal": "LIGERO",
        "edad": 25,
        "peso": 80,
        "altura": 175,
        "clienteDesde": "2023-07-12",
    },
    {
        "nombre": "Leia",
        "apellido": "Skywalker",
        "email": "leia@skywalker.com",
        "objetivo": "GANAR_MUSCULO",
        "genero": "MUJER",
        "frecuenciaEjercicioSemanal": "LIGERO",
        "edad": 25,
        "peso": 80,
        "altura": 175,
        "clienteDesde": "2023-07-12",
    },
];

export const CLIENTE = 
{
    "nombre": "Luke",
    "apellido": "Skywalker",
    "email": "luke@skywalker.com",
    "objetivo": "PERDER_GRASA",
    "genero": "HOMBRE",
    "frecuenciaEjercicioSemanal": "LIGERO",
    "edad": 25,
    "peso": 80,
    "altura": 175,
    "clienteDesde": "2023-07-12"
}

export const mockEntrenador = 
{
    "nombre": "Luke",
    "apellido": "Skywalker",
    "email": "luke@skywalker.com",
    "asesorNutricional": "false"
}


export const mockExercises = [
	{
		"id": 1,
		"nombreEjercicio": 'Dominadas',
		"repeticion": 10,
		"serie": 3,
		"peso": 0,
		"cardioRealizado": false,
	},
	{
		"id": 2,
		"nombreEjercicio": 'Press Banca',
		"repeticion": 12,
		"serie": 4,
		"peso": 50,
		"cardioRealizado": false,
	},
	{
		"id": 3,
		"nombreEjercicio": 'Caminar cinta',
		"repeticion": 1,
		"serie": 1,
		"peso": 0,
		"cardioRealizado": true,
		},
	];

export const mockAddExercises = [
    {
        "id": 5,
        "nombreEjercicio": "Curl"
      },
      {
        "id": 6,
        "nombreEjercicio": "Abs"
      }
];

export const mockRoutine = [
    {
        "id": 1,
        "nombreRutina": 'Rutina Fuerza',
        "fechaInicio": '2024-12-01',
        "fechaFinal": '2024-12-31',
        "ejercicios": [
        { "nombreEjercicio": 'Sentadilla' },
        { "nombreEjercicio": 'Peso Muerto' },
        ],
    },
];

export const mockAddRoutines  = [
    {
        "id": 15,
        "nombreRutina": "Torso423"
      },
      {
        "id": 16,
        "nombreRutina": "Pierna423"
      }
];

export const mockRoutinesBuilder = [
    {
      "id": 1,
      "nombreRutina": 'Rutina Torso',
      "fechaInicio": '2025-12-01',
      "fechaFinal": '2025-12-31',
      "ejercicios": [
        { "id": 1, "nombreEjercicio": 'Bench' },
        { "id": 2, "nombreEjercicio": 'Fondos' },
      ],
      "entrenador": [
        {
            "email": "entrenador@email.com",
        }
    ]
    },
    {
      "id": 2,
      "nombreRutina": 'Rutina Pierna',
      "fechaInicio": '2025-12-01',
      "fechaFinal": '2025-12-31',
      "ejercicios": [
        { "id": 3, "nombreEjercicio": 'Sentadilla' },
        { "id": 4, "nombreEjercicio": 'Deadlift' },
      ],
    }
  ];

export const mockPlans = [
    {
        "id": 1,
        "nombrePlan": 'Plan Noviembre',
        "fechaInicio": '2024-11-01',
        "fechaFinal": '2024-11-30',
        "rutinas": [{ "nombreRutina": 'Rutina de Pecho' }],
    },
];

export const planWithEntrenador  = 
{
  "nombrePlan": "Definicion verano",
  "fechaInicio": "2024-10-13",
  "fechaFinal": "2025-12-13",
  "entrenador": 
      {
          "email": "entrenador@email.com"
      }
}

export const NUTRI = [
    {
        "proteina": 0,
        "hidratoDeCarbono": 0,
        "grasa": 0,
        "kcal": 0,
        "fechaInicio": "2024-10-13",
        "fechaFinal": "2024-10-13"
    }
]
