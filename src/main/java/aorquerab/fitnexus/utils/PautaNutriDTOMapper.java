package aorquerab.fitnexus.utils;

import aorquerab.fitnexus.model.DTOs.PautaNutricionalDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PautaNutriDTOMapper {

    public static List<PautaNutricionalDTO> mapperFromList (List <PautaNutricional> pautas) {
        if (pautas.isEmpty()) {
            return Collections.emptyList();
        } else {
            return pautas.stream()
                    .map(PautaNutriDTOMapper::mapperFromPauta)
                    .collect(Collectors.toList());
        }
    }

    public static PautaNutricionalDTO mapperFromPauta (PautaNutricional pautaNutricional) {
        PautaNutricionalDTO pautaNutricionalDTO = new PautaNutricionalDTO();
        pautaNutricionalDTO.setProteina(pautaNutricional.getProteina());
        pautaNutricionalDTO.setHidratoDeCarbono(pautaNutricional.getHidratoDeCarbono());
        pautaNutricionalDTO.setGrasa(pautaNutricional.getGrasa());
        pautaNutricionalDTO.setKcal(pautaNutricional.getKcal());
        pautaNutricionalDTO.setFechaInicio(pautaNutricional.getFechaInicio());
        pautaNutricionalDTO.setFechaFinal(pautaNutricional.getFechaFinal());

        return  pautaNutricionalDTO;
    }

    public static PautaNutricional mapperFromPautaNutriDTO (PautaNutricionalDTO pautaNutricionalDTO) {
        PautaNutricional pautaNutricional = new PautaNutricional();
        pautaNutricional.setProteina(pautaNutricionalDTO.getProteina());
        pautaNutricional.setHidratoDeCarbono(pautaNutricionalDTO.getHidratoDeCarbono());
        pautaNutricional.setGrasa(pautaNutricionalDTO.getGrasa());
        pautaNutricional.setKcal(pautaNutricionalDTO.getKcal());
        pautaNutricional.setFechaInicio(pautaNutricionalDTO.getFechaInicio());
        pautaNutricional.setFechaFinal(pautaNutricionalDTO.getFechaFinal());

        return  pautaNutricional;
    }
}
