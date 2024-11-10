package aorquerab.fitnexus.model.dtos.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChangeLoginDTO {

    private String email;
    private String password;

    String changeLoginDTORequest = """
    {
        "email": "Apellido nuevo",
        "password": "2024-06-18"
    }
    """;
}
