package aorquerab.fitnexus.model.dtos.minimized;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SignupDTOResponse {

    private String fitNexusId;
    private String email;
    private LocalDate clienteDesde;
}
