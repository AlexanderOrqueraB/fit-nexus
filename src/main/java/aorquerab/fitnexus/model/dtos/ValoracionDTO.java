package aorquerab.fitnexus.model.dtos;

import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.PlanDeEntrenamientoDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ValoracionDTO {

    private String comentario;
    private PlanDeEntrenamientoDTO planDeEntrenamientoDTOmin;

}
