package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.EjercicioDtoRequest;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.response.EjercicioGetDTO;
import aorquerab.fitnexus.model.enumerator.Role;
import aorquerab.fitnexus.model.exception.*;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EjercicioRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.repository.RutinaRepository;
import aorquerab.fitnexus.utils.EjercicioDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/ejercicios"})
@Slf4j
public class EjercicioController {

    private final EjercicioRepository ejercicioRepository;
    private final ClienteRepository clienteRepository;
    private final EntrenadorRepository entrenadorRepository;
    private final RutinaRepository rutinaRepository;

    public EjercicioController(EjercicioRepository ejercicioRepository, ClienteRepository clienteRepository, EntrenadorRepository entrenadorRepository, RutinaRepository rutinaRepository) {
        this.ejercicioRepository = ejercicioRepository;
        this.clienteRepository = clienteRepository;
        this.entrenadorRepository = entrenadorRepository;
        this.rutinaRepository = rutinaRepository;
    }

    //Testeado Postman + SB
    //Test con React: innecesario ya que devuelve todos los ejercicios de BBDD
    @GetMapping
    public ResponseEntity<List<Ejercicio>> obtenerEjercicios(){
        log.info("Ejecutando obtenerEjercicios...");
        try {
            List <Ejercicio> ejercicioList = ejercicioRepository.findAll();
            if (ejercicioList.isEmpty()) {
                log.warn("Ejercicios no encontrados en base de datos...");
                throw new EjercicioNotFoundException("Ejercicios no encontrados...");
            }
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de ejercicios", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //Testeado Postman + SB
    //Test con React: innecesario ya que devuelve todos los ejercicios de BBDD
    @GetMapping("/ejercicios-dto")
    public ResponseEntity<List<EjercicioDtoRequest>> obtenerEjerciciosDTO() {
        log.info("Ejecutando obtenerEjerciciosDTO...");
        try {
            List<EjercicioDtoRequest> ejercicioDtoRequestList = ejercicioRepository.findAll().stream()
                    .map(ejercicio -> EjercicioDtoRequest.builder()
                            .nombreEjercicio(ejercicio.getNombreEjercicio())
                            .repeticion(ejercicio.getRepeticion())
                            .serie(ejercicio.getSerie())
                            .peso(ejercicio.getPeso())
                            .cardio(ejercicio.getCardio())
                            .build()).toList();
            if (ejercicioDtoRequestList.isEmpty()) {
                log.warn("Ejercicios no encontrados en base de datos...");
                throw new EjercicioNotFoundException("Ejercicios no encontrados...");
            }
            return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequestList);
        } catch (Exception e) {
            log.warn("Error al obtener ejerciciosDTO: ", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    //TODO: Testear con Postman
    @GetMapping("/roles/{userEmailId}")
    @ResponseBody
    public Optional<Role> obtenerRolePorEmailId (@PathVariable String userEmailId){
        log.info("Ejecutando obtenerRolePorEmailId con este emailId: {} ", userEmailId);
        Cliente clienteByEmailId = clienteRepository.findByEmail(userEmailId).orElseThrow( () -> {
                log.warn("Cliente no encontrado con el email: {}", userEmailId);
                return new ClienteNotFoundException("Cliente no encontrado en BD: " + userEmailId);
                });
        if(clienteByEmailId != null) {
            return Optional.of(clienteByEmailId.getRole());
        }

        Entrenador entrenadorByEmailId = entrenadorRepository.findByEmail(userEmailId).orElseThrow( () -> {
            log.warn("Entrenador no encontrado con el email: {}", userEmailId);
            return new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + userEmailId);
        });

        if (entrenadorByEmailId != null) {
            return Optional.of(entrenadorByEmailId.getRole());
        }
        log.info("Email no encontrado en base de datos");
        return Optional.empty();
    }

    //TODO: Testear en Postman y React NEW UI
    @GetMapping("/ejercicio/usuario/{fitNexusId}")
    public ResponseEntity<List<EjercicioGetDTO>> obtenerEjerciciosPorFitNexusId(@PathVariable String fitNexusId) {
        log.info("Ejecutando obtenerEjerciciosPorFitNexusId con el FitNexusId: {} ...", fitNexusId);
        try {
            List<Ejercicio> ejercicios = Collections.emptyList();
            Optional<Cliente> clienteOptional = clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            if (clienteOptional.isEmpty() && entrenadorOptional.isEmpty()) {
                log.warn("Usuario no encontrado con el fitNexusId: {} ", fitNexusId);
                throw new UsuarioNotFoundException("Usuario no encontrado en BD: " + fitNexusId);
            }

            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                ejercicios = cliente.getEjercicios();
            }
            if (entrenadorOptional.isPresent()){
                Entrenador entrenador = entrenadorOptional.get();
                ejercicios = entrenador.getEjercicios();
            }

            if (ejercicios.isEmpty()) {
                log.warn("No hay ejercicios para el usuario con el fitNexusId: {} ", fitNexusId);
                return ResponseEntity.status(HttpStatus.OK).body(Collections.emptyList());

            }

            List<EjercicioGetDTO> ejercicioDtoRequestList = ejercicios.stream()
                    .map(ejercicio -> EjercicioGetDTO.builder()
                            .id(ejercicio.getId())
                            .nombreEjercicio(ejercicio.getNombreEjercicio())
                            .repeticion(ejercicio.getRepeticion())
                            .serie(ejercicio.getSerie())
                            .peso(ejercicio.getPeso())
                            .cardio(ejercicio.getCardio())
                            .build()).toList();

            return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequestList);
        } catch (Exception e) {
            log.warn("Error al obtener EjercicioGetDTO: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }
    }

    //Testeado Postman + SB
    @GetMapping ("/{idEjercicio}")
    public ResponseEntity<EjercicioDtoRequest> obtenerEjercicioPorId(@PathVariable Long idEjercicio) {
        log.info("Ejecutando obtenerEjercicioPorId con el id: {}",  idEjercicio);
        EjercicioDtoRequest ejercicioDtoRequest = ejercicioRepository.findById(idEjercicio)
                        .map(EjercicioDTOMapper::mapperFromEjercicio)
                                .orElseThrow( ()-> {
                                    log.warn("Ejercicio no encontrado en base de datos con el id: {}",  idEjercicio);
                                    return new EjercicioNotFoundException("Ejercicio no encontrado en BD: "
                                            + idEjercicio);
                                });
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequest);
    }

    //Testeado Postman + SB
    @GetMapping ("/ejercicio/{nombreEjercicio}")
    public ResponseEntity<List<EjercicioDtoRequest>> obtenerEjerciciosPorNombre(@PathVariable String nombreEjercicio) {
        log.info("Ejecutando obtenerEjercicioPorNombre con el id: {}", nombreEjercicio);
        List<Ejercicio> ejerciciosList = ejercicioRepository.findAllByNombreEjercicio(nombreEjercicio);
        if (ejerciciosList.isEmpty()) {
            log.warn("Ejercicio no encontrado en base de datos: {}", nombreEjercicio);
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + nombreEjercicio);
        }
        List<EjercicioDtoRequest> ejercicioDtoRequestList = ejerciciosList.stream()
                        .map(EjercicioDTOMapper::mapperFromEjercicio)
                        .toList();
        return ResponseEntity.status(HttpStatus.OK).body(ejercicioDtoRequestList);
    }

    //TODO: Testear en Postman y React NEW UI
    @PostMapping("{fitNexusId}")
    public ResponseEntity<String> crearEjercicio(@PathVariable String fitNexusId,
        @RequestBody EjercicioDtoRequest ejercicioDtoRequest) {
        
        log.info("Ejecutando crearEjercicio con este ejercicioDTO: {}", ejercicioDtoRequest);
        
        Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
        if (entrenadorOptional.isEmpty()) {
            log.warn("Entrenador no encontrado en base de datos con el fitNexusId: {}", fitNexusId);
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + fitNexusId);
        }

        if(ejercicioDtoRequest == null) {
            throw new InvalidRequestException("Peticion de ejercicio no valida");
        }

        Ejercicio ejercicioCreado = Ejercicio.builder()
                .nombreEjercicio(ejercicioDtoRequest.getNombreEjercicio())
                .repeticion(ejercicioDtoRequest.getRepeticion())
                .serie(ejercicioDtoRequest.getSerie())
                .peso(ejercicioDtoRequest.getPeso())
                .cardio(ejercicioDtoRequest.getCardio())
                .entrenador(entrenadorOptional.get())
                .build();
        log.info("crearEjercicio ejecutado con: {}", ejercicioCreado);

        Ejercicio ejercicioGuardado = ejercicioRepository.save(ejercicioCreado);

        log.info("Ejercicio guardado correctamente en BD: {}", ejercicioGuardado);
        return ResponseEntity.status(HttpStatus.CREATED).body("Ejercicio creado correctamente en BD");
    }

