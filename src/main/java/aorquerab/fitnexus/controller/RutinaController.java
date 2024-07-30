package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.repository.RutinaRepository;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/rutinas"})
@Slf4j
public class RutinaController {
    //TODO: Validate requestBody or pathVariable?
    private final RutinaRepository rutinaRepository;

    public RutinaController(RutinaRepository rutinaRepository) {
        this.rutinaRepository = rutinaRepository;
    }

    //GET
    @GetMapping
    public List<Rutina> getRutinas () {
        log.info("Ejecutando getRutinas...");
        return rutinaRepository.findAll();
    }

    //POST
    @SneakyThrows
    @PostMapping
    public ResponseEntity<Rutina> postRutina (
            @RequestBody Rutina rutina) {
        log.info("Ejecutando postRutina...");
        rutinaRepository.save(rutina);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
