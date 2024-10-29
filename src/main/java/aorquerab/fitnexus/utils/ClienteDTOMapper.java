package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.dtos.ClienteDtoRequest;
import aorquerab.fitnexus.model.users.Cliente;

public class ClienteDTOMapper {
    public static Cliente mapperFromClienteDTO (ClienteDtoRequest clienteDTORequest) {
        Cliente cliente = new Cliente();
        cliente.setObjetivo(clienteDTORequest.getObjetivo());
        cliente.setGenero(clienteDTORequest.getGenero());
        cliente.setPeso(clienteDTORequest.getPeso());
        cliente.setFrecuenciaEjercicioSemanal(clienteDTORequest.getFrecuenciaEjercicioSemanal());
        cliente.setEdad(clienteDTORequest.getEdad());
        cliente.setAltura(clienteDTORequest.getAltura());
        return cliente;
    }
}
