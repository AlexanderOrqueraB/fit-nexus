package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.EjercicioDTO;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.repository.EjercicioRepository;
import aorquerab.fitnexus.utils.EjercicioDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping
    public List<Ejercicio> obtenerEjercicios(){
        log.info("Ejecutando obtenerEjercicios...");
        return ejercicioRepository.findAll();
    }

    //TODO: Testear con postman
    @GetMapping("/ejercicios-dto")
    public ResponseEntity<List<EjercicioDTO>> obtenerEjerciciosDTO() {
        log.info("Ejecutando obtenerEjerciciosDTO...");
        try {
            List<EjercicioDTO> ejercicioDTOList = ejercicioRepository.findAll().stream()
                    .map(ejercicio -> EjercicioDTO.builder()
                            .nombreEjercicio(ejercicio.getNombreEjercicio())
                            .repeticion(ejercicio.getRepeticion())
                            .serie(ejercicio.getSerie())
                            .peso(ejercicio.getPeso())
                            .cardio(ejercicio.getCardio())
                            .build()).toList();
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTOList);
        } catch (Exception e) {
            log.warn("Error al obtener ejerciciosDTO: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    //TODO: Testear con postman
    @GetMapping ("/{idEjercicio}")
    public ResponseEntity<EjercicioDTO> obtenerEjercicioPorId(@PathVariable Long idEjercicio) {
        log.info("Ejecutando obtenerEjercicioPorId con el id: " + idEjercicio);
        EjercicioDTO ejercicioDTO = ejercicioRepository.findById(idEjercicio)
                        .map(EjercicioDTOMapper::mapperFromEjercicio)
                                .orElseThrow( ()-> {
                                    log.warn("Ejercicio no encontrado en base de datos: " + idEjercicio);
                                    return new EjercicioNotFoundException("Ejercicio no encontrado en BD: "
                                            + idEjercicio);
                                });
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTO);
    }

    //TODO: Testear con postman
    @GetMapping ("/ejercicio/{nombreEjercicio}")
    public ResponseEntity<List<EjercicioDTO>> obtenerEjerciciosPorNombre(@PathVariable String nombreEjercicio) {
        log.info("Ejecutando obtenerEjercicioPorNombre con el id: " + nombreEjercicio);
        List<Ejercicio> ejerciciosList = ejercicioRepository.findAllByNombreEjercicio(nombreEjercicio);
        if (ejerciciosList.isEmpty()) {
            log.warn("Ejercicio no encontrado en base de datos: {}", nombreEjercicio);
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + nombreEjercicio);
        }

        List<EjercicioDTO> ejercicioDTOList = ejerciciosList.stream()
                        .map(EjercicioDTOMapper::mapperFromEjercicio)
                        .toList();

        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTOList);
    }

    //TODO: Testear con postman
    @PostMapping
    public ResponseEntity<String> crearEjercicio(@RequestBody EjercicioDTO ejercicioDTO) {
        log.info("Ejecutando crearEjercicio con este ejercicioDTO: " + ejercicioDTO);
        if(ejercicioDTO == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }
        Ejercicio ejercicioActualizado = Ejercicio.builder()
                .nombreEjercicio(ejercicioDTO.getNombreEjercicio())
                .repeticion(ejercicioDTO.getRepeticion())
                .serie(ejercicioDTO.getSerie())
                .peso(ejercicioDTO.getPeso())
                .cardio(ejercicioDTO.getCardio())
                .build();

        ejercicioRepository.save(ejercicioActualizado);
        log.info("crearEjercicio ejecutado.");
        return ResponseEntity.status(HttpStatus.CREATED).body("Ejercicio creado correctamente en BD");
    }

    /*@PostMapping(path = "/api/project/{projectId}/person")
public ProjectDTO addPerson(@PathVariable long projectId, @RequestBody @Valid PersonDTO personDTO) {
    Project savedProject = projectRepository.findById(projectId).get();

    savedProject.getPeople().add(new Person(personDTO.getName()));

    Project updatedProject = projectRepository.save(savedProject);
    return ProjectTransformer.transform(updatedProject);
}*/

//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @PutMapping ("/actualizarEjercicio/{idEjercicio}")
//    public void actualizarEjercicio (
//            @PathVariable Long idEjercicio,
//            @RequestBody EjercicioDTO ejercicioDTO) {
//        log.info("Ejecutando actualizarEjercicio...");
//        if(ejercicioDTO == null) {
//            throw new InvalidRequestException("Peticion de ejercicio no valida");
//        }
//        EjercicioDTO ejercicioActualizadoDTO = obtenerEjercicioPorId(idEjercicio).getBody();
//        Ejercicio ejercicioActualizado = EjercicioDTOMapper.mapperFromEjercicioDTO(ejercicioActualizadoDTO);
//        ejercicioRepository.save(ejercicioActualizado);
//        log.info("actualizarEjercicio ejecutado.");
//        //TODO: testear NullPointerExceptions con varios US variando al request
//    }

//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    @DeleteMapping ("/borrarEjercicio/{idEjercicio}")
//    public void borrarEjercicio (@PathVariable Long idEjercicio) {
//        log.info("Ejecutando borrarEjercicio...");
//        Optional<Ejercicio> ejercicio = ejercicioRepository.findById(idEjercicio);
//        if(ejercicio.isEmpty()) {
//            log.info("Ejercicio {} no encontrado en base de datos", idEjercicio);
//            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + idEjercicio);
//        }
//        else ejercicioRepository.delete(ejercicio.get());
//    }
//
//    //TODO endpoint to modify the weight of an specific exercise (POST)
//    //CUSTOM REQUEST
//    @GetMapping("/nombreEjercicio/{nombreEjercicio}")
//    public List<Ejercicio> findEjerciciosPorNombre (@PathVariable String nombreEjercicio) {
//        return ejercicioRepository.findAllByNombreEjercicio(nombreEjercicio);
//        //TODO: Refactor to be able to get from the response body and status http
//    }
}
