package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Valoracion;
import aorquerab.fitnexus.repository.ValoracionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/valoraciones"})
@Slf4j
public class ValoracionController {
    private final ValoracionRepository valoracionRepository;

    public ValoracionController(ValoracionRepository valoracionRepository) {
        this.valoracionRepository = valoracionRepository;
    }

    @GetMapping
    public List<Valoracion> getValoracion(){
        log.info("Ejecutando getValoracion...");
        return valoracionRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Valoracion> postValoracion (
            @RequestBody Valoracion valoracion) {
        log.info("Ejecutando postValoracion...");
        valoracionRepository.save(valoracion);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