    //TODO: Testear en Postman y React NEW UI
    @PutMapping("/{fitNexusId}")
    public ResponseEntity<String> actualizarEjercicio (@PathVariable String fitNexusId,
            @RequestBody EjercicioDtoRequest ejercicioDtoRequest) {
        
        log.info("Ejecutando actualizarEjercicio con este ejercicioDTO: {}", ejercicioDtoRequest);

        Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
        if (entrenadorOptional.isEmpty()) {
            log.warn("Entrenador no encontrado en base de datos con el fitNexusId: {}", fitNexusId);
            throw new EntrenadorNotFoundException("Entrenador no encontrado en BD: " + fitNexusId);
        }

        Ejercicio ejercicioByName = ejercicioRepository.findByNombreEjercicio(ejercicioDtoRequest.getNombreEjercicio());
        
        if(ejercicioByName == null) {
            log.warn("Ejercicio no encontrado en base de datos con el nombre: {}", ejercicioDtoRequest.getNombreEjercicio());
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + ejercicioDtoRequest.getNombreEjercicio());
        }

        Entrenador entrenador = entrenadorOptional.get();
        ejercicioByName.setEntrenador(entrenador);

        //Actualizas solo los campos enviados (distintos de null)
        if(ejercicioDtoRequest.getNombreEjercicio() != null)
            ejercicioByName.setNombreEjercicio(ejercicioDtoRequest.getNombreEjercicio());

