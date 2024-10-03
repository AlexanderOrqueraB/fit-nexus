DROP TABLE IF EXISTS ejercicio CASCADE;
DROP TABLE IF EXISTS pauta_nutricional CASCADE;
DROP TABLE IF EXISTS plan_de_entrenamiento CASCADE;
DROP TABLE IF EXISTS rutina CASCADE;
DROP TABLE IF EXISTS valoracion CASCADE;
DROP TABLE IF EXISTS cliente CASCADE;
DROP TABLE IF EXISTS entrenador CASCADE;

-- INTERMEDIATE TABLES
DROP TABLE IF EXISTS cliente_pauta_nutricional CASCADE;
DROP TABLE IF EXISTS plan_de_entrenamiento_rutina CASCADE;
DROP TABLE IF EXISTS rutina_ejercicio CASCADE;
DROP TABLE IF EXISTS cliente_ejercicio CASCADE;
DROP TABLE IF EXISTS cliente_rutina CASCADE;
DROP TABLE IF EXISTS cliente_plan_de_entrenamiento CASCADE;

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
    asesor_nutricional BOOLEAN,
    version INT
);

CREATE TABLE IF NOT EXISTS ejercicio (
    id SERIAL PRIMARY KEY,
    nombre_ejercicio VARCHAR (100) NOT NULL,
    repeticion INT NOT NULL,
    serie INT NOT NULL,
    peso INT NOT NULL,
    cardio_realizado BOOLEAN,
    entrenador_id INT,
    CONSTRAINT fk_entrenador_ejercicio
    FOREIGN KEY(entrenador_id)
    REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS pauta_nutricional (
    id SERIAL PRIMARY KEY,
    proteina INT NOT NULL,
    hidrato_de_carbono INT NOT NULL,
    grasa INT NOT NULL,
    kcal INT NOT NULL,
    fecha_inicio DATE,
    fecha_final DATE,
    entrenador_id INT,
    CONSTRAINT fk_entrenador_pauta_nutricional
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
    edad INT,
    peso INT,
    altura INT,
    entrenador_id INT,
    CONSTRAINT fk_entrenador
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS valoracion (
    id SERIAL PRIMARY KEY,
    comentario VARCHAR (100) NOT NULL,
    cliente_id INT,
    plan_de_entrenamiento_id INT,
    CONSTRAINT fk_cliente_valoracion
        FOREIGN KEY(cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_plan_de_entrenamiento
        FOREIGN KEY(plan_de_entrenamiento_id)
        REFERENCES plan_de_entrenamiento(id),
    version INT
);

-- INTERMEDIATE TABLES
CREATE TABLE IF NOT EXISTS cliente_pauta_nutricional (
    cliente_id INT,
    pauta_nutricional_id INT,
    PRIMARY KEY(cliente_id, pauta_nutricional_id),
    CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_pauta_nutricional
        FOREIGN KEY(pauta_nutricional_id)
        REFERENCES pauta_nutricional(id)
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
