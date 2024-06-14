
# FitNexus

Aplicación web de gestión de entrenamiento persona para entrenadores y sus clientes


## Documentación

Aplicación web que facilita a los entrenadores la gestión de sus clientes y les permite diseñar y asignar rutinas personalizadas. Del mismo modo permite a cualquier cliente establecer un enlace con un entrenador personal que le creará una rutina personalizada y/o asignará pautas nutricionales que le permita llegar a cumplir sus objetivos.

Los entrenadores serán por tanto capaces de diseñar planes de entrenamiento, con rutinas y ejercicios concretos que los clientes podrán consultar y realizar. También podrán ver a sus clientes y aceptar solicitudes, además de crear y asignar pautas nutricionales. Los clientes podrán guardar un registro de sus entrenamientos y modificarlos. Por último, ambos usuarios podrán crear su propio perfil, acceder a sus propios datos personales y realizar modificaciones.

Que no hace ésta aplicación: no está enfocada a la nutrición ni asignación de dietas específicas y, la comunicación entre entrenador y cliente no se hará a través de la aplicación.

## Generar Open API Docs (Swagger yaml) WIP

Utiliza openapi-gradle-plugin para generar open API docs, configuracion en gradle.build
bloque openApi {..}

Pasos:
1. Ejecuta el comando ```./gradlew clean build generateOpenApiDocs```
2. Copia build/docs/openapi.json en swagger editor, revisa y comparte!

## Consultar Open API Docs (Swagger yaml) al iniciar la aplicación

- localhost:8080/api-docs RAW JSON
- localhost:8080/swagger-ui/index.html SWAGGER UI

## Tech Stack

**Client:** React
**Server:** Spring

## Arrancar aplicación
Para aplicación completa (springboot + react)
Ejecutando: ./gradlew bootRun + abrir http://localhost:8080/

Para aplicación React (dentro de frontend/fitnexus-ui)
Ejecutando: npm start + abrir http://localhost:3030/

## Autor

- [@AlexanderOrqueraB](https://www.github.com/AlexanderOrqueraB)

