package aorquerab.fitnexus.model.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Entity
@Table(name = "cliente")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID fitNexusId;

    private String nombre;
    private String apellido;
    private String nombreDeUsuario;

    private Integer edad;
    private Integer peso;
    private Integer altura;

    private Boolean genero;

    private String email;
    private Integer mediaPasos;
    private String objetivo;

    @ManyToOne
    @JoinColumn(name = "entrenador_id", nullable = false)
    private Entrenador entrenador;
}
