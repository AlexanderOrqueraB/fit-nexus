package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.RutinaDTO;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.EjerciciosListDTO;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.RutinaDtoRequest;
import aorquerab.fitnexus.model.exception.EntrenadorNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.exception.RutinaNotFoundException;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.EjercicioRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.repository.RutinaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/rutinas"})
@Slf4j
public class RutinaController {
    private final RutinaRepository rutinaRepository;
    private final EntrenadorRepository entrenadorRepository;
    private final EjercicioRepository ejercicioRepository;

    public RutinaController(RutinaRepository rutinaRepository, EntrenadorRepository entrenadorRepository, EjercicioRepository ejercicioRepository) {
        this.rutinaRepository = rutinaRepository;
        this.entrenadorRepository = entrenadorRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    @GetMapping
    public ResponseEntity<List<Rutina>> obtenerRutinas() {
        log.info("Ejecutando obtenerRutinas...");
        try {
            List<Rutina> rutinasList = rutinaRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(rutinasList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de rutinas", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

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
            return ResponseEntity.status(HttpStatus.OK).body(rutinaDTOList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de rutinasDTO", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman
    @GetMapping ("/{idRutina}")
    public ResponseEntity<RutinaDTO> obtenerRutinaPorId (@PathVariable Long idRutina) {
        log.info("Ejecutando obtenerRutinaPorId con el id: " + idRutina);
        Rutina rutina = rutinaRepository.findById(idRutina)
                .orElseThrow(() -> {
                    log.warn("Rutina no encontrada en base de datos: " + idRutina);
                    return new RutinaNotFoundException("Rutina no encontrada en BD: "
                            + idRutina);
                });
        RutinaDTO.EjercicioDTO a = null;
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

    //TODO: Testear con postman
    @GetMapping ("/rutina/{nombreRutina}")
    public ResponseEntity<List<RutinaDTO>> obtenerRutinasPorNombre (@PathVariable String nombreRutina) {
        log.info("Ejecutando obtenerRutinasPorNombre con el id: " + nombreRutina);
        List <Rutina> rutinasList = rutinaRepository.findAllByNombreRutina(nombreRutina);
        if (rutinasList.isEmpty()) {
            log.warn("Rutina no encontrada en base de datos: {}", nombreRutina);
            throw new RutinaNotFoundException("Rutina no encontrada en BD: " + nombreRutina);
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

    //TODO: Testear con postman
    @PostMapping
    public ResponseEntity<String> crearRutina(@RequestBody RutinaDtoRequest rutinaDtoRequest) {
        log.info("Ejecutando crearRutina con este rutinaDtoRequest: " + rutinaDtoRequest);
        if(rutinaDtoRequest == null)
            throw new InvalidRequestException("Peticion de rutina no valida");
        String entrenadorEmail = rutinaDtoRequest.getEntrenador().getEmail();
        Optional <Entrenador> entrenadorFromRepository = entrenadorRepository.findByEmail(entrenadorEmail);
        Rutina rutinaCreada;
        if (entrenadorFromRepository.isPresent()) {
            rutinaCreada = Rutina.builder()
                    .nombreRutina(rutinaDtoRequest.getNombreRutina())
                    .fechaInicio(rutinaDtoRequest.getFechaInicio())
                    .fechaFinal(rutinaDtoRequest.getFechaFinal())
                    .entrenador(entrenadorFromRepository.get())
                    .build();
        } else throw new EntrenadorNotFoundException("El entrenador no se ha encontrado en BD");

        rutinaRepository.save(rutinaCreada);
        log.info("crearRutina ejecutada con: " + rutinaCreada);
        return ResponseEntity.status(HttpStatus.CREATED).body("Rutina creada correctamente en BD");
    }

    //TODO: POST Controller
    // Para añadirEjercicios EN UNA LISTA DE EJERCICIOS a una rutina
    @PostMapping
    public ResponseEntity<String> addEjerciciosEnLista (@RequestBody EjerciciosListDTO ejerciciosListDTO) {
        log.info("Ejecutando addEjerciciosEnLista con esta lista de ejerciciosDTO: " + ejerciciosListDTO);

        //Tengo una lista de ejercicios con solo el nombre List<EjercicioDTO> ejercicios y un nombreRutina;
        //Creo una rutina de BD que contenga los ejercicios de la lista y NADA MAS?

    }

    //TODO: POST Controller
    // Para añadirEjercicio a una rutina concreta por idEjercicio o nombreEjercicio
    // ejercicios ya existentes en base de datos
    // puede ser util, sacar a un servicio la logica de obtenerEjercicioPorId para usarlo aqui tambien



    //TODO: DELETE Controller
    // para eliminar una lista de ejercicios

    //TODO: PUT Controller
    // para modificar datos de una rutina (nombre o fechas)

    //TODO: DELETE controller
    // para eliminar un ejercicio de una rutina

    //TODO: DELETE controller
    // Para borrar una rutina

}
