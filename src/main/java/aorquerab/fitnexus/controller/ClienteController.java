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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<Cliente> obtenerClientes(){
        log.info("Ejecutando obtenerClientes...");
        return clienteRepository.findAll();
    }

    //TODO: Crear un GetMapping que devuelva el cliente, entrenador y su plan nutricional (todo: añadir nombre de plan a entidad y dto)

    @GetMapping("/clientes-dto")
    public List<ClienteDTO> obtenerClientesYentrenadoresDTO(){
        log.info("Ejecutando obtenerClientesYentrenadoresDTO...");
        return clienteRepository.findAll().stream().map(cliente -> {
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
        }).collect(Collectors.toList());
    }

    @GetMapping("/{clienteEmailId}")
    public Optional<Cliente> obtenerClientePorEmailId(@PathVariable String clienteEmailId){
        log.info("Ejecutando obtenerClientePorEmailId con este emailId: " + clienteEmailId);
        return clienteRepository.findByEmail(clienteEmailId);
    }

    @PostMapping("/{clienteId}")
    public ResponseEntity<String> crearCliente(
            @PathVariable Long clienteId,
            @RequestBody ClienteDtoRequest clienteDTORequest) {
        log.info("Ejecutando crearCliente con este clienteId: " + clienteId);
        log.info("ClienteDTORequest: " + clienteDTORequest);
        if(clienteDTORequest == null) {
            throw new InvalidRequestException("Peticion de cliente no valida");
        }
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);
        log.info("Cliente a actualizar: " + cliente);
        cliente.ifPresent(cl -> {
            cl.setObjetivo(clienteDTORequest.getObjetivo());
            cl.setGenero(clienteDTORequest.getGenero());
            cl.setFrecuenciaEjercicioSemanal(clienteDTORequest.getFrecuenciaEjercicioSemanal());
            cl.setEdad(clienteDTORequest.getEdad());
            cl.setPeso(clienteDTORequest.getPeso());
            cl.setAltura(clienteDTORequest.getAltura());
        });
        log.info("Cliente creado tras el mappeo:" + cliente);
        cliente.ifPresent(clienteRepository::save);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente con datos extra creados correctamente");
    }

}
