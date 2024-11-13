package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.dtos.EntrenadorDTORequest;
import aorquerab.fitnexus.model.dtos.SignupDTO;
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
    public ResponseEntity<List<Entrenador>> obtenerEntrenadores(){
        log.info("Ejecutando obtenerEntrenadores...");
        List<Entrenador> entrenador = entrenadorRepository.findAll();
        if(entrenador.isEmpty()) {
            log.info("Entrenador/s no encontrado/s en base de datos");
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD");
        }
        return ResponseEntity.status(HttpStatus.OK).body(entrenador);
    }

    @GetMapping("/{entrenadorEmailId}")
    public Optional<Entrenador> obtenerEntrenadorPorEmailId (@PathVariable String entrenadorEmailId) {
        log.info("Ejecutando obtenerEntrenadorPorEmailId con este emailId: {}", entrenadorEmailId);
        return entrenadorRepository.findByEmail(entrenadorEmailId);
    }

    //TODO Obtener entrenador por otro Atributo (FUTURE REFACTOR)

    @GetMapping("/fitnexus-id/{idEntrenadorEmail}")
    public String obtenerFitNexusIdDeEntrenador (@PathVariable String idEntrenadorEmail) {
        log.info("Ejecutando obtenerFitNexusIdDeEntrenador con este emailId: {}", idEntrenadorEmail);
        Optional<Entrenador> entrenador = entrenadorRepository.findByEmail(idEntrenadorEmail);
        if (entrenador.isPresent()) {
            return entrenador.get().getFitNexusId().toString();
        } else {
            log.info("FitnexusID de entrenador no encontrado con el email: {}", idEntrenadorEmail);
            throw new InvalidRequestException("FitnexusID de entrenador no encontrado con el email:"
                    + idEntrenadorEmail);
        }
    }

    @PostMapping("/{idEntrenador}")
    public ResponseEntity<String> crearEntrenador (
            @PathVariable Long idEntrenador,
            @RequestBody SignupDTO signupDTO) {
        log.info("Ejecutando crearEntrenador con este idEntrenador: {}", idEntrenador);
        log.info("Ejecutando crearEntrenador con el campo asesorNutricional: {}", signupDTO);
        if(signupDTO == null) {
            throw new InvalidRequestException("Peticion de entrenador no valida");
        }
        Optional<Entrenador> entrenador = entrenadorRepository.findById(idEntrenador);
        log.info("Entrenador a actualizar:" + entrenador);
        entrenador.ifPresent(entr -> {
            entr.setAsesorNutricional(signupDTO.getAsesorNutricional());
        });
        log.info("Entrenador creado tras el mappeo: {}", entrenador);
        entrenador.ifPresent(entrenadorRepository::save);
        return ResponseEntity.status(HttpStatus.CREATED).body("Entrenador actualizado con campo asesorNutricional");
    }

    //TODO: Testear con postman and check exception
    @PutMapping("/{idEntrenador}")
    public ResponseEntity<EntrenadorDTORequest> actualizarEntrenador (
            @PathVariable Long idEntrenador,
            @RequestBody EntrenadorDTORequest entrenadorDTORequest) {
        log.info("Ejecutando actualizarEntrenador con la request: {}", entrenadorDTORequest);
        Entrenador entrenadorById = entrenadorRepository.findById(idEntrenador)
                .orElseGet(() -> {
                    log.warn("Entrenador no encontrado en base de datos: {}", idEntrenador);
                    throw  new EntrenadorNotFoundException("Entrenador no encontrado en base de datos");
                });

        if(entrenadorDTORequest.getNombre() != null)
            entrenadorById.setNombre(entrenadorDTORequest.getNombre());

        if(entrenadorDTORequest.getApellido() != null)
            entrenadorById.setApellido(entrenadorDTORequest.getApellido());

        if(entrenadorDTORequest.getAsesorNutricional() != null)
            entrenadorById.setAsesorNutricional(entrenadorDTORequest.getAsesorNutricional());

        Entrenador entrenadorActualizado = entrenadorRepository.save(entrenadorById);
        log.info("Entrenador actualizado: {}", entrenadorActualizado);

        EntrenadorDTORequest entrenadorActualizadoDto = EntrenadorDTORequest.builder()
                .nombre(entrenadorActualizado.getNombre())
                .apellido(entrenadorActualizado.getApellido())
                .asesorNutricional(entrenadorActualizado.getAsesorNutricional())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(entrenadorActualizadoDto);
    }
}
