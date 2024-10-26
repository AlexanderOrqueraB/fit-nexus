package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.DTOs.PlanNutricionalPorcenajesDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanNutricional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PlanNutriDTOMapper {

    public static List<PlanNutricionalPorcenajesDTO> mapperFromList (List <PlanNutricional> planes) {
        if (planes.isEmpty()) {
            return Collections.emptyList();
        } else {
            return planes.stream()
                    .map(PlanNutriDTOMapper::mapperFromPlanNutricional)
                    .collect(Collectors.toList());
        }
    }

    public static PlanNutricionalPorcenajesDTO mapperFromPlanNutricional(PlanNutricional planNutricional) {
        PlanNutricionalPorcenajesDTO planNutricionalPorcenajesDTO = new PlanNutricionalPorcenajesDTO();
        planNutricionalPorcenajesDTO.setProteina(planNutricional.getProteina());
        planNutricionalPorcenajesDTO.setHidratoDeCarbono(planNutricional.getHidratoDeCarbono());
        planNutricionalPorcenajesDTO.setGrasa(planNutricional.getGrasa());
        planNutricionalPorcenajesDTO.setKcal(planNutricional.getKcal());
        planNutricionalPorcenajesDTO.setFechaInicio(planNutricional.getFechaInicio());
        planNutricionalPorcenajesDTO.setFechaFinal(planNutricional.getFechaFinal());

        return planNutricionalPorcenajesDTO;
    }

    public static PlanNutricional mapperFromPlanNutriDTO(PlanNutricionalPorcenajesDTO planNutricionalPorcenajesDTO) {
        PlanNutricional planNutricional = new PlanNutricional();
        planNutricional.setProteina(planNutricionalPorcenajesDTO.getProteina());
        planNutricional.setHidratoDeCarbono(planNutricionalPorcenajesDTO.getHidratoDeCarbono());
        planNutricional.setGrasa(planNutricionalPorcenajesDTO.getGrasa());
        planNutricional.setKcal(planNutricionalPorcenajesDTO.getKcal());
        planNutricional.setFechaInicio(planNutricionalPorcenajesDTO.getFechaInicio());
        planNutricional.setFechaFinal(planNutricionalPorcenajesDTO.getFechaFinal());

        return planNutricional;
    }
}
