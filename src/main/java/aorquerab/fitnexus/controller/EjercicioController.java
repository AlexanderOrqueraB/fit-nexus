package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.EjercicioDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.repository.EjercicioRepository;
import aorquerab.fitnexus.utils.EjercicioDTOMapper;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<EjercicioDTO>> getEjercicios() {
        log.info("Ejecutando getEjercicios...");
        List<Ejercicio> ejercicio = ejercicioRepository.findAll();
        if(ejercicio.isEmpty()) {
            log.info("Ejercicio/s no encontrado/s en base de datos");
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD");
        }
        List<EjercicioDTO> ejercicioDTO = EjercicioDTOMapper.mapperFromList(ejercicio);
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDTO);

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

    /*@PostMapping(path = "/api/project/{projectId}/person")
    public ProjectDTO addPerson(@PathVariable long projectId, @RequestBody @Valid PersonDTO personDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        savedProject.getPeople().add(new Person(personDTO.getName()));

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }*/

    @PostMapping
    public ResponseEntity<String> postEjercicio(
            @Valid @RequestBody Ejercicio ejercicio) {
        log.info("Ejecutando postEjercicio...");
        if(ejercicio == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }
        ejercicioRepository.save(ejercicio);
        log.info("postEjercicio ejecutado.");
        return ResponseEntity.status(HttpStatus.CREATED).body("Ejercicio creado correctamente.");
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PutMapping ("/actualizarEjercicio/{idEjercicio}")
    public void actualizarEjercicio (
            @PathVariable Long idEjercicio,
            @RequestBody EjercicioDTO ejercicioDTO) {
        log.info("Ejecutando actualizarEjercicio...");
        EjercicioDTO ejercicioActualizadoDTO = getEjercicioById(idEjercicio).getBody();
                    Ejercicio aux = EjercicioDTOMapper.mapperFromEjercicio(ejercicioDTO);
        ejercicioActualizadoDTO.setNombreEjercicio(ejercicioDTO.getNombreEjercicio());
                    ejercicioActualizadoDTO.setNombreEjercicio(aux.getNombreEjercicio());
        ejercicioActualizadoDTO.setRepeticion(ejercicioDTO.getRepeticion());
        ejercicioActualizadoDTO.setSerie(ejercicioDTO.getSerie());
        ejercicioActualizadoDTO.setPeso(ejercicioDTO.getPeso());
        ejercicioActualizadoDTO.setCardioRealizado(ejercicioDTO.getCardioRealizado());

        /*Opcion ENTRENADOR CONTROLLER
        *         Entrenador entrenadorActualizado =  entrenadorRepository.findById(idEntrenador)
                .map(e -> {
                        e.setFitNexusId(entrenador.getFitNexusId());
                        e.setNombre(entrenador.getNombre());
                        e.setApellido(entrenador.getApellido());
                        e.setNombreDeUsuario(e.getNombreDeUsuario());
                        e.setEmail(entrenador.getEmail());
                        e.setAsesorNutricional(entrenador.getAsesorNutricional());
                        return entrenadorRepository.save(e);
                }).orElseGet(()-> {
                    return entrenadorRepository.save(entrenador);
                });
         */

        /*Opcion: */

        Ejercicio ejercicioActualizado = EjercicioDTOMapper.mapperFromEjercicio(ejercicioActualizadoDTO);
        ejercicioRepository.save(ejercicioActualizado);
        log.info("actualizarEjercicio ejecutado.");
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping ("/borrarEjercicio/{idEjercicio}")
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
