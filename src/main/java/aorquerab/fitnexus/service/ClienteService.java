package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Optional<Cliente> findByEmail (String email) {
        return clienteRepository.findByEmail(email);
    }

    public Optional<Cliente> findByFitNexusId (String fitNexusId) {
        return clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
    }

}
