package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanNutricional;
import aorquerab.fitnexus.model.dtos.PlanNutricionalDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PlanNutriDTOMapper {

    public static List<PlanNutricionalDTO> mapperFromList (List <PlanNutricional> planes) {
        if (planes.isEmpty()) {
            return Collections.emptyList();
        } else {
            return planes.stream()
                    .map(PlanNutriDTOMapper::mapperFromPlanNutricional)
                    .collect(Collectors.toList());
        }
    }

    public static PlanNutricionalDTO mapperFromPlanNutricional(PlanNutricional planNutricional) {
        PlanNutricionalDTO planNutricionalDTO = new PlanNutricionalDTO();
        planNutricionalDTO.setProteina(planNutricional.getProteina());
        planNutricionalDTO.setHidratoDeCarbono(planNutricional.getHidratoDeCarbono());
        planNutricionalDTO.setGrasa(planNutricional.getGrasa());
        planNutricionalDTO.setKcal(planNutricional.getKcal());
        planNutricionalDTO.setFechaInicio(planNutricional.getFechaInicio());
        planNutricionalDTO.setFechaFinal(planNutricional.getFechaFinal());

        return planNutricionalDTO;
    }

    public static PlanNutricional mapperFromPlanNutriDTO(PlanNutricionalDTO planNutricionalDTO) {
        PlanNutricional planNutricional = new PlanNutricional();
        planNutricional.setProteina(planNutricionalDTO.getProteina());
        planNutricional.setHidratoDeCarbono(planNutricionalDTO.getHidratoDeCarbono());
        planNutricional.setGrasa(planNutricionalDTO.getGrasa());
        planNutricional.setKcal(planNutricionalDTO.getKcal());
        planNutricional.setFechaInicio(planNutricionalDTO.getFechaInicio());
        planNutricional.setFechaFinal(planNutricionalDTO.getFechaFinal());
        planNutricional.setEntrenador(EntrenadorDTOMapper.mapperFromEntrenadorDTO(planNutricionalDTO.getEntrenador()));

        return planNutricional;
    }
}
