package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoAsignarRequest;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoDtoCrearRequest;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoDtoFechasRequest;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoDtoResponse;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.PlanEntrenamientoGetDTO;
import aorquerab.fitnexus.model.exception.*;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.repository.PlanDeEntrenamientoRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/planes"})
@Slf4j
public class PlanDeEntrenamientoController {
    private final PlanDeEntrenamientoRepository planDeEntrenamientoRepository;
    private final ClienteRepository clienteRepository;
    private final EntrenadorRepository entrenadorRepository;

    public PlanDeEntrenamientoController(PlanDeEntrenamientoRepository planDeEntrenamientoRepository, ClienteRepository clienteRepository, EntrenadorRepository entrenadorRepository) {
        this.planDeEntrenamientoRepository = planDeEntrenamientoRepository;
        this.clienteRepository = clienteRepository;
        this.entrenadorRepository = entrenadorRepository;
    }

    //TODO: Testear con postman
    //TODO: React, innecesario ya que devuelve todos los ejercicios de BBDD, util para testing
    @GetMapping
    public ResponseEntity<List<PlanDeEntrenamiento>> obtenerPlanes(){
        log.info("Ejecutando obtenerPlanes...");
        try {
            List<PlanDeEntrenamiento> planesDeEntrenamientoList = planDeEntrenamientoRepository.findAll();
            if (planesDeEntrenamientoList.isEmpty()) {
                log.warn("Planes de entrenamiento no encontradas en base de datos...");
                throw new PlanDeEntrenamientoNotFoundException("Planes de entrenamiento no encontrados...");
            }
            return ResponseEntity.status(HttpStatus.OK).body(planesDeEntrenamientoList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de planes de entrenamiento", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman
    //TODO: React, innecesario ya que devuelve todos los ejercicios de BBDD, util para testing
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
            if (planEntrenamientoDtoResponseList.isEmpty()) {
                log.warn("Planes de entrenamiento no encontradas en base de datos...");
                throw new PlanDeEntrenamientoNotFoundException("Planes de entrenamiento no encontrados...");
            }
            return ResponseEntity.status(HttpStatus.OK).body(planEntrenamientoDtoResponseList);
        } catch (Exception e) {
            log.warn("Error al obtener planesEntrenamientoDTO: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear en Postman
    //TODO: Testear en React
    @GetMapping("/plan/usuario/{fitNexusId}")
    public ResponseEntity<List<PlanEntrenamientoGetDTO>> obtenerPlanPorFitNexusId(@PathVariable String fitNexusId) {
        log.info("Ejecutando obtenerEjerciciosPorFitNexusId con el FitNexusId: {}...", fitNexusId);
        try {
            List<PlanDeEntrenamiento> planes = Collections.emptyList();
            Optional<Cliente> clienteOptional = clienteRepository.findByFitnexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            if (clienteOptional.isEmpty() && entrenadorOptional.isEmpty()) {
                log.warn("Usuario no encontrado con el fitNexusId: {}", fitNexusId);
                throw new UsuarioNotFoundException("Usuario no encontrado en BD: " + fitNexusId);
            }

            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                planes = cliente.getPlanDeEntrenamiento();
            }
            if (entrenadorOptional.isPresent()){
                Entrenador entrenador = entrenadorOptional.get();
                planes = entrenador.getPlanesDeEntrenamiento();
            }

            if (planes.isEmpty()) {
                log.warn("Planes no encontrados para el usuario con el fitNexusId: {}", fitNexusId);
                throw new RutinaNotFoundException("Planes no encontrados para el usuario con el fitNexusId: {}"
                        + fitNexusId);
            }

            List<PlanEntrenamientoGetDTO> planDtoRequestList = planes.stream()
                    .map(plan -> PlanEntrenamientoGetDTO.builder()
                            .nombrePlan(plan.getNombrePlan())
                            .fechaInicio(plan.getFechaInicio())
                            .fechaFinal(plan.getFechaFinal())
                            .rutinas(plan.getRutinas().stream()
                                    .map(rutina -> PlanEntrenamientoGetDTO.RutinaDTO.builder()
                                            .nombreRutina(rutina.getNombreRutina()).build()).collect(Collectors.toList()))
                            .build()).toList();

            return ResponseEntity.status(HttpStatus.OK).body(planDtoRequestList);
        } catch (Exception e) {
            log.warn("Error al obtener PlanEntrenamientoGetDTO: ", e);
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
        Entrenador entrenador = planDeEntrenamientoRepository.findByEntrenador_Email(entrenadorEmail)
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
    @PostMapping ("/fecha")
    public ResponseEntity<String> addFechaPlanEntrenamiento (
            @RequestBody PlanEntrenamientoDtoFechasRequest planEntrenamientoDto) {
        log.info("Ejecutando addFechaPlanEntrenamiento con el DTO: {}", planEntrenamientoDto);
        if(planEntrenamientoDto == null)
            throw new InvalidRequestException("Peticion para plan de entrenamiento no valida");
        String nombrePlan = planEntrenamientoDto.getNombrePlan();
        PlanDeEntrenamiento byNombrePlan =
                planDeEntrenamientoRepository.findByNombrePlan(nombrePlan)
                        .orElseThrow(()-> {
                            log.warn("Plan no encontrado con el nombre: {}", nombrePlan);
                            return new PlanDeEntrenamientoNotFoundException ("Plan no encontrado con el nombre: "
                                    + nombrePlan);
                        });

        byNombrePlan.setFechaInicio(planEntrenamientoDto.getFechaInicio());
        byNombrePlan.setFechaFinal(planEntrenamientoDto.getFechaFinal());

        planDeEntrenamientoRepository.save(byNombrePlan);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @PostMapping("/asignar-plan")
    public ResponseEntity<String> asignarPlanACliente(
        @RequestBody PlanEntrenamientoAsignarRequest planEntrenamientoAsignarRequest) {
        log.info("Ejecutando asignarPlanACliente con el DTO: {}", planEntrenamientoAsignarRequest);

        try {
            PlanDeEntrenamiento plan = planDeEntrenamientoRepository.findByNombrePlan(planEntrenamientoAsignarRequest.getNombrePlan())
                    .orElseThrow(() -> {
                        log.warn("Plan no encontrado con el nombre: {}", planEntrenamientoAsignarRequest.getNombrePlan());
                        return new PlanDeEntrenamientoNotFoundException("Plan no encontrado con el nombre: " + planEntrenamientoAsignarRequest.getNombrePlan());
                    });

            Cliente cliente = clienteRepository.findByFitnexusId(UUID.fromString(planEntrenamientoAsignarRequest.getClienteFitNexusId()))
                    .orElseThrow(() -> {
                        log.warn("Cliente no encontrado con el fitNexusId: {}", planEntrenamientoAsignarRequest.getClienteFitNexusId());
                        return new ClienteNotFoundException("Cliente no encontrado con el fitNexusId: " + planEntrenamientoAsignarRequest.getClienteFitNexusId());
                    });

            if (cliente.getPlanDeEntrenamiento().stream().anyMatch(p -> p.getNombrePlan().equals(planEntrenamientoAsignarRequest.getNombrePlan()))) {
                log.warn("El cliente ya tiene el plan asignado con el nombre: {}", planEntrenamientoAsignarRequest.getNombrePlan());
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El cliente ya tiene el plan asignado con el nombre: " + planEntrenamientoAsignarRequest.getNombrePlan());
            }

            //Usamos la tabla intermedia para asignar el plan al cliente
            cliente.getPlanDeEntrenamiento().add(plan);

            clienteRepository.save(cliente);

            return ResponseEntity.status(HttpStatus.OK).body("Plan asignado correctamente al cliente");

        } catch (Exception e) {
            log.error("Error al asignar el plan al cliente", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al asignar el plan al cliente");
        }
    }


    //TODO: DELETE controller
    // Para eliminar la asignacion de un plan a un cliente concreto

    //TODO: DELETE controller
    // Para borrar un plan




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

}
