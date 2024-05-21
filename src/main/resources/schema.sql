CREATE TABLE IF NOT EXISTS ejercicio (
    id INT NOT NULL,
    nombre_ejercicio VARCHAR (250) NOT NULL,
    repeticion INT NOT NULL,
    serie INT NOT NULL,
    peso INT NOT NULL,
    version INT,
    PRIMARY KEY (id)
);

--nombre_de_tabla_en_postgreSQL
-- variable_booleana BOOLEAN DEFAULT FALSE,
-- id SERIAL PRIMARY KEY


--CREATE TABLE usuario (
--    id SERIAL PRIMARY KEY,
--    nombre VARCHAR(100) NOT NULL,
--    email VARCHAR(100) UNIQUE NOT NULL,
--    password VARCHAR(100) NOT NULL,
--    tipo VARCHAR(10) NOT NULL -- 'entrenador' o 'cliente'
--);

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    tipo VARCHAR(10) NOT NULL -- 'entrenador' o 'cliente'
);


--CREATE TABLE entrenador (
--    id SERIAL PRIMARY KEY,
--    usuario_id INTEGER REFERENCES usuario(id),
--    experiencia INTEGER
--);

CREATE TABLE entrenador (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    experiencia INTEGER,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

--
--CREATE TABLE cliente (
--    id SERIAL PRIMARY KEY,
--    usuario_id INTEGER REFERENCES usuario(id),
--    fecha_nacimiento DATE
--);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    fecha_nacimiento DATE,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id)
);

--
--CREATE TABLE pauta_nutricional (
--    id SERIAL PRIMARY KEY,
--    nombre VARCHAR(100) NOT NULL,
--    descripcion TEXT,
--    entrenador_id INTEGER REFERENCES entrenador(id)
--);

CREATE TABLE pauta_nutricional (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    entrenador_id INTEGER,
    CONSTRAINT fk_entrenador FOREIGN KEY (entrenador_id) REFERENCES entrenador (id)
);

--
--CREATE TABLE cliente_pauta_nutricional (
--    cliente_id INTEGER REFERENCES cliente(id),
--    pauta_nutricional_id INTEGER REFERENCES pauta_nutricional(id),
--    PRIMARY KEY (cliente_id, pauta_nutricional_id)
--);

CREATE TABLE cliente_pauta_nutricional (
    cliente_id INTEGER NOT NULL,
    pauta_nutricional_id INTEGER NOT NULL,
    PRIMARY KEY (cliente_id, pauta_nutricional_id),
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    CONSTRAINT fk_pauta_nutricional FOREIGN KEY (pauta_nutricional_id) REFERENCES pauta_nutricional (id)
);
--
--CREATE TABLE componente_de_entrenamiento (
--    id SERIAL PRIMARY KEY,
--    tipo VARCHAR(20) NOT NULL -- 'plan', 'rutina', 'ejercicio'
--);

CREATE TABLE componente_de_entrenamiento (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL -- 'plan', 'rutina', 'ejercicio'
);
--
--CREATE TABLE plan_de_entrenamiento (
--    id SERIAL PRIMARY KEY,
--    nombre VARCHAR(100) NOT NULL,
--    descripcion TEXT,
--    componente_id INTEGER REFERENCES componente_de_entrenamiento(id)
--);
--

CREATE TABLE plan_de_entrenamiento (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    componente_id INTEGER,
    CONSTRAINT fk_componente FOREIGN KEY (componente_id) REFERENCES componente_de_entrenamiento (id)
);
--CREATE TABLE rutina (
--    id SERIAL PRIMARY KEY,
--    nombre VARCHAR(100) NOT NULL,
--    descripcion TEXT,
--    componente_id INTEGER REFERENCES componente_de_entrenamiento(id)
--);
--
CREATE TABLE rutina (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    componente_id INTEGER,
    CONSTRAINT fk_componente FOREIGN KEY (componente_id) REFERENCES componente_de_entrenamiento (id)
);
--CREATE TABLE ejercicio (
--    id SERIAL PRIMARY KEY,
--    nombre VARCHAR(100) NOT NULL,
--    descripcion TEXT,
--    componente_id INTEGER REFERENCES componente_de_entrenamiento(id)
--);
--
CREATE TABLE ejercicio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    componente_id INTEGER,
    CONSTRAINT fk_componente FOREIGN KEY (componente_id) REFERENCES componente_de_entrenamiento (id)
);
--CREATE TABLE plan_rutina (
--    plan_id INTEGER REFERENCES plan_de_entrenamiento(id),
--    rutina_id INTEGER REFERENCES rutina(id),
--    PRIMARY KEY (plan_id, rutina_id)
--);

