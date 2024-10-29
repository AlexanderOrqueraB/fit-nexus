package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.dtos.EjercicioDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.repository.EjercicioRepository;
import aorquerab.fitnexus.utils.EjercicioDTOMapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/ejercicios"})
@Slf4j
public class EjercicioController {

    private final EjercicioRepository ejercicioRepository;

    public EjercicioController(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/get")
    public ResponseEntity<String> getDummyController() {
        log.info("Ejecutando dummy GET ENDPOINT...");
        String body = "Dummy GET ejecutado correctamente!";
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/getadmin")
    public ResponseEntity<String> getDummyAdminController() {
        log.info("Ejecutando dummy GET ENDPOINT...");
        String body = "Dummy GET ADMIN ejecutado correctamente!";
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    @PostMapping("/post")
    public ResponseEntity<String> postDummyController() {
        log.info("Ejecutando dummy POST ENDPOINT...");
        String body = "Dummy POST ejecutado correctamente!";
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    @GetMapping
    public ResponseEntity<List<EjercicioDTO>> getEjercicios() {
        try {
            log.info("Ejecutando getEjercicios...");
            List<Ejercicio> ejercicios = ejercicioRepository.findAll();
            if(ejercicios.isEmpty()) {
                log.info("Ejercicio/s no encontrado/s en base de datos");
                throw new EjercicioNotFoundException("Ejercicio no encontrado en BD");
            }
            List<EjercicioDTO> ejercicioDTOs = EjercicioDTOMapper.mapperFromList(ejercicios);
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTOs);
        } catch (Exception e) {
            log.info("Excepcion getExercises: " + e.getMessage());
            return null;
        }

    }

    @GetMapping ("/{idEjercicio}")
    public ResponseEntity<EjercicioDTO> getEjercicioById(@PathVariable Long idEjercicio) {
        log.info("Ejecutando getEjercicioById...");
        Optional<Ejercicio> ejercicioById = ejercicioRepository.findById(idEjercicio);
        if(ejercicioById.isEmpty()){
            log.info("Ejercicio {} no encontrado en base de datos", idEjercicio);
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + idEjercicio);
        }
        EjercicioDTO ejercicioDTO = EjercicioDTOMapper.mapperFromEjercicio(ejercicioById);
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTO);
    }

    @PostMapping
    public ResponseEntity<String> postEjercicio(
            @Valid @RequestBody EjercicioDTO ejercicioDTO) {
        log.info("Ejecutando postEjercicio...");
        if(ejercicioDTO == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }
        Ejercicio ejercicioActualizado = EjercicioDTOMapper.mapperFromEjercicioDTO(ejercicioDTO);
        ejercicioRepository.save(ejercicioActualizado);
        log.info("postEjercicio ejecutado.");
        return ResponseEntity.status(HttpStatus.CREATED).body("Ejercicio creado correctamente.");
    }

    /*@PostMapping(path = "/api/project/{projectId}/person")
public ProjectDTO addPerson(@PathVariable long projectId, @RequestBody @Valid PersonDTO personDTO) {
    Project savedProject = projectRepository.findById(projectId).get();

    savedProject.getPeople().add(new Person(personDTO.getName()));

    Project updatedProject = projectRepository.save(savedProject);
    return ProjectTransformer.transform(updatedProject);
}*/

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping ("/actualizarEjercicio/{idEjercicio}")
    public void actualizarEjercicio (
            @PathVariable Long idEjercicio,
            @RequestBody EjercicioDTO ejercicioDTO) {
        log.info("Ejecutando actualizarEjercicio...");
        if(ejercicioDTO == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }
        EjercicioDTO ejercicioActualizadoDTO = getEjercicioById(idEjercicio).getBody();
        Ejercicio ejercicioActualizado = EjercicioDTOMapper.mapperFromEjercicioDTO(ejercicioActualizadoDTO);
        ejercicioRepository.save(ejercicioActualizado);
        log.info("actualizarEjercicio ejecutado.");
        //TODO: testear NullPointerExceptions con varios US variando al request
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping ("/borrarEjercicio/{idEjercicio}")
    public void borrarEjercicio (@PathVariable Long idEjercicio) {
        log.info("Ejecutando borrarEjercicio...");
        Optional<Ejercicio> ejercicio = ejercicioRepository.findById(idEjercicio);
        if(ejercicio.isEmpty()) {
            log.info("Ejercicio {} no encontrado en base de datos", idEjercicio);
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + idEjercicio);
        }
        else ejercicioRepository.delete(ejercicio.get());
    }

    //TODO endpoint to modify the weight of an specific exercise (POST)
    //CUSTOM REQUEST
    @GetMapping("/nombreEjercicio/{nombreEjercicio}")
    public List<Ejercicio> findEjerciciosPorNombre (@PathVariable String nombreEjercicio) {
        return ejercicioRepository.findAllByNombreEjercicio(nombreEjercicio);
        //TODO: Refactor to be able to get from the response body and status http
    }
}
