package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.RutinaDTO;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.RutinaDtoRequest;
import aorquerab.fitnexus.model.exception.EntrenadorNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.exception.RutinaNotFoundException;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.repository.RutinaRepository;
import aorquerab.fitnexus.utils.RutinaDTOMapper;
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

    public RutinaController(RutinaRepository rutinaRepository, EntrenadorRepository entrenadorRepository) {
        this.rutinaRepository = rutinaRepository;
        this.entrenadorRepository = entrenadorRepository;
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
        RutinaDTO rutinaDTO = rutinaRepository.findById(idRutina)
                .map(RutinaDTOMapper::mapperFromRutina) //TODO: Pending mapper
                .orElseThrow( ()-> {
                    log.warn("Rutina no encontrada en base de datos: " + idRutina);
                    return new RutinaNotFoundException("Rutina no encontrada en BD: "
                            + idRutina);
                });
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
                .map(RutinaDTOMapper::mapperFromRutina)
                .toList();//TODO: Pending mapper
        return ResponseEntity.status(HttpStatus.OK).body(rutinaDTOList);
    }

    //TODO: Testear con postman
    @PostMapping
    public ResponseEntity<String> crearRutina(@RequestBody RutinaDtoRequest rutinaDtoRequest) {
        log.info("Ejecutando crearRutina con este rutinaDtoRequest: " + rutinaDtoRequest);
        if(rutinaDtoRequest == null) {
            throw new InvalidRequestException("Peticion de rutina no valida");
        }

        String entrenadorEmail = rutinaDtoRequest.getEntrenador().getEmail();
        Optional <Entrenador> entrenadorFromRepository = entrenadorRepository.findByEmail(entrenadorEmail);
        Rutina rutinaCreada = null;
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

    //TODO: No puedes crear una rutina en base a RutinaDTO, ahi hay una lista de ejercicios
    // tienes que poder crear una rutina con un nombreRutina, fecha inicio, fecha fin
    // y posteriormente añadir ejercicios a una rutina concreta

    //TODO: De la misma forma tienes que poder asignar un PLAN X a distintos usuarios
    // usando rutinas existentes

    //TODO EJ: rutinaTorso tiene (press banca (id=1, nombre=pb) y dominadas (id=2, nombre= dom)
    // a su vez rutinaTorso tiene (id=3, nombreRutina= rutinaTorso)
    // y habrá un planNavidad que contenga (rutinaTorso y rutinaPierna(id(5)),
    // aparte de (id=4, nombrePlan= planNavidad)

    //TODO: de esta forma puedes crear nuevos planVerano con rutinaPierna(id(5)) + rutinaTorso(id(4))
    // o planPrimavera con rutinaPierna(id(5)) + rutinaTorso(id(4)) + rutinaCrossfit(id(7))

    //TODO: añadir ejemplos con small JSONs o incluso preparar las peticiones en POSTMAN :)


    //TODO: Testear con postman
    @PostMapping
    public ResponseEntity<String> añadirEjercicio {}
    //TODO: Debería estar en ejercicioController?

}
