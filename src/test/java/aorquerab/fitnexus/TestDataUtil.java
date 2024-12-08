package aorquerab.fitnexus;

import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;

public final class TestDataUtil {
    public static Ejercicio crearEjercicio () {
        return Ejercicio.builder()
                .serie(5)
                .build();
//final Ejercicio expected = TestDataUtil.createExercise();
//TODO: for unit testing purposes
    }
}