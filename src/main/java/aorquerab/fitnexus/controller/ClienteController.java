package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.dtos.ClienteDtoRequest;
import aorquerab.fitnexus.model.dtos.minimized.ClienteDTO;
import aorquerab.fitnexus.model.exception.ClienteNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
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
@RequestMapping({FITNEXUS_BASE_URI + "/clientes"})
@Slf4j
public class ClienteController {
    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerClientes(){
        log.info("Ejecutando obtenerClientes...");
        try {
            List<Cliente> clientesList = clienteRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(clientesList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de clientes", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    @GetMapping("/clientes-dto")
    public ResponseEntity<List<ClienteDTO>> obtenerClientesYentrenadoresDTO(){
        log.info("Ejecutando obtenerClientesYentrenadoresDTO...");
        try {
            List<ClienteDTO> clienteDTOList = clienteRepository.findAll().stream().map(cliente -> {
                ClienteDTO.Entrenador entrenadorDTO = null;
                if (cliente.getEntrenador() != null) {
                    Entrenador entrenador = cliente.getEntrenador();
                    entrenadorDTO = ClienteDTO.Entrenador.builder()
                            .email(entrenador.getEmail())
                            .build();
                }
                return ClienteDTO.builder()
                        .objetivo(cliente.getObjetivo())
                        .genero(cliente.getGenero())
                        .frecuenciaEjercicioSemanal(cliente.getFrecuenciaEjercicioSemanal())
                        .edad(cliente.getEdad())
                        .peso(cliente.getPeso())
                        .altura(cliente.getAltura())
                        .entrenador(entrenadorDTO)
                        .build();
            }).toList();
            return ResponseEntity.status(HttpStatus.OK).body(clienteDTOList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de clientes y entrenadores", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    @GetMapping("/{fitNexusId}")
    public ResponseEntity<Optional<Cliente>> obtenerClientePorFitNexusId(@PathVariable String fitNexusId){
        log.info("Ejecutando obtenerClientePorFitNexusId con este fitNexusId: {}", fitNexusId);
        try {
            Optional<Cliente> clienteByFitNexusId = clienteRepository.findByFitnexusId(UUID.fromString(fitNexusId));
            return ResponseEntity.status(HttpStatus.OK).body(clienteByFitNexusId);
        } catch (Exception e) {
            log.warn("Error al obtener cliente por emailId", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }

    @GetMapping("/extra-data/{fitNexusId}")
    public ResponseEntity<ClienteDtoRequest> obtenerDatosExtraClientePorFitNexusId (@PathVariable String fitNexusId){
        log.info("Ejecutando obtenerDatosExtraClientePorFitNexusId con este fitNexusId: {}", fitNexusId);
        try {
            Cliente clienteByFitNexusId = clienteRepository.findByFitnexusId(UUID.fromString(fitNexusId))
                    .orElseThrow(() -> new ClienteNotFoundException("Cliente no encontrado con emailId: "));
            ClienteDtoRequest datosExtraCliente = ClienteDtoRequest.builder()
                    .objetivo(clienteByFitNexusId.getObjetivo())
                    .genero(clienteByFitNexusId.getGenero())
                    .frecuenciaEjercicioSemanal(clienteByFitNexusId.getFrecuenciaEjercicioSemanal())
                    .edad(clienteByFitNexusId.getEdad())
                    .peso(clienteByFitNexusId.getPeso())
                    .altura(clienteByFitNexusId.getAltura())
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(datosExtraCliente);
        } catch (Exception e) {
            log.warn("Error al obtener cliente por emailId", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ClienteDtoRequest.builder().build());
        }
    }

    @PostMapping("/{fitNexusId}")
    public ResponseEntity<String> crearDatosExtraCliente(
            @PathVariable String fitNexusId,
            @RequestBody ClienteDtoRequest clienteDTORequest) {
        log.info("Ejecutando crearCliente con este fitNexusId: {}", fitNexusId);
        log.info("ClienteDTORequest: {}", clienteDTORequest);
        if(clienteDTORequest == null) {
            throw new InvalidRequestException("Peticion de cliente no valida");
        }
        Optional<Cliente> cliente = clienteRepository.findByFitnexusId(UUID.fromString(fitNexusId));
        log.info("Cliente a actualizar: {}", cliente);
        if (cliente.isEmpty()) {
            log.error("Cliente no encontrado con fitNexusId: {}", fitNexusId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }

        cliente.ifPresent(cl -> {
            cl.setObjetivo(clienteDTORequest.getObjetivo());
            cl.setGenero(clienteDTORequest.getGenero());
            cl.setFrecuenciaEjercicioSemanal(clienteDTORequest.getFrecuenciaEjercicioSemanal());
            cl.setEdad(clienteDTORequest.getEdad());
            cl.setPeso(clienteDTORequest.getPeso());
            cl.setAltura(clienteDTORequest.getAltura());
        });
        log.info("Cliente creado tras el mappeo: {}", cliente);
        cliente.ifPresent(clienteRepository::save);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente con datos extra creados correctamente");
    }

    @PutMapping("/{fitNexusId}")
    public ResponseEntity<String> actualizarDatosExtraCliente(
            @PathVariable String fitNexusId,
            @RequestBody ClienteDtoRequest clienteDTORequest) {
        log.info("Ejecutando actualizarCliente con este fitNexusId: {}", fitNexusId);
        log.info("ClienteDTORequest recibido: {}", clienteDTORequest);

        Optional<Cliente> clienteOptional = clienteRepository.findByFitnexusId(UUID.fromString(fitNexusId));
        if (clienteOptional.isEmpty()) {
            log.error("Cliente no encontrado con fitNexusId: {}", fitNexusId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente no encontrado");
        }

        Cliente cliente = clienteOptional.get();
        cliente.setObjetivo(clienteDTORequest.getObjetivo());
        cliente.setGenero(clienteDTORequest.getGenero());
        cliente.setFrecuenciaEjercicioSemanal(clienteDTORequest.getFrecuenciaEjercicioSemanal());
        cliente.setEdad(clienteDTORequest.getEdad());
        cliente.setPeso(clienteDTORequest.getPeso());
        cliente.setAltura(clienteDTORequest.getAltura());

        clienteRepository.save(cliente);
        log.info("Cliente actualizado correctamente: {}", cliente);
        return ResponseEntity.status(HttpStatus.OK).body("Cliente actualizado correctamente");

    }

    //TODO: DELETE all (In case entrenador want to delete their account, maybe this one could be delete the reference
    // for the previous entrenador, just in case cliente want to keep using FIT NEXUS with another entrenador

}
