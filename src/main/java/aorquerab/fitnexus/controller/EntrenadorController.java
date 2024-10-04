package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.exception.EntrenadorNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/entrenadores"})
@Slf4j
public class EntrenadorController {
    private final EntrenadorRepository entrenadorRepository;

    public EntrenadorController(EntrenadorRepository entrenadorRepository) {
        this.entrenadorRepository = entrenadorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Entrenador>> getEntrenadores(){
        log.info("Ejecutando getEntrenadores...");
        List<Entrenador> entrenador = entrenadorRepository.findAll();
        if(entrenador.isEmpty()) {
            log.info("Entrenador/s no encontrado/s en base de datos");
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD");
        }
        return ResponseEntity.status(HttpStatus.OK).body(entrenador);
    }

    @PostMapping
    public ResponseEntity<String> postEntrenador (
            @RequestBody Entrenador entrenador) {
        log.info("Ejecutando postEntrenador...");
        if(entrenador == null) {
            throw new InvalidRequestException("Peticion de entrenador no valida");
        }
        entrenadorRepository.save(entrenador);
        log.info("postEntrenador ejecutado.");
        return ResponseEntity.status(HttpStatus.CREATED).body("Entrenador creado correctamente");
    }

    @GetMapping ("/{idEntrenador}")
    public ResponseEntity<Entrenador> getEntrenadorById(@PathVariable Long idEntrenador) {
        log.info("Ejecutando getEntrenadorById...");
        Optional<Entrenador> entrenadorById = entrenadorRepository.findById(idEntrenador);
        if(entrenadorById.isEmpty()) {
            log.info("Entrenador {} no encontrado en base de datos", idEntrenador);
            throw new EntrenadorNotFoundException("Ejercicio no encontrado en BD: " + idEntrenador);
        }
        return ResponseEntity.status(HttpStatus.OK).body(entrenadorById.get());
    }


    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping("/{idEntrenador}")
    public void actualizarEntrenador (
            @RequestBody Entrenador entrenador,
            @PathVariable Long idEntrenador) {
        log.info("Ejecutando actualizarEntrenador...");
        //TODO TEST
        //TODO: Maybe this should not valid the request (what if you just want to change a field?)
        //TODO: Also you cannot change the identifier via request
        //todo: what if any field is null? it get smashed by the new one?

        //TODO: esto no solo modifica no? si no existe, lo crea,
        // es como un POST con un GET previo

        Entrenador entrenadorActualizado =  entrenadorRepository.findById(idEntrenador)
                .map(e -> {
                        e.setFitNexusId(entrenador.getFitNexusId());
                        e.setNombre(entrenador.getNombre());
                        e.setApellido(entrenador.getApellido());
                        e.setEmail(entrenador.getEmail());
                        e.setAsesorNutricional(entrenador.getAsesorNutricional());
                        return entrenadorRepository.save(e);
                }).orElseGet(()-> {
                    return entrenadorRepository.save(entrenador);
                });
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
