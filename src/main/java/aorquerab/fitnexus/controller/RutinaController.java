package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.RutinaDTO;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.EjerciciosListDTO;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.RutinaDtoRequest;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.response.RutinaGetDTO;
import aorquerab.fitnexus.model.exception.EntrenadorNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.exception.RutinaNotFoundException;
import aorquerab.fitnexus.model.exception.UsuarioNotFoundException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.*;
import aorquerab.fitnexus.repository.intermediate.RutinaEjercicioRepository;
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
@RequestMapping({FITNEXUS_BASE_URI + "/rutinas"})
@Slf4j
public class RutinaController {
    private final RutinaRepository rutinaRepository;
    private final EntrenadorRepository entrenadorRepository;
    private final ClienteRepository clienteRepository;
    private final RutinaEjercicioRepository rutinaEjercicioRepository;
    private final EjercicioRepository ejercicioRepository;
    private final PlanDeEntrenamientoRepository planDeEntrenamientoRepository;

    public RutinaController(RutinaRepository rutinaRepository, EntrenadorRepository entrenadorRepository, ClienteRepository clienteRepository,
                            RutinaEjercicioRepository rutinaEjercicioRepository, EjercicioRepository ejercicioRepository, PlanDeEntrenamientoRepository planDeEntrenamientoRepository) {
        this.rutinaRepository = rutinaRepository;
        this.entrenadorRepository = entrenadorRepository;
        this.clienteRepository = clienteRepository;
        this.rutinaEjercicioRepository = rutinaEjercicioRepository;
        this.ejercicioRepository = ejercicioRepository;
        this.planDeEntrenamientoRepository = planDeEntrenamientoRepository;
    }

