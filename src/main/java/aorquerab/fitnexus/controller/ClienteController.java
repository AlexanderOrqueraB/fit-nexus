package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.dtos.ClienteDtoRequest;
import aorquerab.fitnexus.model.dtos.minimized.ClienteDTO;
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
                            .asesorNutricional(entrenador.getAsesorNutricional())
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

    @GetMapping("/{clienteEmailId}")
    public ResponseEntity<Optional<Cliente>> obtenerClientePorEmailId(@PathVariable String clienteEmailId){
        log.info("Ejecutando obtenerClientePorEmailId con este emailId: {}", clienteEmailId);
        try {
            Optional<Cliente> clienteByEmail = clienteRepository.findByEmail(clienteEmailId);
            return ResponseEntity.status(HttpStatus.OK).body(clienteByEmail);
        } catch (Exception e) {
            log.warn("Error al obtener cliente por emailId", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Optional.empty());
        }
    }

    //TODO Obtener cliente por otro Atributo (FUTURE REFACTOR)

    @PostMapping("/{clienteId}")
    public ResponseEntity<String> crearDatosExtraCliente(
            @PathVariable Long clienteId,
            @RequestBody ClienteDtoRequest clienteDTORequest) {
        log.info("Ejecutando crearCliente con este clienteId: {}", clienteId);
        log.info("ClienteDTORequest: {}", clienteDTORequest);
        if(clienteDTORequest == null) {
            throw new InvalidRequestException("Peticion de cliente no valida");
        }
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);
        log.info("Cliente a actualizar: {}", cliente);
        if (cliente.isEmpty()) {
            log.error("Cliente no encontrado con ID: {}", clienteId);
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

    @PutMapping("/{clienteId}")
    public ResponseEntity<String> actualizarDatosExtraCliente(
            @PathVariable Long clienteId,
            @RequestBody ClienteDtoRequest clienteDTORequest) {
        log.info("Ejecutando actualizarCliente con este clienteId: {}", clienteId);
        log.info("ClienteDTORequest recibido: {}", clienteDTORequest);

        Optional<Cliente> clienteOptional = clienteRepository.findById(clienteId);
        if (clienteOptional.isEmpty()) {
            log.error("Cliente no encontrado con ID: {}", clienteId);
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
