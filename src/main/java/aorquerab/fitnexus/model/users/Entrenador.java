package aorquerab.fitnexus.model.users;


// - id: int
//
// - fitNexusId: UUID
//
// - nombre: String
//
// - apellido: String
//
// - nombreDeUsuario: String
//
// - email: String
//
// - asesorNutricional: boolean

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "entrenador")
public class Entrenador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID fitNexusId;

    private String nombre;
    private String apellido;
    private String nombreDeUsuario;

    private String email;

    private Boolean asesorNutricional;

    @OneToMany(mappedBy = "entrenador")
    private ArrayList<Cliente> clientes;
}