    //Testeado Postman + SB
    //Test con React: innecesario ya que devuelve todos los ejercicios de BBDD
    @GetMapping
    public ResponseEntity<List<Rutina>> obtenerRutinas() {
        log.info("Ejecutando obtenerRutinas...");
        try {
            List<Rutina> rutinasList = rutinaRepository.findAll();
            if (rutinasList.isEmpty()) {
                log.warn("Rutinas no encontradas en base de datos...");
                throw new RutinaNotFoundException("Rutinas no encontradas...");
            }
            return ResponseEntity.status(HttpStatus.OK).body(rutinasList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de rutinas", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //Testeado Postman + SB
    //Test con React: innecesario ya que devuelve todos los ejercicios de BBDD
    @GetMapping("/rutinas-dto")
    public ResponseEntity<List<RutinaDTO>> obtenerRutinasDTO() {
        log.info("Ejecutando obtenerRutinasDTO...");
        try {
            List<RutinaDTO> rutinaDTOList = rutinaRepository.findAll().stream()
                    .map(rutina -> RutinaDTO.builder()
                            .nombreRutina(rutina.getNombreRutina())
                            .ejercicios(rutina.getEjercicios().stream()
                                    .map(ejercicio -> RutinaDTO.EjercicioDTO.builder()
                                            .nombreEjercicio(ejercicio.getNombreEjercicio())
                                            .build())
                                    .collect(Collectors.toList()))
                            .build())
                    .collect(Collectors.toList());
            if (rutinaDTOList.isEmpty()) {
                log.warn("Rutinas no encontradas en base de datos...");
                throw new RutinaNotFoundException("Rutinas no encontradas...");
            }
            return ResponseEntity.status(HttpStatus.OK).body(rutinaDTOList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de rutinasDTO", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //Testeado Postman + SB
    @GetMapping ("/{idRutina}")
    public ResponseEntity<RutinaDTO> obtenerRutinaPorId (@PathVariable Long idRutina) {
        log.info("Ejecutando obtenerRutinaPorId con el id: {}", idRutina);
        Rutina rutina = rutinaRepository.findById(idRutina)
                .orElseThrow(() -> {
                    log.warn("Rutina no encontrada en base de datos: {} ", idRutina);
                    return new RutinaNotFoundException("Rutina no encontrada en BD: "
                            + idRutina);
                });
        RutinaDTO rutinaDTO = RutinaDTO.builder()
                .nombreRutina(rutina.getNombreRutina())
                .ejercicios(rutina.getEjercicios().stream()
                        .map(ejercicio -> RutinaDTO.EjercicioDTO.builder()
                                .nombreEjercicio(ejercicio.getNombreEjercicio())
                                .build())
                            .collect(Collectors.toList()))
                    .build();
        return ResponseEntity.status(HttpStatus.OK).body(rutinaDTO);
    }

    //Testeado Postman + SB
    @GetMapping ("/rutina/{nombreRutina}")
    public ResponseEntity<List<RutinaDTO>> obtenerRutinasPorNombre (@PathVariable String nombreRutina) {
        log.info("Ejecutando obtenerRutinasPorNombre con el nombre: {}" ,nombreRutina);
        List <Rutina> rutinasList = rutinaRepository.findAllByNombreRutina(nombreRutina);
        if (rutinasList.isEmpty()) {
            log.warn("Rutina no encontrada en base de datos: {}", nombreRutina);
            throw new RutinaNotFoundException("Rutina no encontrada en BD: {}" + nombreRutina);
        }
        List<RutinaDTO> rutinaDTOList = rutinasList.stream()
                .map(rutina -> RutinaDTO.builder()
                        .nombreRutina(rutina.getNombreRutina())
                        .ejercicios(rutina.getEjercicios().stream()
                                .map(ejercicio -> RutinaDTO.EjercicioDTO.builder()
                                        .nombreEjercicio(ejercicio.getNombreEjercicio())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .toList();
        return ResponseEntity.status(HttpStatus.OK).body(rutinaDTOList);
    }

    //TODO: Testear en Postman y React NEW UI
    @GetMapping("/rutina/usuario/{fitNexusId}")
    public ResponseEntity<List<RutinaGetDTO>> obtenerRutinaPorFitNexusId(@PathVariable String fitNexusId) {
        log.info("Ejecutando obtenerRutinaPorFitNexusId con el FitNexusId: {}...", fitNexusId);
        try {
            List<Rutina> rutinas = Collections.emptyList();
            Optional<Cliente> clienteOptional = clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            if (clienteOptional.isEmpty() && entrenadorOptional.isEmpty()) {
                log.warn("Usuario no encontrado con el fitNexusId: {}", fitNexusId);
                throw new UsuarioNotFoundException("Usuario no encontrado en BD: " + fitNexusId);
            }

            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                rutinas = cliente.getRutinas();
                log.info("Rutinas del cliente: {}", rutinas.stream()
                        .map(rutina -> RutinaGetDTO.builder()
                                .id(rutina.getId())
                                .nombreRutina(rutina.getNombreRutina())
                                .build())
                                .collect(Collectors.toList())
                        );
            }
            if (entrenadorOptional.isPresent()){
                Entrenador entrenador = entrenadorOptional.get();
                rutinas = entrenador.getRutinas();
                log.info("Rutinas del entrenador: {}", rutinas.stream()
                        .map(rutina -> RutinaGetDTO.builder()
                                .id(rutina.getId())
                                .nombreRutina(rutina.getNombreRutina())
                                .build())
                        .collect(Collectors.toList())
                );
            }

            if (rutinas.isEmpty()) {
                log.warn("No hay rutinas para el usuario con el fitNexusId: {}", fitNexusId);
                throw new RutinaNotFoundException("No hay rutinas para el usuario con el fitNexusId: {}"
                        + fitNexusId);
            }

            List<RutinaGetDTO> rutinaDtoRequestList = rutinas.stream()
                    .map(rutina -> RutinaGetDTO.builder()
                        .id(rutina.getId())
                        .nombreRutina(rutina.getNombreRutina())
                        .fechaInicio(rutina.getFechaInicio())
                        .fechaFinal(rutina.getFechaFinal())
                            .ejercicios(rutina.getEjercicios().stream()
                                .map(ejercicio -> RutinaGetDTO.EjercicioDTO.builder()
                                    .id(ejercicio.getId())
                                    .nombreEjercicio(ejercicio.getNombreEjercicio())
                                        .build())
                            .collect(Collectors.toList()))
                        .build()).toList();

            return ResponseEntity.status(HttpStatus.OK).body(rutinaDtoRequestList);
        } catch (Exception e) {
            log.warn("Error al obtener RutinaGetDTO: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }
    }


    //TODO: Testear en Postman y React NEW UI
    @PostMapping("{fitNexusId}")
    public ResponseEntity<String> crearRutina (@PathVariable String fitNexusId,
        @RequestBody RutinaDtoRequest rutinaDtoRequest) {

        log.info("Ejecutando crearRutina con este rutinaDtoRequest: {}", rutinaDtoRequest);

        Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
        if (entrenadorOptional.isEmpty()) {
            log.warn("Entrenador no encontrado en base de datos con el fitNexusId: {}", fitNexusId);
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + fitNexusId);
        }

        if(rutinaDtoRequest == null) {
            throw new InvalidRequestException("Peticion de rutina no valida");
        }

        Rutina rutinaCreada = Rutina.builder()
                .nombreRutina(rutinaDtoRequest.getNombreRutina())
                .fechaInicio(rutinaDtoRequest.getFechaInicio())
                .fechaFinal(rutinaDtoRequest.getFechaFinal())
                .entrenador(entrenadorOptional.get())
                .build();
        log.info("crearRutina ejecutado con: {}", rutinaCreada);
        Rutina rutinaGuardada = rutinaRepository.save(rutinaCreada);

        log.info("Rutina guardada correctamente en BD: {}", rutinaGuardada);
        return ResponseEntity.status(HttpStatus.CREATED).body("Rutina creada correctamente en BD: " + rutinaGuardada);
    }

    //TODO: Testear en Postman y React NEW UI
    @PutMapping("/{fitNexusId}")
    public ResponseEntity<String> actualizarRutina (@PathVariable String fitNexusId, 
            @RequestBody RutinaDtoRequest rutinaDtoRequest) {
        log.info("Ejecutando actualizarRutina con esta rutinaDtoRequest: {}", rutinaDtoRequest);

        Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
        if (entrenadorOptional.isEmpty()) {
            log.warn("Entrenador no encontrado en base de datos con el fitNexusId: {}", fitNexusId);
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + fitNexusId);
        }

        Rutina rutinaByNombre = rutinaRepository.findByNombreRutina(rutinaDtoRequest.getNombreRutina());

        if(rutinaByNombre == null) {
            log.warn("Rutina no encontrada en base de datos con el nombre: {}", rutinaDtoRequest.getNombreRutina());
            throw new RutinaNotFoundException("Rutina no encontrada en BD: " + rutinaDtoRequest.getNombreRutina());
        }

        Entrenador entrenador = entrenadorOptional.get();
        rutinaByNombre.setEntrenador(entrenador);

        //Actualizas solo los campos enviados (distintos de null)
        if(rutinaDtoRequest.getNombreRutina() != null)
            rutinaByNombre.setNombreRutina(rutinaDtoRequest.getNombreRutina());

        if(rutinaDtoRequest.getFechaInicio() != null)
            rutinaByNombre.setFechaInicio(rutinaDtoRequest.getFechaInicio());

        if(rutinaDtoRequest.getFechaFinal() != null)
            rutinaByNombre.setFechaFinal(rutinaDtoRequest.getFechaFinal());

        log.info("Rutina actualizada: {}", rutinaByNombre);

        Rutina rutinaActualizada = rutinaRepository.save(rutinaByNombre);

        log.info("Rutina actualizada: {}", rutinaActualizada);
        return ResponseEntity.status(HttpStatus.OK).body("Rutina actualizada correctamente en BD");

    }

    //TODO: Testear en Postman y React NEW UI
    @DeleteMapping("/{nombreRutina}")
    public ResponseEntity<String> eliminarRutina (@PathVariable String nombreRutina) {
        
        log.info("Ejecutando eliminarRutina con el nombre: {}", nombreRutina);

        try {
            if (nombreRutina == null) {
                throw new InvalidRequestException("Petición de rutina no válida");
            }
            Rutina rutinaByNombre = rutinaRepository.findByNombreRutina(nombreRutina);

            if (rutinaByNombre == null) {
                log.warn("Rutina no encontrada en base de datos con el nombre: {}", nombreRutina);
                throw new RutinaNotFoundException("Rutina no encontrada en BD: " + nombreRutina);
            }
    
            log.info("Rutina a eliminar: {}", rutinaByNombre);

            //Eliminamos las referencias de la tabla intermedia rutina_ejercicio (al eliminar el CASCADE.ALL de la entidad)
            for (Ejercicio ejercicio : rutinaByNombre.getEjercicios()) {
                ejercicio.getRutinas().remove(rutinaByNombre);
                ejercicioRepository.save(ejercicio);
            }
            rutinaByNombre.getEjercicios().clear();
            log.info("Eliminadas las referencias de la tabla intermedia rutina_ejercicio");

            //Eliminamos las referencias de la tabla intermedia plan_de_entrenamiento_rutina
            for (PlanDeEntrenamiento plan : rutinaByNombre.getPlanDeEntrenamientos()) {
                plan.getRutinas().remove(rutinaByNombre);
                planDeEntrenamientoRepository.save(plan);
            }
            rutinaByNombre.getPlanDeEntrenamientos().clear();
            log.info("Eliminadas las referencias de la tabla intermedia plan_de_entrenamiento_rutina");

            rutinaRepository.delete(rutinaByNombre);
            log.info("Rutina eliminada");
    
            return ResponseEntity.status(HttpStatus.OK).body("Rutina borrada correctamente");

        } catch (Exception e) {
            log.warn("Error al eliminar la rutina", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al eliminar la rutina");
        }
    }


    //TODO: Testear en Postman y React NEW UI
    // Al agregar y eliminar listas de ejercicios: Verificar que todas las relaciones se procesen correctamente.
    @Transactional
    @PutMapping ("/rutina/ejercicios/{idRutina}")
    public ResponseEntity<String> addEjerciciosToRutina (
                @PathVariable Long idRutina,
                @RequestBody EjerciciosListDTO ejerciciosListDTO) {
        log.info("Ejecutando addEjerciciosToRutina con esta lista de ejerciciosDTO: {} y esta rutina con el id: {}"
                ,ejerciciosListDTO, idRutina);

        if(!rutinaRepository.existsById(idRutina)) {
            throw new RutinaNotFoundException("Rutina no encontrada: " + idRutina);
        }

        List<EjerciciosListDTO.EjercicioDTO> ejerciciosFromDto = ejerciciosListDTO.getEjercicios();
        List<Long> idExerciseList = ejerciciosFromDto.stream().map(EjerciciosListDTO.EjercicioDTO::getId).toList();

        try {
            //Añade cada ejercicio a la rutina usando la tabla intermedia (rutina_ejercicio)
            idExerciseList.forEach(
                    ejercicioId -> rutinaEjercicioRepository.addEjercicioToRutina(idRutina,ejercicioId)
            );

            return ResponseEntity.status(HttpStatus.OK).body("Ejercicios añadidos correctamente a la rutina");

        } catch (RuntimeException e) {
            log.warn("Error al intentar añadir un ejercicio a la rutina", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar añadir un ejercicio a la rutina");

        }
    }

    //TODO: Testear en Postman y React NEW UI
    // Agregar y eliminar listas de ejercicios: Verifica que todas las relaciones se procesen correctamente.
    @Transactional
    @DeleteMapping("/rutina/ejercicios/{idRutina}")
    public ResponseEntity<String> deleteEjerciciosFromRutina (@PathVariable Long idRutina,
                @RequestBody EjerciciosListDTO ejerciciosListDTO) {
        log.info("Ejecutando deleteEjerciciosFromRutina con esta lista de ejerciciosDTO: {} y esta rutina con el id: {}"
                ,ejerciciosListDTO, idRutina);

        if (!rutinaRepository.existsById(idRutina)) {
            throw new RutinaNotFoundException("Rutina no encontrada: " + idRutina);
        }

        List<EjerciciosListDTO.EjercicioDTO> ejerciciosFromDto = ejerciciosListDTO.getEjercicios();
        List<Long> idExerciseList = ejerciciosFromDto.stream().map(EjerciciosListDTO.EjercicioDTO::getId).toList();

        try {
            // Eliminar cada ejercicio de la rutina usando la tabla intermedia (rutina_ejercicio)
            idExerciseList.forEach(ejercicioId ->
                    rutinaEjercicioRepository.deleteEjercicioFromRutina(idRutina, ejercicioId));
                return ResponseEntity.status(HttpStatus.OK).body("Ejercicios eliminados correctamente de la rutina");
        } catch (RuntimeException e) {
            log.warn("Error al intentar eliminar un ejercicio de la rutina", e);
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al intentar eliminar un ejercicio de la rutina");
        }

    }









    

    //TODO: Testear con postman
    // opcion con JPQL
    // DELETE Controller para eliminar una lista de ejercicios
    @DeleteMapping("/jqpl/{nombreRutina}")
    public ResponseEntity<String> eliminarListaDeEjerciciosFromRutinaWithJPQL (
            @RequestBody List<String> listaEjerciciosPorNombre,
            @PathVariable String nombreRutina) {

        log.info("Ejecutando eliminarListaDeEjerciciosFromRutina con esta lista de ejercicios: {}" , listaEjerciciosPorNombre);
        if (listaEjerciciosPorNombre == null || listaEjerciciosPorNombre.isEmpty())
            throw new InvalidRequestException("Error en la lista de ejercicios enviada");
        else {
            rutinaRepository.deleteEjerciciosByNombreIn(nombreRutina, listaEjerciciosPorNombre);
            return ResponseEntity.status(HttpStatus.OK).body("Lista de ejercicios borrada correctamente");
        }
    }

    //TODO: Testear con postman
    // opcion sin JPQL
    // DELETE Controller para eliminar una lista de ejercicios
    @DeleteMapping("/nojpql/{nombreRutina}")
    public ResponseEntity<String> eliminarListaDeEjerciciosFromRutinaWithoutJPQL(
            @RequestBody List<String> listaEjerciciosPorNombre,
            @PathVariable String nombreRutina) {

        log.info("Ejecutando eliminarListaDeEjerciciosFromRutina con esta lista de ejercicios: {}", listaEjerciciosPorNombre);

        // Validación: si la lista de ejercicios está vacía, lanzar excepción
        if (listaEjerciciosPorNombre == null || listaEjerciciosPorNombre.isEmpty()) {
            throw new InvalidRequestException("Error en la lista de ejercicios enviada");
        }

        // Obtener la rutina por nombre
        Rutina rutina = rutinaRepository.findByNombreRutina(nombreRutina);
        if (rutina == null) {
            throw new InvalidRequestException("Rutina no encontrada");
        }

        // Obtener la lista de ejercicios de la rutina
        List<Ejercicio> ejerciciosDeRutina = rutina.getEjercicios();

        // Eliminar los ejercicios de la lista que están en la lista de nombres
        ejerciciosDeRutina.removeIf(ejercicio -> listaEjerciciosPorNombre.contains(ejercicio.getNombreEjercicio()));

        // Guardar la rutina actualizada (sin los ejercicios eliminados)
        rutina.setEjercicios(ejerciciosDeRutina);
        rutinaRepository.save(rutina);

        // Respuesta de éxito
        return ResponseEntity.status(HttpStatus.OK).body("Lista de ejercicios borrada correctamente");
    }

}
