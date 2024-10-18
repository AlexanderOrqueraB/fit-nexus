package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.DTOs.EjercicioDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class EjercicioDTOMapper {

    //TODO: Separate into 2 different clases: EjerciciofromEjercicioDTO and EjercicioDTOfromEjercicio for example
    //FROM Entity to DTO
    public static EjercicioDTO mapperFromEjercicio (Ejercicio ejercicio) {
        EjercicioDTO ejercicioDTO = new EjercicioDTO();
        ejercicioDTO.setNombreEjercicio(ejercicio.getNombreEjercicio());
        ejercicioDTO.setRepeticion(ejercicio.getRepeticion());
        ejercicioDTO.setSerie(ejercicio.getSerie());
        ejercicioDTO.setPeso(ejercicio.getPeso());
        ejercicioDTO.setCardio(ejercicio.getCardio());

        return ejercicioDTO;
    }

    public static EjercicioDTO mapperFromEjercicio (Optional <Ejercicio> ejercicio) {
        return  EjercicioDTO.builder()
                        .nombreEjercicio(ejercicio.get().getNombreEjercicio())
                        .repeticion(ejercicio.get().getRepeticion())
                        .serie(ejercicio.get().getSerie())
                        .peso(ejercicio.get().getPeso())
                        .cardio(ejercicio.get().getCardio())
                            .build();
    }

    public static List<EjercicioDTO> mapperFromList (List<Ejercicio> ejercicios) {
        if(ejercicios.isEmpty())
            return Collections.emptyList();
        else {
            return  ejercicios.stream()
                    .map(EjercicioDTOMapper::mapperFromEjercicio)
                    .collect(Collectors.toList());
        }
    }

    //FROM DTO to Entity
    public static Ejercicio mapperFromEjercicioDTO(EjercicioDTO ejercicioDTO) {
        Ejercicio ejercicio = new Ejercicio();
        ejercicio.setNombreEjercicio(ejercicioDTO.getNombreEjercicio());
        ejercicio.setRepeticion(ejercicioDTO.getRepeticion());
        ejercicio.setSerie(ejercicioDTO.getSerie());
        ejercicio.setPeso(ejercicioDTO.getPeso());
        ejercicio.setCardio(ejercicioDTO.getCardio());

        return ejercicio;
    }

}
