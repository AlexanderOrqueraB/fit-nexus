package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.exception.EntidadNotFoundException;
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
    public List<Entrenador> getEntrenadores(){
        log.info("Ejecutando getEntrenadores...");
        return entrenadorRepository.findAll();
    }

    @GetMapping ("/{idEntrenador}")
    public Entrenador getEntrenadorById(@PathVariable Long idEntrenador) {
        log.info("Ejecutando getEntrenadorById...");
        Optional<Entrenador> entrenadorById = entrenadorRepository.findById(idEntrenador);
        if(entrenadorById.isEmpty()) {
            log.info("Entrenador {} no encontrado en base de datos", idEntrenador);
            throw new EntidadNotFoundException(HttpStatus.NOT_FOUND, "Entrenador no encontrado en BD");
        }
        return entrenadorById.get();
    }

    @PostMapping
    public ResponseEntity<Entrenador> postEntrenador (
            @RequestBody Entrenador entrenador) {
        log.info("Ejecutando postEntrenador...");
        entrenadorRepository.save(entrenador);
        //TODO: add log after post execution
        return new ResponseEntity<>(HttpStatus.CREATED);
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
        Entrenador entrenadorActualizado =  entrenadorRepository.findById(idEntrenador)
                .map(e -> {
                        e.setFitNexusId(entrenador.getFitNexusId());
                        e.setNombre(entrenador.getNombre());
                        e.setApellido(entrenador.getApellido());
                        e.setNombreDeUsuario(e.getNombreDeUsuario());
                        e.setEmail(entrenador.getEmail());
                        e.setAsesorNutricional(entrenador.getAsesorNutricional());
                        return entrenadorRepository.save(e);
                }).orElseGet(()-> {return entrenadorRepository.save(entrenador);});
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
