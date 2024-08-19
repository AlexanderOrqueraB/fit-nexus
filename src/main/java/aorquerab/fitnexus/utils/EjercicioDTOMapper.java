package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.DTOs.EjercicioDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class EjercicioDTOMapper {
    public static EjercicioDTO mapperFromEjercicio (Ejercicio ejercicio) {

        EjercicioDTO ejercicioDTO = new EjercicioDTO();
        ejercicioDTO.setNombreEjercicio(ejercicio.getNombreEjercicio());
        ejercicioDTO.setRepeticion(ejercicio.getRepeticion());
        ejercicioDTO.setSerie(ejercicio.getSerie());
        ejercicioDTO.setPeso(ejercicio.getPeso());
        ejercicioDTO.setCardioRealizado(ejercicio.getCardioRealizado());

        return ejercicioDTO;
    }

    public static List<EjercicioDTO> mapperFromList (List<Ejercicio> ejercicio) {
        if(ejercicio.isEmpty()) return Collections.emptyList();
        else {
            return  ejercicio.stream().map(EjercicioDTOMapper::mapperFromEjercicio)
                    .collect(Collectors.toList());
        }
    }
}