CREATE TABLE plan_rutina (
    plan_id INTEGER NOT NULL,
    rutina_id INTEGER NOT NULL,
    PRIMARY KEY (plan_id, rutina_id),
    CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES plan_de_entrenamiento (id),
    CONSTRAINT fk_rutina FOREIGN KEY (rutina_id) REFERENCES rutina (id)
);

--CREATE TABLE rutina_ejercicio (
--    rutina_id INTEGER REFERENCES rutina(id),
--    ejercicio_id INTEGER REFERENCES ejercicio(id),
--    PRIMARY KEY (rutina_id, ejercicio_id)
--);

CREATE TABLE rutina_ejercicio (
    rutina_id INTEGER NOT NULL,
    ejercicio_id INTEGER NOT NULL,
    PRIMARY KEY (rutina_id, ejercicio_id),
    CONSTRAINT fk_rutina FOREIGN KEY (rutina_id) REFERENCES rutina (id),
    CONSTRAINT fk_ejercicio FOREIGN KEY (ejercicio_id) REFERENCES ejercicio (id)
);
--CREATE TABLE valoracion (
--    id SERIAL PRIMARY KEY,
--    cliente_id INTEGER REFERENCES cliente(id),
--    plan_id INTEGER REFERENCES plan_de_entrenamiento(id),
--    valor INTEGER NOT NULL,
--    comentario TEXT,
--    fecha DATE NOT NULL
--);
CREATE TABLE valoracion (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL,
    plan_id INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    comentario TEXT,
    fecha DATE NOT NULL,
    CONSTRAINT fk_cliente FOREIGN KEY (cliente_id) REFERENCES cliente (id),
    CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES plan_de_entrenamiento (id)
);

--Relaciones y Llaves Foráneas
--Usuario-Entrenador: entrenador.usuario_id referencia usuario.id.
--Usuario-Cliente: cliente.usuario_id referencia usuario.id.
--Entrenador-ComponenteDeEntrenamiento: La relación directa no se refleja explícitamente en una tabla pero se maneja a través de plan_de_entrenamiento, rutina y ejercicio.
--Cliente-PautaNutricional: Relación muchos a muchos mediante cliente_pauta_nutricional.
--PautaNutricional-Entrenador: pauta_nutricional.entrenador_id referencia entrenador.id.
--Cliente-PlanDeEntrenamiento: Relación muchos a muchos mediante valoracion.
--PlanDeEntrenamiento-Rutina: Relación muchos a muchos mediante plan_rutina.
--Rutina-Ejercicio: Relación muchos a muchos mediante rutina_ejercicio.

Relaciones y Llaves Foráneas
Usuario-Entrenador: entrenador.usuario_id referencia usuario.id con CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id).
Usuario-Cliente: cliente.usuario_id referencia usuario.id con CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id).
Entrenador-ComponenteDeEntrenamiento: La relación directa se maneja a través de las tablas plan_de_entrenamiento, rutina y ejercicio con componente_id.
Cliente-PautaNutricional: Relación muchos a muchos mediante cliente_pauta_nutricional con CONSTRAINT fk_cliente y CONSTRAINT fk_pauta_nutricional.
PautaNutricional-Entrenador: pauta_nutricional.entrenador_id referencia entrenador.id con CONSTRAINT fk_entrenador.
Cliente-PlanDeEntrenamiento: Relación muchos a muchos mediante valoracion con CONSTRAINT fk_cliente y CONSTRAINT fk_plan.
PlanDeEntrenamiento-Rutina: Relación muchos a muchos mediante plan_rutina con CONSTRAINT fk_plan y CONSTRAINT fk_rutina.
Rutina-Ejercicio: Relación muchos a muchos mediante rutina_ejercicio con CONSTRAINT fk_rutina y CONSTRAINT fk_ejercicio