package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.ENDPOINT_ROOT;

@RestController
@RequestMapping({ENDPOINT_ROOT + "/cliente"})
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

    @PostMapping
    public ResponseEntity<Cliente> postCliente (
            @RequestBody Cliente cliente) {
        log.info("Ejecutando postCliente...");
        clienteRepository.save(cliente);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
