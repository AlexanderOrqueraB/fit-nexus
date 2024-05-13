package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.workout.Ejercicio;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ejercicio")
@Slf4j
public class EjercicioController {

    @GetMapping("/get")
    public ResponseEntity<String> getDummyController() {
        log.info("Ejecutando dummy GET ENDPOINT...");
        String body = "Dummy GET ejecutado correctamente!";
        return new ResponseEntity<>(body,HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<String> postDummyController() {
        log.info("Ejecutando dummy POST ENDPOINT...");
        String body = "Dummy POST ejecutado correctamente!";
        return new ResponseEntity<>(body,HttpStatus.OK);
    }

    //GET Ejercicio
    @GetMapping
    public ResponseEntity<Ejercicio> ejercicioGet() {
        log.info("EjercicioGet ejecutado");
        Ejercicio ejercicio = new Ejercicio(1,"Press banca",2,2,30);
        return new ResponseEntity<>(ejercicio,HttpStatus.CREATED);
    }

    //POST Ejercicio
    @PostMapping
    public ResponseEntity<Ejercicio> ejercicioPost(@Valid @RequestBody Ejercicio ejercicio) {
        log.info("EjercicioPost ejecutado");
        return new ResponseEntity<>(ejercicio,HttpStatus.CREATED);
    }
}
