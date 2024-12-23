package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.dtos.LoginDTO;
import aorquerab.fitnexus.model.dtos.SignupDTO;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;

import java.time.LocalDate;
import java.util.UUID;

public class UsuarioAuthDTOMapper {

    //FROM Entity to DTO
    public static SignupDTO mapperFromClienteSignup(Cliente cliente) {
        SignupDTO signupDTO = new SignupDTO();
        signupDTO.setNombre(cliente.getNombre());
        signupDTO.setApellido(cliente.getApellido());
        signupDTO.setEmail(cliente.getEmail());
        signupDTO.setPassword(cliente.getPassword());
        signupDTO.setRole(cliente.getRole());
        return signupDTO;
    }

    public static SignupDTO mapperFromEntrenadorSignup(Entrenador entrenador) {
        SignupDTO signupDTO = new SignupDTO();
        signupDTO.setNombre(entrenador.getNombre());
        signupDTO.setApellido(entrenador.getApellido());
        signupDTO.setEmail(entrenador.getEmail());
        signupDTO.setPassword(entrenador.getPassword());
        signupDTO.setRole(entrenador.getRole());
        return signupDTO;
    }

    public static LoginDTO mapperFromClienteLogin (Cliente cliente) {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(cliente.getEmail());
        loginDTO.setPassword(cliente.getPassword());

        return loginDTO;
    }

    public static LoginDTO mapperFromEntrenadorLogin(Entrenador entrenador) {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(entrenador.getEmail());
        loginDTO.setPassword(entrenador.getPassword());
        return loginDTO;
    }

    //FROM DTO to Entity
    public static Cliente clienteMapperFromSignupDTO(SignupDTO signupDTO, Entrenador entrenador) {
        Cliente cliente = new Cliente();
        cliente.setNombre(signupDTO.getNombre());
        cliente.setApellido(signupDTO.getApellido());
        cliente.setEmail(signupDTO.getEmail());
        cliente.setPassword(signupDTO.getPassword());
        cliente.setRole(signupDTO.getRole());
        cliente.setClienteDesde(LocalDate.now());
        cliente.setEntrenador(entrenador);
        return cliente;
    }

    public static Entrenador entrenadorMapperFromSignupDTO(SignupDTO signupDTO, String fitNexusId) {
        Entrenador entrenador= new Entrenador();
        entrenador.setFitNexusId(UUID.fromString(fitNexusId));
        entrenador.setNombre(signupDTO.getNombre());
        entrenador.setApellido(signupDTO.getApellido());
        entrenador.setEmail(signupDTO.getEmail());
        entrenador.setPassword(signupDTO.getPassword());
        entrenador.setRole(signupDTO.getRole());
        entrenador.setAsesorNutricional(signupDTO.getAsesorNutricional());
        return entrenador;
    }

    public static Cliente clienteMapperFromLoginDTO(LoginDTO loginDTO) {
        Cliente cliente = new Cliente();
        cliente.setEmail(loginDTO.getEmail());
        cliente.setPassword(loginDTO.getPassword());
        return cliente;
    }

    public static Entrenador entrenadorMapperFromLoginDTO(LoginDTO loginDTO) {
        Entrenador entrenador= new Entrenador();
        entrenador.setEmail(loginDTO.getEmail());
        entrenador.setPassword(loginDTO.getPassword());
        return entrenador;
    }

}
