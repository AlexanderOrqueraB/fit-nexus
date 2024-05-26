DROP TABLE IF EXIST ejercicio CASCADE;
DROP TABLE IF EXIST pauta_nutricional CASCADE;
DROP TABLE IF EXIST plan_de_entrenamiento CASCADE;
DROP TABLE IF EXIST rutina CASCADE;
DROP TABLE IF EXIST valoracion CASCADE;
DROP TABLE IF EXIST cliente CASCADE;
DROP TABLE IF EXIST entrenador CASCADE;

-- INTERMEDIATE TABLES
DROP TABLE IF EXIST Cliente_PautaNutricional CASCADE;
DROP TABLE IF EXIST PlanDeEntrenamiento_Rutina CASCADE;
DROP TABLE IF EXIST Rutina_Ejercicio CASCADE;
DROP TABLE IF EXIST Cliente_Ejercicio CASCADE;

CREATE TABLE IF NOT EXISTS ejercicio (
    id SERIAL PRIMARY KEY,
    nombre_ejercicio VARCHAR (100) NOT NULL,
    repeticion INT NOT NULL,
    serie INT NOT NULL,
    peso INT NOT NULL,
    cardio_realizado BOOLEAN,
    entrenador_id INT, --add to entity ?
    CONSTRAINT fk_entrenador_ejercicio
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id)
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
    entrenador_id INT, --add to entity ?
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
    entrenador_id INT, --add to entity ?
    CONSTRAINT fk_entrenador_plan
            FOREIGN KEY(entrenador_id)
            REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS rutina (
    id SERIAL PRIMARY KEY,
    nombre_rutina VARCHAR (100) NOT NULL,
    fecha_inicio DATE,
    fecha_final DATE,
    entrenador_id INT, --add to entity ?
    CONSTRAINT fk_entrenador_rutina
        FOREIGN KEY(entrenador_id)
        REFERENCES Entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS valoracion (
    id SERIAL PRIMARY KEY,
    comentario VARCHAR (100) NOT NULL,
    cliente_id INT, --add to entity ?
    plan_de_entrenamiento_id INT, --add to entity ?
    CONSTRAINT fk_cliente_valoracion
        FOREIGN KEY(cliente_id)
        REFERENCES cliente(id),
    CONSTRAINT fk_plan_de_entrenamiento
        FOREIGN KEY(plan_de_entrenamiento_id)
        REFERENCES plan_de_entrenamiento(id),
    version INT
);

CREATE TABLE IF NOT EXISTS cliente (
    id SERIAL PRIMARY KEY,
    fit_nexus_id uuid,
    nombre VARCHAR (100) NOT NULL,
    apellido VARCHAR (100) NOT NULL,
    nombre_de_usuario VARCHAR (100) NOT NULL,
    edad INT NOT NULL,
    peso INT NOT NULL,
    altura INT NOT NULL,
    genero BOOLEAN,
    email VARCHAR (100) NOT NULL,
    media_pasos INT NOT NULL,
    objetivo VARCHAR (100) NOT NULL,
    entrenador_id INT --add to entity ?
    CONSTRAINT fk_entrenador
        FOREIGN KEY(entrenador_id)
        REFERENCES entrenador(id),
    version INT
);

CREATE TABLE IF NOT EXISTS entrenador (
    id SERIAL PRIMARY KEY,
    fit_nexus_id uuid,
    nombre VARCHAR (100) NOT NULL,
    apellido VARCHAR (100) NOT NULL,
    nombre_de_usuario VARCHAR (100) NOT NULL,
    email VARCHAR (100) NOT NULL,
    asesor_nutricional BOOLEAN,
    version INT
);

-- INTERMEDIATE TABLES

-- Tabla intermedia Cliente_PautaNutricional
CREATE TABLE Cliente_PautaNutricional (
    cliente_id INT,
    pautanutricional_id INT,
    PRIMARY KEY(cliente_id, pautanutricional_id),
    CONSTRAINT fk_cliente
        FOREIGN KEY(cliente_id)
        REFERENCES Cliente(id),
    CONSTRAINT fk_pautanutricional
        FOREIGN KEY(pautanutricional_id)
        REFERENCES PautaNutricional(id)
);



-- Tabla intermedia PlanDeEntrenamiento_Rutina
CREATE TABLE PlanDeEntrenamiento_Rutina (
    plandeentrenamiento_id INT,
    rutina_id INT,
    PRIMARY KEY(plandeentrenamiento_id, rutina_id),
    CONSTRAINT fk_plandeentrenamiento_rutina
        FOREIGN KEY(plandeentrenamiento_id)
        REFERENCES PlanDeEntrenamiento(id),
    CONSTRAINT fk_rutina
        FOREIGN KEY(rutina_id)
        REFERENCES Rutina(id)
);


-- Tabla intermedia Rutina_Ejercicio
CREATE TABLE Rutina_Ejercicio (
    rutina_id INT,
    ejercicio_id INT,
    PRIMARY KEY(rutina_id, ejercicio_id),
    CONSTRAINT fk_rutina_ejercicio
        FOREIGN KEY(rutina_id)
        REFERENCES Rutina(id),
    CONSTRAINT fk_ejercicio
        FOREIGN KEY(ejercicio_id)
        REFERENCES Ejercicio(id)
);

-- Tabla intermedia Cliente_Ejercicio
CREATE TABLE Cliente_Ejercicio (
    cliente_id INT,
    ejercicio_id INT,
    PRIMARY KEY(cliente_id, ejercicio_id),
    CONSTRAINT fk_cliente_ejercicio
        FOREIGN KEY(cliente_id)
        REFERENCES Cliente(id),
    CONSTRAINT fk_ejercicio_cliente
        FOREIGN KEY(ejercicio_id)
        REFERENCES Ejercicio(id)
);
