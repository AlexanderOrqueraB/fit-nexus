package aorquerab.fitnexus.model.enumerator;

public enum Objetivo {
    PERDER_GRASA (400), GANAR_MUSCULO (300);

    private final int kcalExtra;

    Objetivo (int kcalExtra) {
        this.kcalExtra = kcalExtra;
    }

    public int getKcalExtra () {
        return kcalExtra;
    }
}