        if(ejercicioDtoRequest.getRepeticion() != null)
            ejercicioByName.setRepeticion(ejercicioDtoRequest.getRepeticion());

        if(ejercicioDtoRequest.getSerie() != null)
            ejercicioByName.setSerie(ejercicioDtoRequest.getSerie());

        if(ejercicioDtoRequest.getPeso() != null)
            ejercicioByName.setPeso(ejercicioDtoRequest.getPeso());

        if (ejercicioDtoRequest.getCardio() != null)
            ejercicioByName.setCardio(ejercicioDtoRequest.getCardio());

        log.info("Ejercicio actualizado: {}", ejercicioByName);

        Ejercicio ejercicioActualizado = ejercicioRepository.save(ejercicioByName);

        log.info("Ejercicio actualizado: {}", ejercicioActualizado);
        return ResponseEntity.status(HttpStatus.OK).body("Ejercicio actualizado correctamente en BD");

    }

    //TODO: Testear en Postman y React NEW UI
    @DeleteMapping("/{nombreEjercicio}")
    public ResponseEntity<String> eliminarEjercicio (@PathVariable String nombreEjercicio) {
        
        log.info("Ejecutando eliminarEjercicio con el nombre: {}", nombreEjercicio);

        try {
            if (nombreEjercicio == null) {
                throw new InvalidRequestException("Petición de ejercicio no válida");
            }
            Ejercicio ejercicioByNombre = ejercicioRepository.findByNombreEjercicio(nombreEjercicio);

            if (ejercicioByNombre == null) {
                log.warn("Ejercicio no encontrado en base de datos con el nombre: {}", nombreEjercicio);
                throw new EjercicioNotFoundException("Ejercicio no encontrado en BD: " + nombreEjercicio);
            }
    
            log.info("Ejercicio a eliminar: {}", ejercicioByNombre);
            //Eliminamos las referencias de la tabla intermedia (al eliminar el CASCADE.ALL de la entidad)
            for (Rutina rutina : ejercicioByNombre.getRutinas()) {
                rutina.getEjercicios().remove(ejercicioByNombre);
                rutinaRepository.save(rutina);
            }
            ejercicioByNombre.getRutinas().clear();
            log.info("Eliminadas las referencias de la tabla intermedia rutina_ejercicio");

            ejercicioRepository.delete(ejercicioByNombre);
            log.info("Ejercicio eliminado");
    
            return ResponseEntity.status(HttpStatus.OK).body("Ejercicio borrado correctamente");

        } catch (Exception e) {
            log.warn("Error al eliminar el ejercicio", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al eliminar el ejercicio");
        }
    }
}
