package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.repository.EjercicioRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/ejercicios"})
@Slf4j
public class EjercicioController {

    private final EjercicioRepository ejercicioRepository;

    public EjercicioController(EjercicioRepository ejercicioRepository) {
        this.ejercicioRepository = ejercicioRepository;
    }

    @GetMapping("/get")
    public ResponseEntity<String> getDummyController() {
        log.info("Ejecutando dummy GET ENDPOINT...");
        String body = "Dummy GET ejecutado correctamente!";
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    @PostMapping("/post")
    public ResponseEntity<String> postDummyController() {
        log.info("Ejecutando dummy POST ENDPOINT...");
        String body = "Dummy POST ejecutado correctamente!";
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    @GetMapping
    public ResponseEntity<List<Ejercicio>> getEjercicios() {
        log.info("Ejecutando getEjercicios...");
        List<Ejercicio> ejercicio = ejercicioRepository.findAll();
        if(ejercicio.isEmpty()) {
            log.info("Ejercicio/s no encontrado/s en base de datos");
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD");
        }
        return ResponseEntity.status(HttpStatus.OK).body(ejercicio);
    }

    @GetMapping ("/{idEjercicio}")
    public ResponseEntity<Ejercicio> getEjercicioById(@PathVariable Long idEjercicio) {
        log.info("Ejecutando getEjercicioById...");
        Optional<Ejercicio> ejercicioById = ejercicioRepository.findById(idEjercicio);
        if(ejercicioById.isEmpty()){
            log.info("Ejercicio {} no encontrado en base de datos", idEjercicio);
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + idEjercicio);
        }
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioById.get());
    }

    @PostMapping
    public ResponseEntity<String> postEjercicio(
            @Valid @RequestBody Ejercicio ejercicio) {
        log.info("Ejecutando postEjercicio...");
        if(ejercicio == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }
        ejercicioRepository.save(ejercicio);
        return ResponseEntity.status(HttpStatus.CREATED).body("Ejercicio creado correctamente.");
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping ("/actualizarEjercicio/{id}")
    public void actualizarEjercicio (
            @PathVariable Long id,
            //TODO: Maybe this should not valid the request (what if you just want to change a field?)
            //TODO: Also you cannot change the identifier via request
            @Valid @RequestBody Ejercicio ejercicio) {
        log.info("Ejecutando actualizarEjercicio...");
        Ejercicio ejercicioActualizar = getEjercicioById(id);
        ejercicioActualizar.setNombreEjercicio(ejercicio.getNombreEjercicio());
        ejercicioActualizar.setRepeticion(ejercicio.getRepeticion());
        ejercicioActualizar.setSerie(ejercicio.getSerie());
        ejercicioActualizar.setPeso(ejercicio.getPeso());
        ejercicioActualizar.setVersion(ejercicio.getVersion());
        ejercicioRepository.save(ejercicioActualizar);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping ("/borrarEjercicio/{id}")
    public void borrarEjercicio (@PathVariable Long id) {
        log.info("Ejecutando borrarEjercicio...");
        Optional<Ejercicio> ejercicio = ejercicioRepository.findById(id);
        if(ejercicio.isEmpty()) {
            log.info("Ejercicio {} no encontrado en base de datos", id);
            //TODO: throw new EntidadNotFoundException(HttpStatus.NOT_FOUND, "Ejercicio no encontrado en BD");
        }
        else ejercicioRepository.delete(ejercicio.get());
    }

    //CUSTOM REQUEST
    @GetMapping("/nombreEjercicio/{nombreEjercicio}")
    public List<Ejercicio> findEjerciciosPorNombre (@PathVariable String nombreEjercicio) {
        return ejercicioRepository.findAllByNombreEjercicio(nombreEjercicio);
        //TODO: Refactor to be able to get from the response body and status http
    }
}
