package aorquerab.fitnexus.security;

import aorquerab.fitnexus.model.enumerator.Role;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String password;
    @Getter
    private final Role role;
    @Getter
    private final UUID fitNexusId;
    private final boolean isEntrenador;

    public CustomUserDetails(Entrenador entrenador) {
        this.username = entrenador.getEmail();
        this.password = entrenador.getPassword();
        this.role = entrenador.getRole();
        this.fitNexusId = entrenador.getFitNexusId();
        this.isEntrenador = true;
    }

    public CustomUserDetails(Cliente cliente) {
        this.username = cliente.getEmail();
        this.password = cliente.getPassword();
        this.role = cliente.getRole();
        this.fitNexusId = cliente.getFitNexusId();
        this.isEntrenador = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isEntrenador() {
        return isEntrenador;
    }
}
