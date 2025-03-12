package aorquerab.fitnexus.model.enumerator;

import lombok.Getter;
/**
 * Poco o ningún ejercicio: 1,2
 * Ejercicio ligero (1-3 días a la semana): 1,375
 * Ejercicio moderado (3-5 días a la semana): 1,55
 * Ejercicio fuerte (6-7 días a la semana): 1,725
 * Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros): 1,9*/
@Getter
public enum FrecuenciaEjercicioSemanal {

    POCO_NADA(1.2), LIGERO(1.375),
    MODERADO(1.55), FUERTE(1.725), MUY_FUERTE(1.9);

    private final double factorActividad;

    FrecuenciaEjercicioSemanal(double factorActividad) {
        this.factorActividad = factorActividad;
    }

}
