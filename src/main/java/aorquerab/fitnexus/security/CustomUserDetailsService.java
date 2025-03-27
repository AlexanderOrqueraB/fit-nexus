package aorquerab.fitnexus.security;

import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final EntrenadorRepository entrenadorRepository;
    private final ClienteRepository clienteRepository;

    public CustomUserDetailsService(EntrenadorRepository entrenadorRepository, ClienteRepository clienteRepository) {
        this.entrenadorRepository = entrenadorRepository;
        this.clienteRepository = clienteRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional <Entrenador> entrenador = entrenadorRepository.findByEmail(email);
        if (entrenador.isPresent()) {
            log.info("Entrenador encontrado con email: {}", email);
            return new CustomUserDetails(entrenador.get());
        }

        Optional <Cliente> cliente = clienteRepository.findByEmail(email);
        if (cliente.isPresent()) {
            log.info("Cliente encontrado con email: {}", email);
            return new CustomUserDetails(cliente.get());
        }
        log.warn("Usuario no encontrado con email: {}", email);
        throw new UsernameNotFoundException("Usuario no encontrado con el email: " + email);
    }
}
