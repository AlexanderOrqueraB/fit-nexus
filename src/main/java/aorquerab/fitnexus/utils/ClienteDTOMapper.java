package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.DTOs.ClienteDTO;
import aorquerab.fitnexus.model.users.Cliente;

public class ClienteDTOMapper {
    public static Cliente mapperFromClienteDTO (ClienteDTO clienteDTO) {
        Cliente cliente = new Cliente();
        cliente.setNombre(clienteDTO.getNombre());
        cliente.setApellido(clienteDTO.getApellido());
        cliente.setEmail(clienteDTO.getEmail());
        cliente.setPassword(clienteDTO.getPassword());
        cliente.setRole(clienteDTO.getRole());
        cliente.setObjetivo(clienteDTO.getObjetivo());
        cliente.setGenero(clienteDTO.getGenero());
        cliente.setPeso(clienteDTO.getPeso());
        cliente.setFrecuenciaEjercicioSemanal(clienteDTO.getFrecuenciaEjercicioSemanal());
        cliente.setEdad(clienteDTO.getEdad());
        cliente.setAltura(clienteDTO.getAltura());
        cliente.setClienteDesde(clienteDTO.getClienteDesde());
        return cliente;
    }
}
