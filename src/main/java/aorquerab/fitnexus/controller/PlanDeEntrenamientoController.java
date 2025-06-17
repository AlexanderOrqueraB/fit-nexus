package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.*;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.response.PlanEntrenamientoGetDTO;
import aorquerab.fitnexus.model.exception.*;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.*;
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
    private final RutinaRepository rutinaRepository;
    private final EjercicioRepository ejercicioRepository;

    public PlanDeEntrenamientoController(PlanDeEntrenamientoRepository planDeEntrenamientoRepository, ClienteRepository clienteRepository, EntrenadorRepository entrenadorRepository, PlanRutinaRepository planRutinaRepository, RutinaRepository rutinaRepository, EjercicioRepository ejercicioRepository) {
        this.planDeEntrenamientoRepository = planDeEntrenamientoRepository;
        this.clienteRepository = clienteRepository;
        this.entrenadorRepository = entrenadorRepository;
        this.planRutinaRepository = planRutinaRepository;
        this.rutinaRepository = rutinaRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    //TODO: Testear con postman
    //TODO: React, innecesario ya que devuelve todos los ejercicios de BBDD, util para testing
    @GetMapping
    public ResponseEntity<List<PlanDeEntrenamiento>> obtenerPlanes(){
        log.info("Ejecutando obtenerPlanes...");
        try {
            List<PlanDeEntrenamiento> planesDeEntrenamientoList = planDeEntrenamientoRepository.findAll();
            if (planesDeEntrenamientoList.isEmpty()) {
                log.warn("No hay planes de entrenamiento en base de datos...");
                throw new PlanDeEntrenamientoNotFoundException("No hay planes de entrenamiento en base de datos..");
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
        log.info("Ejecutando obtenerPlanPorFitNexusId con el FitNexusId: {}...", fitNexusId);
        try {
            List<PlanDeEntrenamiento> planes = Collections.emptyList();
            Optional<Cliente> clienteOptional = clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            if (clienteOptional.isEmpty() && entrenadorOptional.isEmpty()) {
                log.warn("Usuario no encontrado con el fitNexusId: {}", fitNexusId);
                throw new UsuarioNotFoundException("Usuario no encontrado en BD: " + fitNexusId);
            }

            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                planes = cliente.getPlanDeEntrenamiento();
                log.info("Planes de entrenamiento del cliente: {}", planes.stream()
                    .map(plan -> PlanEntrenamientoGetDTO.builder()
                        .id(plan.getId())
                        .nombrePlan(plan.getNombrePlan())
                        .clienteFitNexusId(String.valueOf(plan.getCliente().getFitNexusId()))
                        .fechaInicio(plan.getFechaInicio())
                        .fechaFinal(plan.getFechaFinal())
                        .build())
                    .collect(Collectors.toList()));
            }
            if (entrenadorOptional.isPresent()){
                Entrenador entrenador = entrenadorOptional.get();
                planes = entrenador.getPlanesDeEntrenamiento();
                log.info("Planes de entrenamiento del entrenador: {}", planes.stream()
                    .map(plan -> PlanEntrenamientoGetDTO.builder()
                        .id(plan.getId())
                        .nombrePlan(plan.getNombrePlan())
                        .fechaInicio(plan.getFechaInicio())
                        .fechaFinal(plan.getFechaFinal())
                        .build())
                    .collect(Collectors.toList()));
            }

            if (planes.isEmpty()) {
                log.warn("No hay planes de entrenamiento para el usuario con el fitNexusId: {}", fitNexusId);
                return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());
            }

            List<PlanEntrenamientoGetDTO> planDtoRequestList = planes.stream()
                    .map(plan -> PlanEntrenamientoGetDTO.builder()
                            .id(plan.getId())
                            .nombrePlan(plan.getNombrePlan())
                            .fechaInicio(plan.getFechaInicio())
                            .fechaFinal(plan.getFechaFinal())
                            .clienteFitNexusId(plan.getCliente() != null ? plan.getCliente().getFitNexusId().toString() : null)
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
            //Eliminamos las referencias de la tabla intermedia (al eliminar el CASCADE.ALL de la entidad)
            log.info("Eliminadas las referencias de la tabla intermedia plan_de_entrenamiento_rutina");
            for (Rutina rutina : planDeEntrenamientoByNombre.getRutinas()) {
                rutina.getPlanDeEntrenamientos().remove(planDeEntrenamientoByNombre);
                rutinaRepository.save(rutina);
            }
            planDeEntrenamientoByNombre.getRutinas().clear();
            planDeEntrenamientoRepository.delete(planDeEntrenamientoByNombre);
            log.info("Plan de entrenamiento eliminado");
    
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
        return ResponseEntity.status(HttpStatus.OK).body("Fecha añadida correctamente al plan: {}"
                + planEntrenamientoDto.getNombrePlan());
    }

    //TODO: Testear en Postman y React NEW UI
    @PostMapping("/plan/asignar-plan")
    public ResponseEntity<String> asignarPlanACliente(
        @RequestBody PlanEntrenamientoAsignarDesasignarRequest planEntrenamientoAsignarDesasignarRequest) {
        log.info("Ejecutando asignarPlanACliente con el DTO: {}", planEntrenamientoAsignarDesasignarRequest);

        try {
            PlanDeEntrenamiento plan = planDeEntrenamientoRepository.findByNombrePlan(planEntrenamientoAsignarDesasignarRequest.getNombrePlan());
            if (plan == null) {
                log.warn("Plan no encontrado con el nombre: {}", planEntrenamientoAsignarDesasignarRequest.getNombrePlan());
                throw new PlanDeEntrenamientoNotFoundException("Plan no encontrado con el nombre: " + planEntrenamientoAsignarDesasignarRequest.getNombrePlan());
            }

            Cliente cliente = clienteRepository.findByFitNexusId(UUID.fromString(planEntrenamientoAsignarDesasignarRequest.getClienteFitNexusId()))
                    .orElseThrow(() -> {
                        log.warn("Cliente no encontrado con el fitNexusId: {}", planEntrenamientoAsignarDesasignarRequest.getClienteFitNexusId());
                        return new ClienteNotFoundException("Cliente no encontrado con el fitNexusId: " + planEntrenamientoAsignarDesasignarRequest.getClienteFitNexusId());
                    });

            // Verificamos si el cliente ya tiene asignado el plan
            if (cliente.getPlanDeEntrenamiento().stream().anyMatch(p -> p.getNombrePlan().equals(planEntrenamientoAsignarDesasignarRequest.getNombrePlan()))) {
                log.warn("El cliente ya tiene el plan asignado con el nombre: {}", planEntrenamientoAsignarDesasignarRequest.getNombrePlan());
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El cliente ya tiene el plan asignado con el nombre: " + planEntrenamientoAsignarDesasignarRequest.getNombrePlan());
            }

            // Verificamos si el plan ya está asignado a otro cliente
            if (plan.getCliente() != null) {
                log.warn("El plan ya está asignado a otro cliente: {}", plan.getCliente().getNombre());
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El plan ya está asignado a otro cliente: " + plan.getCliente().getNombre());
            }

            //Usamos la tabla intermedia para asignar el plan al cliente
            log.info("El plan estará enlazado al cliente: {}", cliente.getNombre());
            plan.setCliente(cliente);

            log.info("Añadiendo el plan [{}] usando de forma directa la tabla intermedia con cliente.getPlanDeEntrenamiento().add(plan)", plan);
            cliente.getPlanDeEntrenamiento().add(plan);

            // Propagamos a cliente_rutina y cliente_ejercicio
            for (Rutina rutina : plan.getRutinas()) {
            log.info("Asignando rutina [{}] al cliente [{}]", rutina.getNombreRutina(), cliente.getNombre());
            cliente.getRutinas().add(rutina);

            for (Ejercicio ejercicio : rutina.getEjercicios()) {
                    log.info("Asignando ejercicio [{}] al cliente [{}]", ejercicio.getNombreEjercicio(), cliente.getNombre());
                    cliente.getEjercicios().add(ejercicio);
                }
            }

            clienteRepository.save(cliente);

            return ResponseEntity.status(HttpStatus.OK).body("Plan asignado correctamente al cliente");

        } catch (Exception e) {
            log.error("Error al asignar el plan al cliente", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al asignar el plan al cliente");
        }
    }

    @PostMapping("/plan/desasignar-plan")
    public ResponseEntity<String> desasignarPlanDeCliente(
            @RequestBody PlanEntrenamientoAsignarDesasignarRequest planEntrenamientoDesasignarRequest) {
        log.info("Ejecutando desasignarPlanDeCliente con el DTO: {}", planEntrenamientoDesasignarRequest);

        try {
            PlanDeEntrenamiento plan = planDeEntrenamientoRepository.findByNombrePlan(planEntrenamientoDesasignarRequest.getNombrePlan());
            if (plan == null) {
                log.warn("Plan no encontrado con el nombre: {}", planEntrenamientoDesasignarRequest.getNombrePlan());
                throw new PlanDeEntrenamientoNotFoundException("Plan no encontrado con el nombre: " + planEntrenamientoDesasignarRequest.getNombrePlan());
            }

            Cliente cliente = clienteRepository.findByFitNexusId(UUID.fromString(planEntrenamientoDesasignarRequest.getClienteFitNexusId()))
                    .orElseThrow(() -> {
                        log.warn("Cliente no encontrado con el fitNexusId: {}", planEntrenamientoDesasignarRequest.getClienteFitNexusId());
                        return new ClienteNotFoundException("Cliente no encontrado con el fitNexusId: " + planEntrenamientoDesasignarRequest.getClienteFitNexusId());
                    });

            if (!cliente.getPlanDeEntrenamiento().contains(plan)) {
                log.warn("El cliente no tiene asignado el plan con el nombre: {}", planEntrenamientoDesasignarRequest.getNombrePlan());
                return ResponseEntity.status(HttpStatus.CONFLICT).body("El cliente no tiene asignado el plan con el nombre: " + planEntrenamientoDesasignarRequest.getNombrePlan());
            }

            // Eliminamos las rutinas y ejercicios asociados al plan del cliente
            for (Rutina rutina : plan.getRutinas()) {
            log.info("Eliminando rutina [{}] del cliente [{}]", rutina.getNombreRutina(), cliente.getNombre());
            cliente.getRutinas().remove(rutina);

            for (Ejercicio ejercicio : rutina.getEjercicios()) {
                    log.info("Eliminando ejercicio [{}] del cliente [{}]", ejercicio.getNombreEjercicio(), cliente.getNombre());
                    cliente.getEjercicios().remove(ejercicio);
                }
            }

            //Usamos la tabla intermedia para desasignar el plan del cliente
            log.info("Eliminando la relación entre el cliente [{}] y el plan [{}]", cliente.getNombre(), plan.getNombrePlan());
            cliente.getPlanDeEntrenamiento().remove(plan);
            plan.setCliente(null);

            clienteRepository.save(cliente);
            return ResponseEntity.status(HttpStatus.OK).body("Plan desasignado correctamente del cliente");

        } catch (Exception e) {
            log.error("Error al desasignar el plan del cliente", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al desasignar el plan del cliente");
            }
        }
}
