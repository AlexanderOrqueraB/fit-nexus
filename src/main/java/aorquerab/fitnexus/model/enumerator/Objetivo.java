package aorquerab.fitnexus.model.enumerator;

import lombok.Getter;

@Getter
public enum Objetivo {
    PERDER_GRASA (400),
    GANAR_MUSCULO (300),
    MANTENER_FORMA (0);

    private final int kcalExtra;

    Objetivo (int kcalExtra) {
        this.kcalExtra = kcalExtra;
    }

}
