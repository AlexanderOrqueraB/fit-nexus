package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;

import java.util.Optional;

public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Optional<Cliente> findByEmail (String email) {
        return clienteRepository.findByEmail(email);
    }

}
