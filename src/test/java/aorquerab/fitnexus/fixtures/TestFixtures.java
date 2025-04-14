package aorquerab.fitnexus.fixtures;
import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanDeEntrenamiento;
import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.enumerator.FrecuenciaEjercicioSemanal;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public final class TestFixtures {

    //Test cases for testing PlanNutricionalControllerTest
    //Case 1: Cliente with extra data
    public static Cliente createClienteWithExtraData(
            String fitNexusId, String nombre, String apellido, String email,
            int edad, double peso, double altura, FrecuenciaEjercicioSemanal ejercicioSemanal, Genero genero) {
        return Cliente.builder()
                .fitNexusId(UUID.fromString(fitNexusId))
                .nombre(nombre)
                .apellido(apellido)
                .email(email)
                .edad(edad)
                .peso(peso)
                .altura(altura)
                .frecuenciaEjercicioSemanal(frecuenciaEjercicioSemanal)
                .genero(genero)
                .build();
    }

    //Case 2: Cliente with no extra data
    public static Cliente createClienteWithNoExtraData(
            String fitNexusId, String nombre, String apellido, String email) {
        return Cliente.builder()
                .fitNexusId(UUID.fromString(fitNexusId))
                .nombre(nombre)
                .apellido(apellido)
                .email(email)
                .build();
    } 

    public static Ejercicio createEjercicio(Long id, String nombre, int series, int repeticiones, double peso, boolean cardioRealizado) {
        return Ejercicio.builder()
                .id(id)
                .nombreEjercicio(nombre)
                .serie(series)
                .repeticion(repeticiones)
                .peso(peso)
                .cardioRealizado(cardioRealizado)
                .build();
    }

    public static Rutina createRutina(Long id, String nombre, LocalDate fechaInicio, LocalDate fechaFinal, List<Ejercicio> ejercicios) {
        return Rutina.builder()
                .id(id)
                .nombreRutina(nombre)
                .fechaInicio(fechaInicio)
                .fechaFinal(fechaFinal)
                .ejercicios(ejercicios)
                .build();
    }

    public static PlanDeEntrenamiento createPlanDeEntrenamiento(Long id, String nombre, LocalDate fechaInicio, LocalDate fechaFinal, Cliente cliente, Entrenador entrenador, List<Rutina> rutinas) {
        return PlanDeEntrenamiento.builder()
                .id(id)
                .nombrePlan(nombre)
                .fechaInicio(fechaInicio)
                .fechaFinal(fechaFinal)
                .cliente(cliente)
                .entrenador(entrenador)
                .rutinas(rutinas)
                .build();
    }

    public static Cliente createCliente(String fitNexusId, String nombre, String apellido, String email, int edad, double peso, double altura) {
        return Cliente.builder()
                .fitNexusId(UUID.fromString(fitNexusId))
                .nombre(nombre)
                .apellido(apellido)
                .email(email)
                .edad(edad)
                .peso(peso)
                .altura(altura)
                .build();
    }

    public static Entrenador createEntrenador(String fitNexusId, String nombre, String apellido, String email) {
        return Entrenador.builder()
                .fitNexusId(UUID.fromString(fitNexusId))
                .nombre(nombre)
                .apellido(apellido)
                .email(email)
                .build();
    }
}