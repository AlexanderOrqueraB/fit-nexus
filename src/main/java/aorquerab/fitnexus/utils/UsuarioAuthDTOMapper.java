package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.dtos.LoginDTO;
import aorquerab.fitnexus.model.dtos.SignupDTO;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;

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
