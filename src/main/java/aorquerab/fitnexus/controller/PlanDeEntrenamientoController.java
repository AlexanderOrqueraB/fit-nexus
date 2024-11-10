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
    public ResponseEntity<PlanDeEntrenamiento> crearPlan (
            @RequestBody PlanDeEntrenamiento planDeEntrenamiento) {
        log.info("Ejecutando postPlanes...");
        planDeEntrenamientoRepository.save(planDeEntrenamiento);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //TODO: GET Controller
    // para obtener lista de planes
    //TODO: GET Controller
    // para obtener lista de planesDTO
    //TODO: GET Controller
    // para obtener plan por id
    //TODO: GET Controller
    // para obtener plan por nombreDePlan

    //TODO: POST Controller
    // para crear un plan
    //TODO: POST Controller
    // para añadir una rutina a un plan por idRutina o nombreRutina
    //TODO: POST Controller
    // para añadir una lista de rutinas

    //TODO: DELETE Controller
    // para eliminar una lista de rutinas

    //TODO: PUT Controller
    // para modificar datos de un plan (nombre o fechas o ??)

    //TODO: DELETE controller
    // para eliminar una rutina de un plan

    //TODO: DELETE controller
    // Para borrar un plan



    //TODO: POST controller
    // Para asignar un plan a un cliente concreto

    //TODO: DELETE controller
    // Para eliminar la asignacion de un plan a un cliente concreto

    //TODO: GET Controller
    // Obtener los clientes asignados a un plan concreto

}
