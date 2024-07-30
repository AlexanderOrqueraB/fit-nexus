package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.repository.PautaNutricionalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/pautas"})
@Slf4j
public class PautaNutricionalController {
    private final PautaNutricionalRepository pautaNutricionalRepository;

    public PautaNutricionalController(PautaNutricionalRepository pautaNutricionalRepository) {
        this.pautaNutricionalRepository = pautaNutricionalRepository;
    }

    @GetMapping
    public List<PautaNutricional> getPauta(){
        log.info("Ejecutando getPauta...");
        return pautaNutricionalRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<PautaNutricional> postPauta (
            @RequestBody PautaNutricional pautaNutricional) {
        log.info("Ejecutando postPauta...");
        pautaNutricionalRepository.save(pautaNutricional);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
