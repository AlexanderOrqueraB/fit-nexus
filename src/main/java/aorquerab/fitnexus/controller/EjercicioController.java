package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.repository.EjercicioRepository;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static aorquerab.fitnexus.constants.Constants.ENDPOINT_ROOT;

@RestController
@RequestMapping({ENDPOINT_ROOT + "/ejercicio"})
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
        return new ResponseEntity<>(body,HttpStatus.OK);
    }

    @PostMapping("/post")
    public ResponseEntity<String> postDummyController() {
        log.info("Ejecutando dummy POST ENDPOINT...");
        String body = "Dummy POST ejecutado correctamente!";
        return new ResponseEntity<>(body,HttpStatus.OK);
    }


    //GET
    @GetMapping
    public List<Ejercicio> getEjercicios() {
        log.info("Ejecutando getEjercicios...");
        return ejercicioRepository.findAll();
    }

    //GET by Id
    @GetMapping ("/{id}")
    public Ejercicio getEjercicioById(@PathVariable Long id) {
        log.info("Ejecutando getEjercicioById...");
        Optional<Ejercicio> ejercicioById = ejercicioRepository.findById(id);
        if(ejercicioById.isEmpty()){
            log.info("Ejercicio {} no encontrado en base de datos", id);
            throw new EjercicioNotFoundException(HttpStatus.NOT_FOUND, "Ejercicio no encontrado en BD");
        }
        return ejercicioById.get();
    }

    //POST
    @PostMapping
    public ResponseEntity<Ejercicio> postEjercicio(
            @Valid @RequestBody Ejercicio ejercicio) {
        log.info("Ejecutando postEjercicio...");
        ejercicioRepository.save(ejercicio);
        return new ResponseEntity<> (HttpStatus.CREATED);
    }

    //PUT
    @ResponseStatus(HttpStatus.NO_CONTENT)
    //TODO: this should send a different http response?
    @PutMapping ("/actualizarEjercicio/{id}")
    public void actualizarEjercicio (
            @PathVariable Long id,
            //TODO: Maybe this should not valid the request (what if you just want to change a field?)
            //TODO: Also you cannot change the identifier via request
            @Valid @RequestBody Ejercicio ejercicio) {
        log.info("Ejecutando actulizarEjercicio...");
        Ejercicio ejercicioActualizar = getEjercicioById(id);
        ejercicioActualizar.setNombreEjercicio(ejercicio.getNombreEjercicio());
        ejercicioActualizar.setRepeticion(ejercicio.getRepeticion());
        ejercicioActualizar.setSerie(ejercicio.getSerie());
        ejercicioActualizar.setPeso(ejercicio.getPeso());
        ejercicioActualizar.setVersion(ejercicio.getVersion());
        ejercicioRepository.save(ejercicioActualizar);
    }

    //DELETE
    //TODO: this should send a different http response?
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping ("/borrarEjercicio/{id}")
    public void borrarEjercicio (@PathVariable Long id) {
        log.info("Ejecutando borrarEjercicio...");
        Optional<Ejercicio> ejercicio = ejercicioRepository.findById(id);
        if(ejercicio.isEmpty()) {
            log.info("Ejercicio {} no encontrado en base de datos", id);
            throw new EjercicioNotFoundException(HttpStatus.NOT_FOUND, "Ejercicio no encontrado en BD");
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
