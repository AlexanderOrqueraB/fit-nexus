package aorquerab.fitnexus.model.users;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.enumeration.Genero;
import aorquerab.fitnexus.model.enumeration.Objetivo;
import aorquerab.fitnexus.model.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString(exclude = "password")
@EqualsAndHashCode
@Entity
@Table(name = "entrenador")
public class Entrenador {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_log_gen")
    @SequenceGenerator(name = "seq_log_gen", sequenceName = "seq_log", allocationSize = 1)
    private Long id;
    private UUID fitNexusId;
    @Version
    @JsonIgnore
    private Integer version;

    //DTO login
    private String nombre;
    private String apellido;
    private String email;
    @JsonIgnore
    private String password;
    private Boolean asesorNutricional;
    @Enumerated(EnumType.STRING)
    private Role role;

    //DTO
    @Enumerated(EnumType.STRING)
    private Objetivo objetivo;
    @Enumerated(EnumType.STRING)
    private Genero genero;
    private Integer edad;
    private Integer peso;
    private Integer altura;

    public void setPassword (String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }

    @OneToMany(mappedBy = "entrenador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Cliente> clientes = new ArrayList<>();

    @OneToMany(mappedBy = "entrenador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PautaNutricional> pautasNutricionales = new ArrayList<>();

    @OneToMany(mappedBy = "entrenador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<PlanDeEntrenamiento> planesDeEntrenamiento = new ArrayList<>();

    @OneToMany(mappedBy = "entrenador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Rutina> rutinas = new ArrayList<>();

    @OneToMany(mappedBy = "entrenador", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ejercicio> ejercicios = new ArrayList<>();
}
