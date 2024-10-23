package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.ClienteDTO;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.utils.ClienteDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    //TODO: Un post con los datos iniciales (el del signup?)
    // y otro post con los datos de edad peso objetivo... (usar un DTO especifico y
    // crear un mapper especifico o un mapper que mappee solo lo necesario y no lo que no se le pase
    // como parametro
    // USAR @Valid para evitar que haya nulos en el DTO!!!!
    @PostMapping
    public ResponseEntity<Cliente> postCliente (
            @RequestBody ClienteDTO clienteDTO) {
        log.info("Ejecutando postCliente...");
        log.info("clienteDTO:" + clienteDTO);
        if(clienteDTO == null) {
            throw new InvalidRequestException("Peticion de cliente no valida");
        }
        Cliente clienteCreado = ClienteDTOMapper.mapperFromClienteDTO(clienteDTO);
        log.info("cliente creado tras el mappeo:" + clienteCreado);
        clienteRepository.save(clienteCreado);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    //    //PUT
//    @PutMapping
//    //DELETE
//    @DeleteMapping
//    //CUSTOM
}
