package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.repository.PlanDeEntrenamientoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/planes"})
@Slf4j
public class PlanDeEntrenamientoController {
    private final PlanDeEntrenamientoRepository planDeEntrenamientoRepository;

    public PlanDeEntrenamientoController(PlanDeEntrenamientoRepository planDeEntrenamientoRepository) {
        this.planDeEntrenamientoRepository = planDeEntrenamientoRepository;
    }

    @GetMapping
    public List<PlanDeEntrenamiento> getPlanes(){
        log.info("Ejecutando getPlanes...");
        return planDeEntrenamientoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<PlanDeEntrenamiento> postPlan (
            @RequestBody PlanDeEntrenamiento planDeEntrenamiento) {
        log.info("Ejecutando postPlanes...");
        planDeEntrenamientoRepository.save(planDeEntrenamiento);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
