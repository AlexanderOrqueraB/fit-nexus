package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.ENDPOINT_ROOT;

@RestController
@RequestMapping({ENDPOINT_ROOT + "/entrenador"})
@Slf4j
public class EntrenadorController {
    private final EntrenadorRepository entrenadorRepository;

    public EntrenadorController(EntrenadorRepository entrenadorRepository) {
        this.entrenadorRepository = entrenadorRepository;
    }

    @GetMapping
    public List<Entrenador> getEntrenadores(){
        log.info("Ejecutando getEntrenadores...");
        return entrenadorRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Entrenador> postEntrenador (
            @RequestBody Entrenador entrenador) {
        log.info("Ejecutando postEntrenador...");
        entrenadorRepository.save(entrenador);
        //TODO: add log after post execution
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
