package aorquerab.fitnexus.model.users;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.enumeration.Genero;
import aorquerab.fitnexus.model.enumeration.Objetivo;
import aorquerab.fitnexus.model.enumeration.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "cliente")
public class Cliente {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
    //TODO: añadir timestamp de fecha de creacion de usuario (para clienteslist)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_log_gen")
    @SequenceGenerator(name = "seq_log_gen", sequenceName = "seq_log", allocationSize = 1)
    private Long id;
    private UUID fitNexusId;
    @Version
    @JsonIgnore
    private Integer version;

    //DTO registro
    private String nombre;
    private String apellido;
    private String email;
    @JsonIgnore
    private String password;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "entrenador_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Entrenador entrenador;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "cliente_pauta_nutricional",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "pauta_nutricional_id")
    )
    @JsonIgnore
    private List<PautaNutricional> pautaNutricional= new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "cliente_plan_de_entrenamiento",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "plan_de_entrenamiento_id")
    )
    @JsonIgnore
    private List<PlanDeEntrenamiento> planDeEntrenamiento = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "cliente_rutina",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "rutina_id")
    )
    @JsonIgnore
    private List<Rutina> rutinas = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "cliente_ejercicio",
        joinColumns = @JoinColumn(name = "cliente_id"),
        inverseJoinColumns = @JoinColumn(name = "ejercicio_id")
    )
    @JsonIgnore
    private List<Ejercicio> ejercicios = new ArrayList<>();
}
