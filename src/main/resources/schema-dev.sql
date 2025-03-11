DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS entrenador CASCADE;
DROP TABLE IF EXISTS ejercicio CASCADE;
DROP TABLE IF EXISTS rutina CASCADE;
DROP TABLE IF EXISTS plan_de_entrenamiento CASCADE;
DROP TABLE IF EXISTS plan_nutricional CASCADE;

-- INTERMEDIATE TABLES
DROP TABLE IF EXISTS cliente_ejercicio CASCADE;
DROP TABLE IF EXISTS cliente_plan_de_entrenamiento CASCADE;
DROP TABLE IF EXISTS cliente_plan_nutricional CASCADE;
DROP TABLE IF EXISTS cliente_rutina CASCADE;
DROP TABLE IF EXISTS plan_de_entrenamiento_rutina CASCADE;
DROP TABLE IF EXISTS rutina_ejercicio CASCADE;

DROP SEQUENCE IF EXISTS seq_log CASCADE;

CREATE SEQUENCE seq_log
    START WITH 1
    INCREMENT BY 1;

CREATE TABLE IF NOT EXISTS entrenador (
    id SERIAL PRIMARY KEY,
    fit_nexus_id uuid,
    nombre VARCHAR (100) NOT NULL,
    apellido VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL,
    role VARCHAR (100) NOT NULL,
    usuario_desde DATE,
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
    frecuencia_ejercicio_semanal VARCHAR (100),
    edad INT,
    peso INT,
    altura INT,
    usuario_desde DATE,
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

CREATE TABLE IF NOT EXISTS plan_de_entrenamiento (
    id SERIAL PRIMARY KEY,
    nombre_plan VARCHAR (100) NOT NULL,
    fecha_inicio DATE,
    fecha_final DATE,
    entrenador_id INT,
    cliente_id INT,
    CONSTRAINT fk_entrenador_plan_de_entrenamiento
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id),
    CONSTRAINT fk_cliente_plan_de_entrenamiento
        FOREIGN KEY(cliente_id)
        REFERENCES cliente(id),
    version INT
);

-- INTERMEDIATE TABLES
CREATE TABLE IF NOT EXISTS cliente_plan_nutricional (
    cliente_id INT,
    plan_nutricional_id INT,
    PRIMARY KEY(cliente_id, plan_nutricional_id),
    CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_plan_nutricional
        FOREIGN KEY(plan_nutricional_id)
        REFERENCES plan_nutricional(id)
);

CREATE TABLE IF NOT EXISTS plan_de_entrenamiento_rutina (
    plan_de_entrenamiento_id INT,
    rutina_id INT,
    PRIMARY KEY(plan_de_entrenamiento_id, rutina_id),
    CONSTRAINT fk_plan_de_entrenamiento_rutina
        FOREIGN KEY(plan_de_entrenamiento_id)
        REFERENCES plan_de_entrenamiento(id),
    CONSTRAINT fk_rutina
        FOREIGN KEY(rutina_id)
        REFERENCES rutina(id)
);

CREATE TABLE IF NOT EXISTS rutina_ejercicio (
    rutina_id INT,
    ejercicio_id INT,
    PRIMARY KEY(rutina_id, ejercicio_id),
    CONSTRAINT fk_rutina_ejercicio
        FOREIGN KEY(rutina_id)
        REFERENCES rutina(id),
    CONSTRAINT fk_ejercicio
        FOREIGN KEY(ejercicio_id)
        REFERENCES ejercicio(id)
);

