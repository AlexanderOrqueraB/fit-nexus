package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.postman.EjercicioDtoRequest;
import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import lombok.extern.slf4j.Slf4j;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
public class EjercicioDTOMapper {

    //FROM Entity to DTO
    public static EjercicioDtoRequest mapperFromEjercicio (Ejercicio ejercicio) {
        EjercicioDtoRequest ejercicioDtoRequest = new EjercicioDtoRequest();
        ejercicioDtoRequest.setNombreEjercicio(ejercicio.getNombreEjercicio());
        ejercicioDtoRequest.setRepeticion(ejercicio.getRepeticion());
        ejercicioDtoRequest.setSerie(ejercicio.getSerie());
        ejercicioDtoRequest.setPeso(ejercicio.getPeso());
        ejercicioDtoRequest.setCardio(ejercicio.getCardio());

        return ejercicioDtoRequest;
    }

    public static EjercicioDtoRequest mapperFromEjercicio (Ejercicio ejercicio) {
        if (ejercicio != null) {
            return EjercicioDtoRequest.builder()
                    .nombreEjercicio(ejercicio.getNombreEjercicio())
                    .repeticion(ejercicio.getRepeticion())
                    .serie(ejercicio.getSerie())
                    .peso(ejercicio.getPeso())
                    .cardio(ejercicio.getCardio())
                    .build();
        } else {
            log.info ("Mapeo de Ejercicio a ejercicioDTO fallido!!!!");
            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD");
        }
    }

    public static List<EjercicioDtoRequest> mapperFromList (List<Ejercicio> ejercicios) {
        if(ejercicios.isEmpty())
            return Collections.emptyList();
        else {
            return  ejercicios.stream()
                    .map(EjercicioDTOMapper::mapperFromEjercicio)
                    .collect(Collectors.toList());
        }
    }

    //FROM DTO to Entity
    public static Ejercicio mapperFromEjercicioDTO(EjercicioDtoRequest ejercicioDtoRequest) {
        Ejercicio ejercicio = new Ejercicio();
        ejercicio.setNombreEjercicio(ejercicioDtoRequest.getNombreEjercicio());
        ejercicio.setRepeticion(ejercicioDtoRequest.getRepeticion());
        ejercicio.setSerie(ejercicioDtoRequest.getSerie());
        ejercicio.setPeso(ejercicioDtoRequest.getPeso());
        ejercicio.setCardio(ejercicioDtoRequest.getCardio());

        return ejercicio;
    }

}
