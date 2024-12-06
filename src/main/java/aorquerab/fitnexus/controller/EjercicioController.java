package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.EjercicioDtoRequest;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.repository.EjercicioRepository;
import aorquerab.fitnexus.utils.EjercicioDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/ejercicios"})
@Slf4j
public class EjercicioController {

    private final EjercicioRepository ejercicioRepository;

    public EjercicioController(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }

    //TODO: Testear con postman
    //TODO: React, innecesario ya que devuelve todos los ejercicios de BBDD, util para testing
    @GetMapping
    public ResponseEntity<List<Ejercicio>> obtenerEjercicios(){
        log.info("Ejecutando obtenerEjercicios...");
        try {
            List <Ejercicio> ejercicioList = ejercicioRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de ejercicios", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman
    //TODO: React, innecesario ya que devuelve todos los ejercicios de BBDD, util para testing
    @GetMapping("/ejercicios-dto")
    public ResponseEntity<List<EjercicioDtoRequest>> obtenerEjerciciosDTO() {
        log.info("Ejecutando obtenerEjerciciosDTO...");
        try {
            List<EjercicioDtoRequest> ejercicioDtoRequestList = ejercicioRepository.findAll().stream()
                    .map(ejercicio -> EjercicioDtoRequest.builder()
                            .nombreEjercicio(ejercicio.getNombreEjercicio())
                            .repeticion(ejercicio.getRepeticion())
                            .serie(ejercicio.getSerie())
                            .peso(ejercicio.getPeso())
                            .cardio(ejercicio.getCardio())
                            .build()).toList();
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequestList);
        } catch (Exception e) {
            log.warn("Error al obtener ejerciciosDTO: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman, check exception and compare with put endpoint
    @GetMapping ("/{idEjercicio}")
    public ResponseEntity<EjercicioDtoRequest> obtenerEjercicioPorId(@PathVariable Long idEjercicio) {
        log.info("Ejecutando obtenerEjercicioPorId con el id: {}",  idEjercicio);
        EjercicioDtoRequest ejercicioDtoRequest = ejercicioRepository.findById(idEjercicio)
                        .map(EjercicioDTOMapper::mapperFromEjercicio)
                                .orElseThrow( ()-> {
                                    log.warn("Ejercicio no encontrado en base de datos: {}",  idEjercicio);
                                    return new EjercicioNotFoundException("Ejercicio no encontrado en BD: "
                                            + idEjercicio);
                                });
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequest);
    }

    //TODO: Testear con postman
    @GetMapping ("/ejercicio/{nombreEjercicio}")
    public ResponseEntity<List<EjercicioDtoRequest>> obtenerEjerciciosPorNombre(@PathVariable String nombreEjercicio) {
        log.info("Ejecutando obtenerEjercicioPorNombre con el id: {}", nombreEjercicio);
        List<Ejercicio> ejerciciosList = ejercicioRepository.findAllByNombreEjercicio(nombreEjercicio);
        if (ejerciciosList.isEmpty()) {
            log.warn("Ejercicio no encontrado en base de datos: {}", nombreEjercicio);
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + nombreEjercicio);
        }
        List<EjercicioDtoRequest> ejercicioDtoRequestList = ejerciciosList.stream()
                        .map(EjercicioDTOMapper::mapperFromEjercicio)
                        .toList();
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequestList);
    }

    //TODO: Testear con postman
    @PostMapping
    public ResponseEntity<String> crearEjercicio(@RequestBody EjercicioDtoRequest ejercicioDtoRequest) {
        log.info("Ejecutando crearEjercicio con este ejercicioDTO: {}", ejercicioDtoRequest);
        if(ejercicioDtoRequest == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }
        Ejercicio ejercicioCreado = Ejercicio.builder()
                .nombreEjercicio(ejercicioDtoRequest.getNombreEjercicio())
                .repeticion(ejercicioDtoRequest.getRepeticion())
                .serie(ejercicioDtoRequest.getSerie())
                .peso(ejercicioDtoRequest.getPeso())
                .cardio(ejercicioDtoRequest.getCardio())
                .build();

        ejercicioRepository.save(ejercicioCreado);
        log.info("crearEjercicio ejecutado con: {}", ejercicioCreado);
        return ResponseEntity.status(HttpStatus.CREATED).body("Ejercicio creado correctamente en BD");
    }

    //TODO: Testear con postman and check exception
    @PutMapping("/{idEjercicio}")
    public ResponseEntity<EjercicioDtoRequest> actualizarEjercicio (
            @PathVariable Long idEjercicio,
            @RequestBody EjercicioDtoRequest ejercicioDtoRequest) {
        log.info("Ejecutando actualizarEjercicio con la request: {}", ejercicioDtoRequest);
        Ejercicio ejercicioById = ejercicioRepository.findById(idEjercicio)
                .orElseThrow(()-> {
                    log.warn("Ejercicio no encontrado en base de datos: {}", idEjercicio);
                    return new ResponseStatusException( HttpStatus.NOT_FOUND,
                                    "Ejercicio no encontrado con el id: " + idEjercicio);
                });

        //Actualizas solo los campos enviados (distintos de null)
        if(ejercicioDtoRequest.getNombreEjercicio() != null)
            ejercicioById.setNombreEjercicio(ejercicioDtoRequest.getNombreEjercicio());

        if(ejercicioDtoRequest.getRepeticion() != null)
            ejercicioById.setRepeticion(ejercicioDtoRequest.getRepeticion());

        if(ejercicioDtoRequest.getSerie() != null)
            ejercicioById.setSerie(ejercicioDtoRequest.getSerie());

        if(ejercicioDtoRequest.getPeso() != null)
            ejercicioById.setPeso(ejercicioDtoRequest.getPeso());

        if (ejercicioDtoRequest.getCardio() != null)
            ejercicioById.setCardio(ejercicioDtoRequest.getCardio());

        Ejercicio ejercicioActualizado = ejercicioRepository.save(ejercicioById);
        log.info("Ejercicio actualizado: {}", ejercicioActualizado);

        EjercicioDtoRequest ejercicioDtoActualizado = EjercicioDtoRequest.builder()
                .nombreEjercicio(ejercicioActualizado.getNombreEjercicio())
                .repeticion(ejercicioActualizado.getRepeticion())
                .serie(ejercicioActualizado.getSerie())
                .peso(ejercicioActualizado.getPeso())
                .cardio(ejercicioActualizado.getCardio())
                    .build();

        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoActualizado);
    }

    //TODO: Testear con postman
    @DeleteMapping
    public ResponseEntity<String> eliminarEjercicio (@PathVariable Long idEjercicio) {
        log.info("Ejecutando eliminarEjercicio con el id: {}", idEjercicio);
        Ejercicio ejerciciobyId = ejercicioRepository.findById(idEjercicio)
                .orElseThrow(()-> {
                    log.warn("Ejercicio no encontrado en base de datos: {}", idEjercicio);
                    return new ResponseStatusException( HttpStatus.NOT_FOUND,
                            "Ejercicio no encontrado con el id: " + idEjercicio);
                });
        log.info("Ejercicio a eliminar: {}", ejerciciobyId);
        ejercicioRepository.delete(ejerciciobyId);

        return ResponseEntity.status(HttpStatus.OK).body("Ejercicio borrado correctamente");
    }
}
