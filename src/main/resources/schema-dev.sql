DROP TABLE IF EXISTS ejercicio CASCADE;
DROP TABLE IF EXISTS plan_nutricional CASCADE;
DROP TABLE IF EXISTS plan_de_entrenamiento CASCADE;
DROP TABLE IF EXISTS rutina CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS entrenador CASCADE;

-- Tablas intermedias
DROP TABLE IF EXISTS cliente_plan_nutricional CASCADE;
DROP TABLE IF EXISTS plan_de_entrenamiento_rutina CASCADE;
DROP TABLE IF EXISTS rutina_ejercicio CASCADE;
DROP TABLE IF EXISTS cliente_ejercicio CASCADE;
DROP TABLE IF EXISTS cliente_rutina CASCADE;
DROP TABLE IF EXISTS cliente_plan_de_entrenamiento CASCADE;

DROP SEQUENCE IF EXISTS seq_log CASCADE;

-- Creación de secuencia
CREATE SEQUENCE seq_log
    START WITH 1
    INCREMENT BY 1;

-- Creación de tablas
CREATE TABLE IF NOT EXISTS entrenador (
    id SERIAL PRIMARY KEY,
    fit_nexus_id uuid,
    nombre VARCHAR (100) NOT NULL,
    apellido VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL,
    role VARCHAR (100) NOT NULL,
    version INT
);

CREATE TABLE IF NOT EXISTS cliente (
    id SERIAL PRIMARY KEY,
    fit_nexus_id uuid,
    nombre VARCHAR (100) NOT NULL,
    apellido VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL,
    role VARCHAR (100) NOT NULL,
    objetivo VARCHAR (100),
    genero VARCHAR (100),
    frecuenciaEjercicioSemanal VARCHAR (100),
    edad INT,
    peso INT,
    altura INT,
    cliente_desde DATE,
    entrenador_id INT,
    CONSTRAINT fk_entrenador
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS plan_nutricional (
    id SERIAL PRIMARY KEY,
    proteina INT NOT NULL,
    hidrato_de_carbono INT NOT NULL,
    grasa INT NOT NULL,
    kcal INT NOT NULL,
    fecha_inicio DATE,
    fecha_final DATE,
    entrenador_id INT,
    CONSTRAINT fk_entrenador_plan_nutricional
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS plan_de_entrenamiento (
    id SERIAL PRIMARY KEY,
    nombre_plan VARCHAR (100) NOT NULL,
    fecha_inicio DATE,
    fecha_final DATE,
    entrenador_id INT,
    CONSTRAINT fk_entrenador_plan_de_entrenamiento
            FOREIGN KEY(entrenador_id)
            REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS rutina (
    id SERIAL PRIMARY KEY,
    nombre_rutina VARCHAR (100) NOT NULL,
    fecha_inicio DATE,
    fecha_final DATE,
    entrenador_id INT,
    CONSTRAINT fk_entrenador_rutina
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS ejercicio (
    id SERIAL PRIMARY KEY,
    nombre_ejercicio VARCHAR (100) NOT NULL,
    repeticion INT,
    serie INT,
    peso INT,
    cardio BOOLEAN,
    entrenador_id INT,
    CONSTRAINT fk_entrenador_ejercicio
    FOREIGN KEY(entrenador_id)
    REFERENCES entrenador(id),
    version INT
);

INSERT INTO entrenador (fit_nexus_id, nombre, apellido, email, password, role, version)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'Obi-Wan', 'Kenobi', 'obiwan@jedi.com', 'blue123', 'ADMIN', 1),
    ('550e8400-e29b-41d4-a716-446655440001', 'Mace', 'Windu', 'mace@jedi.com', 'purple123', 'ADMIN', 1),
    ('550e8400-e29b-41d4-a716-446655440002', 'Yoda', 'Desconocido', 'yoda@jedi.com', 'green123', 'ADMIN', 1);

INSERT INTO cliente (fit_nexus_id, nombre, apellido, email, password, role, objetivo, genero, frecuenciaEjercicioSemanal, edad, peso, altura, cliente_desde, entrenador_id, version)
VALUES
    ('660e8400-e29b-41d4-a716-446655440000', 'Luke', 'Skywalker', 'luke@rebels.com', 'lightsaber123', 'USER', 'GANAR_MUSCULO', 'HOMBRE', 'ALTA', 25, 75, 180, '2023-01-01', 1, 1),
    ('660e8400-e29b-41d4-a716-446655440001', 'Leia', 'Organa', 'leia@rebels.com', 'alderaan123', 'USER', 'PERDER_PESO', 'MUJER', 'MODERADA', 23, 60, 165, '2023-01-02', 2, 1),
    ('660e8400-e29b-41d4-a716-446655440002', 'Han', 'Solo', 'han@smugglers.com', 'millennium123', 'USER', 'MANTENER_FORMA', 'HOMBRE', 'BAJA', 30, 85, 175, '2023-01-03', 3, 1),
    ('660e8400-e29b-41d4-a716-446655440003', 'Rey', 'Palpatine', 'rey@jedi.com', 'scavenger123', 'USER', 'GANAR_MUSCULO', 'MUJER', 'ALTA', 20, 55, 170, '2023-01-04', 1, 1),
    ('660e8400-e29b-41d4-a716-446655440004', 'Darth', 'Vader', 'vader@sith.com', 'darkside123', 'USER', 'PERDER_PESO', 'HOMBRE', 'MODERADA', 40, 120, 190, '2023-01-05', 2, 1);

INSERT INTO plan_nutricional (proteina, hidrato_de_carbono, grasa, kcal, fecha_inicio, fecha_final, entrenador_id, version)
VALUES
    (150, 300, 50, 2500, '2023-01-01', '2023-03-01', 1, 1), -- Plan de Obi-Wan
    (120, 250, 40, 2200, '2023-01-15', '2023-03-15', 2, 1), -- Plan de Mace Windu
    (200, 400, 60, 3000, '2023-02-01', '2023-04-01', 3, 1); -- Plan de Yoda

INSERT INTO rutina (nombre_rutina, fecha_inicio, fecha_final, entrenador_id, version)
VALUES
    ('Entrenamiento básico', '2023-01-01', '2023-01-31', 1, 1), -- Rutina de Obi-Wan
    ('Torso', '2023-01-15', '2023-02-15', 2, 1), -- Rutina de Mace Windu
    ('Pierna', '2023-02-01', '2023-03-01', 3, 1); -- Rutina de Yoda

INSERT INTO plan_de_entrenamiento (nombre_plan, fecha_inicio, fecha_final, entrenador_id, version)
VALUES
    ('Plan de Obi-Wan', '2023-01-01', '2023-03-01', 1, 1), -- Plan de Obi-Wan
    ('Plan de Windu', '2023-01-15', '2023-03-15', 2, 1), -- Plan de Mace Windu
    ('Plan de Yoda', '2023-02-01', '2023-04-01', 3, 1); -- Plan de Yoda

INSERT INTO ejercicio (nombre_ejercicio, repeticion, serie, peso, cardio, entrenador_id, version)
VALUES
    ('Press banca', 15, 3, NULL, FALSE, 1, 1), -- Ejercicio de Obi-Wan
    ('Peso muerto', 5, 5, 100, FALSE, 2, 1), -- Ejercicio de Mace Windu
    ('Sentadillas', 20, 3, NULL, TRUE, 2, 1), -- Ejercicio de Mace Windu
    ('Correr en cinta', 1, 1, NULL, TRUE, 3, 1); -- Ejercicio de Yoda

