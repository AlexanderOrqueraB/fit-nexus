package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.SignupDTO;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.RutinaDTO;
import aorquerab.fitnexus.model.users.Entrenador;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.UUID;

@Slf4j
public class RutinaDTOMapper {

    //TODO: Pending mapper
    public static RutinaDTO mapperFromRutina (Rutina rutina) {
        RutinaDTO rutinaDTO = new RutinaDTO();
        rutinaDTO.setNombreRutina(rutina.getNombreRutina());
        List<Ejercicio> ejercicios = rutina.getEjercicios();
        rutinaDTO.setEjercicios(rutina.setEjercicios(ejercicios));
        return rutinaDTO;
    }

//    public static EjercicioDTO mapperFromEjercicio (Optional <Ejercicio> ejercicio) {
//        if (ejercicio.isPresent()) {
//            return EjercicioDTO.builder()
//                    .nombreEjercicio(ejercicio.get().getNombreEjercicio())
//                    .repeticion(ejercicio.get().getRepeticion())
//                    .serie(ejercicio.get().getSerie())
//                    .peso(ejercicio.get().getPeso())
//                    .cardio(ejercicio.get().getCardio())
//                    .build();
//        } else {
//            log.info ("Mapeo de Ejercicio a ejercicioDTO fallido!!!!");
//            throw new EjercicioNotFoundException("Ejercicio no encontrado en BD");
//        }
//    }

//    public static List<EjercicioDTO> mapperFromList (List<Ejercicio> ejercicios) {
//        if(ejercicios.isEmpty())
//            return Collections.emptyList();
//        else {
//            return  ejercicios.stream()
//                    .map(RutinaDTOMapper::mapperFromEjercicio)
//                    .collect(Collectors.toList());
//        }
//    }

    //FROM DTO to Entity
//    public static Ejercicio mapperFromEjercicioDTO(EjercicioDTO ejercicioDTO) {
//        Ejercicio ejercicio = new Ejercicio();
//        ejercicio.setNombreEjercicio(ejercicioDTO.getNombreEjercicio());
//        ejercicio.setRepeticion(ejercicioDTO.getRepeticion());
//        ejercicio.setSerie(ejercicioDTO.getSerie());
//        ejercicio.setPeso(ejercicioDTO.getPeso());
//        ejercicio.setCardio(ejercicioDTO.getCardio());
//
//        return ejercicio;
//    }

}