CREATE TABLE IF NOT EXISTS cliente_ejercicio (
    cliente_id INT,
    ejercicio_id INT,
    PRIMARY KEY(cliente_id, ejercicio_id),
    CONSTRAINT fk_cliente_ejercicio
        FOREIGN KEY(cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_ejercicio_cliente
        FOREIGN KEY(ejercicio_id)
        REFERENCES ejercicio(id)
);

CREATE TABLE IF NOT EXISTS cliente_plan_de_entrenamiento (
     cliente_id INT,
     plan_de_entrenamiento_id INT,
     PRIMARY KEY(cliente_id, plan_de_entrenamiento_id),
     CONSTRAINT fk_cliente_plan_de_entrenamiento
         FOREIGN KEY(cliente_id)
             REFERENCES cliente(id),
     CONSTRAINT fk_plan_de_entrenamiento_cliente
         FOREIGN KEY(plan_de_entrenamiento_id)
             REFERENCES plan_de_entrenamiento(id)
);

CREATE TABLE IF NOT EXISTS cliente_rutina (
    cliente_id INT,
    rutina_id INT,
    PRIMARY KEY(cliente_id, rutina_id),
    CONSTRAINT fk_cliente_rutina
        FOREIGN KEY(cliente_id)
            REFERENCES cliente(id),
    CONSTRAINT fk_rutina_cliente
        FOREIGN KEY(rutina_id)
            REFERENCES rutina(id)
);
-- INTERMEDIATE TABLES

INSERT INTO entrenador (id, fit_nexus_id, nombre, apellido, email, password, role, usuario_desde, version)
VALUES
    (4, '550e8400-e29b-41d4-a716-446655440000', 'Obi-Wan', 'Kenobi', 'obiwan@jedi.com', '$2a$10$fFFxj01q6x1sxK2zapjejOt7GF21zUUMMB9WcwcdWXpwVUBNMO2Yi', 'ADMIN', '2023-01-01', 1), --pass: blue123
    (5, '550e8400-e29b-41d4-a716-446655440001', 'Mace', 'Windu', 'mace@jedi.com', '$2a$10$ITecDgFJaNEec5I1wNsnTeVcoy5tDJvFFAQd2bPxgE/c//PsBjANO', 'ADMIN', '2023-01-01', 1), --pass: purple123
    (6, '550e8400-e29b-41d4-a716-446655440002', 'Yoda', 'Desconocido', 'yoda@jedi.com', '$2a$10$8FmB3dHg0I86ng5xr.3Feuya7sd5R5AWEy4bFPsdfBwvmXBf2UFE.', 'ADMIN', '2023-01-01', 1); --pass: green123

INSERT INTO cliente (id, fit_nexus_id, nombre, apellido, email, password, role, objetivo, genero, frecuencia_ejercicio_semanal, edad, peso, altura, usuario_desde, entrenador_id, version)
VALUES
    (5,'660e8400-e29b-41d4-a716-446655440000', 'Luke', 'Skywalker', 'luke@rebels.com', '$2a$10$R/z/V0MPpGHF6AAoHNFs2.b.fkgk31ZQgoSE1TsF2/Re4Hav1/Zbq', 'USER', 'GANAR_MUSCULO', 'HOMBRE', 'FUERTE', 25, 75, 180, '2023-01-01', 4, 1), --pass: lightsaber123
    (6,'660e8400-e29b-41d4-a716-446655440001', 'Leia', 'Organa', 'leia@rebels.com', '$2a$10$uGAAmuqupe9Ig6t2j9jA6ezBZEvPNdN3ukiikKS/oG3hNIYRoPsp2', 'USER', 'PERDER_PESO', 'MUJER', 'MODERADO', 23, 60, 165, '2023-01-02', 5, 1), --pass: alderaan123
    (7,'660e8400-e29b-41d4-a716-446655440002', 'Han', 'Solo', 'han@smugglers.com', '$2a$10$B9OsKAT3m/Y8KGt/UqcLOuUWc/z8tFf0Nxx34rtxTcj6CDszjC4Bi', 'USER', 'MANTENER_FORMA', 'HOMBRE', 'MODERADO', 30, 85, 175, '2023-01-03', 6, 1), --pass: millennium123
    (8,'660e8400-e29b-41d4-a716-446655440003', 'Rey', 'Palpatine', 'rey@jedi.com', '$2a$10$8lP2mP33EMEe9jfDhvJYiOGfr/mnsZX8F49g4C4YTASNY5MLoYgDa', 'USER', 'GANAR_MUSCULO', 'MUJER', 'MUY_FUERTE', 20, 55, 170, '2023-01-04', 4, 1), --pass: scavenger123
    (9,'660e8400-e29b-41d4-a716-446655440004', 'Darth', 'Vader', 'vader@sith.com', '$2a$10$gumkdc5ohc7ero/QVGZJEOxBRYlKWZpZnYWRmcJKrLgGsvPXy14Se', 'USER', 'PERDER_PESO', 'HOMBRE', 'POCO_NADA', 40, 120, 190, '2023-01-05', 5, 1); --pass: darkside123

INSERT INTO plan_nutricional (proteina, hidrato_de_carbono, grasa, kcal, fecha_inicio, fecha_final, entrenador_id, version)
VALUES
    (150, 300, 50, 2500, '2023-01-01', '2023-03-01', 4, 1), -- Plan de Obi-Wan
    (120, 250, 40, 2200, '2023-01-15', '2023-03-15', 5, 1), -- Plan de Mace Windu
    (200, 400, 60, 3000, '2023-02-01', '2023-04-01', 6, 1); -- Plan de Yoda

INSERT INTO rutina (nombre_rutina, fecha_inicio, fecha_final, entrenador_id, version)
VALUES
    ('Entrenamiento basico', '2023-01-01', '2023-01-31', 4, 1), -- Rutina de Obi-Wan
    ('Torso', '2023-01-15', '2023-02-15', 5, 1), -- Rutina de Mace Windu
    ('Pierna', '2023-02-01', '2023-03-01', 6, 1); -- Rutina de Yoda

INSERT INTO plan_de_entrenamiento (nombre_plan, fecha_inicio, fecha_final, entrenador_id, cliente_id, version)
VALUES
    ('Plan de Obi-Wan', '2023-01-01', '2023-03-01', 4, 5, 1), -- Plan de Obi-Wan
    ('Plan de Windu', '2023-01-15', '2023-03-15', 5, 6, 1), -- Plan de Mace Windu
    ('Plan de Yoda', '2023-02-01', '2023-04-01', 6, 7, 1); -- Plan de Yoda

INSERT INTO ejercicio (nombre_ejercicio, repeticion, serie, peso, cardio, entrenador_id, version)
VALUES
    ('Press banca', 15, 3, 120, FALSE, 4, 1), -- Ejercicio de Obi-Wan
    ('Peso muerto', 5, 5, 150, FALSE, 5, 1), -- Ejercicio de Mace Windu
    ('Sentadillas', 20, 3, 140, FALSE, 5, 1), -- Ejercicio de Mace Windu
    ('Correr en cinta', 1, 1, NULL, TRUE, 6, 1); -- Ejercicio de Yoda