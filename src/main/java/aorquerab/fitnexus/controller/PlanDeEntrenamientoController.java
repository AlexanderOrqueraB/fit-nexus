package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoDtoCrearRequest;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoDtoResponse;
import aorquerab.fitnexus.model.exception.EntrenadorNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.PlanDeEntrenamientoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
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

    //TODO: Testear con postman
    @GetMapping
    public ResponseEntity<List<PlanDeEntrenamiento>> obtenerPlanes(){
        log.info("Ejecutando obtenerPlanes...");
        try {
            List<PlanDeEntrenamiento> planesDeEntrenamientoList = planDeEntrenamientoRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(planesDeEntrenamientoList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de planes de entrenamiento", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman
    @GetMapping("/planes-entrenamiento-dto")
    public ResponseEntity<List<PlanEntrenamientoDtoResponse>> obtenerPlanesEntrenamientoDTO() {
        log.info("Ejecutando obtenerPlanesEntrenamientoDTO...");
        try {
            List<PlanEntrenamientoDtoResponse> planEntrenamientoDtoResponseList =
                    planDeEntrenamientoRepository.findAll().stream()
                            .map(planes -> {
                                PlanEntrenamientoDtoResponse.Cliente clienteDTO = null;
                                PlanEntrenamientoDtoResponse.Entrenador entrenadorDTO = null;
                                if (planes.getEntrenador() != null) {
                                    Entrenador entrenador = planes.getEntrenador();
                                    log.info("Entrenador asociado al plan: {}", entrenador);
                                    entrenadorDTO = PlanEntrenamientoDtoResponse.Entrenador.builder()
                                            .email(entrenador.getEmail())
                                            .build();
                                }
                                if (planes.getCliente() != null) {
                                    Cliente cliente = planes.getCliente();
                                    log.info("Cliente asociado al plan: {}", cliente);
                                    clienteDTO = PlanEntrenamientoDtoResponse.Cliente.builder()
                                            .email(cliente.getEmail())
                                            .build();
                                }
                                return PlanEntrenamientoDtoResponse.builder()
                                        .nombrePlan(planes.getNombrePlan())
                                        .fechaInicio(planes.getFechaInicio())
                                        .fechaFinal(planes.getFechaFinal())
                                        .entrenador(entrenadorDTO)
                                        .cliente(clienteDTO)
                                            .build();
                            }).toList();
            return ResponseEntity.status(HttpStatus.OK).body(planEntrenamientoDtoResponseList);
        } catch (Exception e) {
            log.warn("Error al obtener planesEntrenamientoDTO: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman
    @PostMapping
    public ResponseEntity<String> crearPlanEntrenamiento (
            @RequestBody PlanEntrenamientoDtoCrearRequest planEntrenamientoDto) {
        log.info("Ejecutando crearPlanEntrenamiento con el DTO: {}", planEntrenamientoDto);
        if(planEntrenamientoDto == null)
            throw new InvalidRequestException("Peticion para plan de entrenamiento no valida");
        String entrenadorEmail = planEntrenamientoDto.getEntrenador().getEmail();
        Entrenador entrenador = planDeEntrenamientoRepository.findByEmail(entrenadorEmail)
                .orElseThrow(() -> {
                    log.warn("Entrenador no encontrado por el email: {}", entrenadorEmail);
                    return new EntrenadorNotFoundException("Entrenador no encontrado con el email: " + entrenadorEmail);
                });
        PlanEntrenamientoDtoCrearRequest.Entrenador entrenadorDTO = PlanEntrenamientoDtoCrearRequest.Entrenador.builder()
                .email(entrenador.getEmail())
                .build();

        PlanDeEntrenamiento planDeEntrenamiento = PlanDeEntrenamiento.builder()
                .nombrePlan(planEntrenamientoDto.getNombrePlan())
                .entrenador(entrenador)
                .build();

        planDeEntrenamientoRepository.save(planDeEntrenamiento);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //TODO: POST Controller
    // para añadir fechas un plan

    //TODO: POST Controller
    // para asociar cliente a un plan


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
