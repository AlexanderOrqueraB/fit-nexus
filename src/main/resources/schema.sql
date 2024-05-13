CREATE TABLE IF NOT EXISTS ejercicio (
    id INT NOT NULL,
    nombre_ejercicio VARCHAR (250) NOT NULL,
    repeticion INT NOT NULL,
    serie INT NOT NULL,
    peso INT NOT NULL,
    version INT,
    PRIMARY KEY (id)
);
