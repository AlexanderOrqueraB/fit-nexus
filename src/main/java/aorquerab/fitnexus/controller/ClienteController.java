package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.ClienteDTO;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public List<Cliente> getClientes(){
        log.info("Ejecutando getClientes...");
        return clienteRepository.findAll();
    }

    @GetMapping("/{clienteEmailId}")
    public Optional<Cliente> obtenerClientePorId(@PathVariable String clienteEmailId){
        log.info("Ejecutando getClientes...");
        return clienteRepository.findByEmail(clienteEmailId);
    }

    @PostMapping("/{clienteId}")
    public ResponseEntity<String> postCliente (
            @PathVariable Long clienteId,
            @RequestBody ClienteDTO clienteDTO) {
        log.info("Ejecutando postCliente...");
        log.info("clienteDTO:" + clienteDTO);
        if(clienteDTO == null) {
            throw new InvalidRequestException("Peticion de cliente no valida");
        }
        Optional<Cliente> cliente = clienteRepository.findById(clienteId);
        log.info("cliente a actualizar:" + cliente);
        cliente.ifPresent(cl -> {
            cl.setObjetivo(clienteDTO.getObjetivo());
            cl.setGenero(clienteDTO.getGenero());
            cl.setFrecuenciaEjercicioSemanal(clienteDTO.getFrecuenciaEjercicioSemanal());
            cl.setEdad(clienteDTO.getEdad());
            cl.setPeso(clienteDTO.getPeso());
            cl.setAltura(clienteDTO.getAltura());
        });
        log.info("cliente creado tras el mappeo:" + cliente);
        cliente.ifPresent(clienteRepository::save);
        return ResponseEntity.status(HttpStatus.CREATED).body("Cliente creado correctamente");
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
