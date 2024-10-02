package aorquerab.fitnexus.security;

import aorquerab.fitnexus.model.enumeration.Role;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final String username;
    private final String password;
    private final Role role;
    private final boolean isEntrenador;

    public CustomUserDetails(Entrenador entrenador) {
        this.username = entrenador.getEmail();
        this.password = entrenador.getPassword();
        this.role = entrenador.getRole();
        this.isEntrenador = true;
    }

    public CustomUserDetails(Cliente cliente) {
        this.username = cliente.getEmail();
        this.password = cliente.getPassword();
        this.role = cliente.getRole();
        this.isEntrenador = false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.name()));
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
