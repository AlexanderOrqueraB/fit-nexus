package aorquerab.fitnexus.model.enumerator;

public enum FrecuenciaEjercicioSemanal {

    POCO_NADA(1.2), LIGERO(1.375),
    MODERADO(1.55), FUERTE(1.725), MUY_FUERTE(1.9);

    private final double factorActividad;

    FrecuenciaEjercicioSemanal(double factorActividad) {
        this.factorActividad = factorActividad;
    }

    public double getFactorActividad() {
        return factorActividad;
    }
}
