package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.*;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.response.PlanEntrenamientoGetDTO;
import aorquerab.fitnexus.model.exception.*;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.repository.PlanDeEntrenamientoRepository;
import aorquerab.fitnexus.repository.intermediate.PlanRutinaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
    private final PlanRutinaRepository planRutinaRepository;

    public PlanDeEntrenamientoController(PlanDeEntrenamientoRepository planDeEntrenamientoRepository, ClienteRepository clienteRepository, EntrenadorRepository entrenadorRepository, PlanRutinaRepository planRutinaRepository) {
        this.planDeEntrenamientoRepository = planDeEntrenamientoRepository;
        this.clienteRepository = clienteRepository;
        this.entrenadorRepository = entrenadorRepository;
        this.planRutinaRepository = planRutinaRepository;
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

    //TODO: Testear en Postman y React NEW UI
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
                            .id(plan.getId())
                            .nombrePlan(plan.getNombrePlan())
                            .fechaInicio(plan.getFechaInicio())
                            .fechaFinal(plan.getFechaFinal())
                                .rutinas(plan.getRutinas().stream()
                                        .map(rutina -> PlanEntrenamientoGetDTO.RutinaDTO.builder()
                                                .id(rutina.getId())
                                                .nombreRutina(rutina.getNombreRutina())
                                                    .build())
                                .collect(Collectors.toList()))
                            .build()).toList();

            return ResponseEntity.status(HttpStatus.OK).body(planDtoRequestList);
        } catch (Exception e) {
            log.warn("Error al obtener PlanEntrenamientoGetDTO: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }
    }

    //TODO: Testear en Postman y React NEW UI
    @PostMapping("{fitNexusId}")
    public ResponseEntity<String> crearPlanEntrenamiento (@PathVariable String fitNexusId,
            @RequestBody PlanEntrenamientoDtoRequest planEntrenamientoDtoCrearRequest) {

        log.info("Ejecutando crearPlanEntrenamiento con el DTO: {}", planEntrenamientoDtoCrearRequest);

        Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
        if (entrenadorOptional.isEmpty()) {
            log.warn("Entrenador no encontrado en base de datos con el fitNexusId: {}", fitNexusId);
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + fitNexusId);
        }

        if(planEntrenamientoDtoCrearRequest == null) {
            throw new InvalidRequestException("Peticion para plan de entrenamiento no valida");
        }

        PlanDeEntrenamiento planDeEntrenamientoCreado = PlanDeEntrenamiento.builder()
                .nombrePlan(planEntrenamientoDtoCrearRequest.getNombrePlan())
                .entrenador(entrenadorOptional.get())
                .build();
        log.info("crearPlanEntrenamiento ejecutado con: {}", planDeEntrenamientoCreado);
        planDeEntrenamientoRepository.save(planDeEntrenamientoCreado);

        log.info("Plan de entrenamiento guardado correctamente en BD: {}", planDeEntrenamientoCreado);
        return ResponseEntity.status(HttpStatus.CREATED).body("Plan de entrenamiento guardado correctamente en BD:"
        + planDeEntrenamientoCreado);
    }

    //TODO: Testear en Postman y React NEW UI
    @PutMapping("/{fitNexusId}")
        public ResponseEntity<String> actualizarPlan (@PathVariable String fitNexusId, 
            @RequestBody PlanEntrenamientoDtoRequest planEntrenamientoDtoRequest) {
        log.info("Ejecutando actualizarPlan con esta planEntrenamientoDtoRequest: {}", planEntrenamientoDtoRequest);

        Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
        if (entrenadorOptional.isEmpty()) {
            log.warn("Entrenador no encontrado en base de datos con el fitNexusId: {}", fitNexusId);
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + fitNexusId);
        }

        PlanDeEntrenamiento planById = planDeEntrenamientoRepository.findByNombrePlan(planEntrenamientoDtoRequest.getNombrePlan());

        if(planById == null) {
            log.warn("Plan de entrenamiento no encontrado en base de datos con el nombre: {}", planEntrenamientoDtoRequest.getNombrePlan());
            throw new PlanDeEntrenamientoNotFoundException("Plan de entrenamiento no encontrado en BD: " + planEntrenamientoDtoRequest.getNombrePlan());
        }

        Entrenador entrenador = entrenadorOptional.get();
        planById.setEntrenador(entrenador);

        //Actualizas solo los campos enviados (distintos de null)
        if(planEntrenamientoDtoRequest.getNombrePlan() != null)
            planById.setNombrePlan(planEntrenamientoDtoRequest.getNombrePlan());

        log.info("Plan de entrenamiento actualizado: {}", planById);

        PlanDeEntrenamiento planActualizado = planDeEntrenamientoRepository.save(planById);

        log.info("Plan de entrenamiento actualizado: {}", planActualizado);
        return ResponseEntity.status(HttpStatus.OK).body("Plan de entrenamiento actualizad correctamente en BD");

    }

    //TODO: Testear en Postman y React NEW UI
    @DeleteMapping("/{nombrePlan}")
    public ResponseEntity<String> eliminarPlanDeEntrenamiento (@PathVariable String nombrePlan) {
        
        log.info("Ejecutando eliminarPlanDeEntrenamiento con el nombre: {}", nombrePlan);

        try {
            if (nombrePlan == null) {
                throw new InvalidRequestException("Petición de plan de entrenamiento no válida");
            }
            PlanDeEntrenamiento planDeEntrenamientoByNombre = planDeEntrenamientoRepository.findByNombrePlan(nombrePlan);

            if (planDeEntrenamientoByNombre == null) {
                log.warn("Plan de entrenamiento no encontrado en base de datos con el nombre: {}", nombrePlan);
                throw new PlanDeEntrenamientoNotFoundException("Plan de entrenamiento no encontrado en BD: " + nombrePlan);
            }
    
            log.info("Plan de entrenamiento a eliminar: {}", planDeEntrenamientoByNombre);
            planDeEntrenamientoRepository.delete(planDeEntrenamientoByNombre);
    
            return ResponseEntity.status(HttpStatus.OK).body("Plan de entrenamiento borrado correctamente");

        } catch (Exception e) {
            log.warn("Error al eliminar el plan de entrenamiento", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al eliminar el plan de entrenamiento");
        }
    }

    //TODO: Testear en Postman y React NEW UI
    // Al agregar y eliminar listas de rutinas: Verificar que todas las relaciones se procesen correctamente.
    @Transactional
    @PutMapping ("/plan/rutinas/{idPlan}")
    public ResponseEntity<String> addRutinasToPlan (@PathVariable Long idPlan,
                                                    @RequestBody RutinasListDTO rutinasListDTO) {
        log.info("Ejecutando addRutinasToPlan con esta lista de rutinasListDTO: {} y este plan con el id: {}"
                ,rutinasListDTO, idPlan);

        if (!planDeEntrenamientoRepository.existsById(idPlan)) {
            throw new PlanDeEntrenamientoNotFoundException("Plan de entrenamiento no encontrado: " + idPlan);
        }

        List <RutinasListDTO.RutinaDTO> rutinasFromDto = rutinasListDTO.getRutinas();
        List <Long> idRutinasList = rutinasFromDto.stream().map(RutinasListDTO.RutinaDTO::getId).toList();

        try {
            idRutinasList.forEach(
                    rutinaId -> planRutinaRepository.addRutinaToPlan(idPlan,rutinaId)
            );

            return ResponseEntity.status(HttpStatus.OK).body("Rutinas añadidas correctamente al plan de entrenamiento");

        } catch (RuntimeException e) {
            log.warn("Error al intentar añadir una rutina al plan de entrenamiento", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar añadir una rutina al plan de entrenamiento");
        }
    }

    //TODO: Testear en Postman y React NEW UI
    // Agregar y eliminar listas de rutinas: Verifica que todas las relaciones se procesen correctamente.
    @Transactional
    @DeleteMapping("/plan/rutinas/{idPlan}")
    public ResponseEntity<String> deleteRutinasFromPlan (@PathVariable Long idPlan,
                                                         @RequestBody RutinasListDTO rutinasListDTO) {
        log.info("Ejecutando deleteRutinasFromPlan con esta lista de rutinasListDTO: {} y este plan con el id: {}"
                ,rutinasListDTO, idPlan);

        if(!planDeEntrenamientoRepository.existsById(idPlan)) {
            throw new PlanDeEntrenamientoNotFoundException("Plan de entrenamiento no encontrado: " + idPlan);
        }

        List <RutinasListDTO.RutinaDTO> rutinasFromDto = rutinasListDTO.getRutinas();
        List <Long> idRutinasList = rutinasFromDto.stream().map(RutinasListDTO.RutinaDTO::getId).toList();

        try {
            // Eliminar cada rutina del plan usando la tabla intermedia (plan_de_entrenamiento_rutina)
            idRutinasList.forEach(rutinaId -> planRutinaRepository.deleteRutinaFromPlan(idPlan, rutinaId));
                return ResponseEntity.status(HttpStatus.OK).body("Rutinas eliminadas correctamente del plan de entrenamiento");
        } catch (RuntimeException e) {
            log.warn("Error al intentar eliminar una rutina del plan de entrenamiento", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar eliminar una rutina del plan de entrenamiento");
        }
    }

    //TODO: Testear en Postman y React NEW UI
    @PutMapping ("/plan/fecha")
    public ResponseEntity<String> editarFechaEnPlanEntrenamiento (
            @RequestBody PlanEntrenamientoDtoFechasRequest planEntrenamientoDto) {

        log.info("Ejecutando editarFechaEnPlanEntrenamiento con el DTO: {}", planEntrenamientoDto);
        if(planEntrenamientoDto == null)
            throw new InvalidRequestException("Peticion para plan de entrenamiento no valida");
        String nombrePlan = planEntrenamientoDto.getNombrePlan();
        PlanDeEntrenamiento byNombrePlan =
                planDeEntrenamientoRepository.findByNombrePlan(nombrePlan);

        if (byNombrePlan == null) {
            log.warn("Plan no encontrado con el nombre: {}", nombrePlan);
            throw new PlanDeEntrenamientoNotFoundException ("Plan no encontrado con el nombre: " + nombrePlan);
        }

        //Actualizas solo los campos enviados (distintos de null)
        if(planEntrenamientoDto.getFechaInicio() != null)
            byNombrePlan.setFechaInicio(planEntrenamientoDto.getFechaInicio());
        if (planEntrenamientoDto.getFechaFinal() != null)
            byNombrePlan.setFechaFinal(planEntrenamientoDto.getFechaFinal());

        planDeEntrenamientoRepository.save(byNombrePlan);
        return ResponseEntity.status(HttpStatus.CREATED).body("Fecha añadida correctamente al plan: {}"
                + planEntrenamientoDto.getNombrePlan());
    }

    //TODO: Testear en Postman y React NEW UI
    @PostMapping("/plan/asignar-plan")
    public ResponseEntity<String> asignarPlanACliente(
        @RequestBody PlanEntrenamientoAsignarRequest planEntrenamientoAsignarRequest) {
        log.info("Ejecutando asignarPlanACliente con el DTO: {}", planEntrenamientoAsignarRequest);

        try {
            PlanDeEntrenamiento plan = planDeEntrenamientoRepository.findByNombrePlan(planEntrenamientoAsignarRequest.getNombrePlan());
            if (plan == null) {
                log.warn("Plan no encontrado con el nombre: {}", planEntrenamientoAsignarRequest.getNombrePlan());
                throw new PlanDeEntrenamientoNotFoundException("Plan no encontrado con el nombre: " + planEntrenamientoAsignarRequest.getNombrePlan());
            }

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
}
