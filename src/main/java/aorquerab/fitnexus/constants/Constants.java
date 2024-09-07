package aorquerab.fitnexus.constants;

import lombok.experimental.UtilityClass;

import java.util.Arrays;
import java.util.List;

@UtilityClass
public class Constants {
    public static final String FITNEXUS_BASE_URI = "/api/v1";
    public static final List <String> VALID_ROUTES = Arrays.asList
            ("login", "signup", "edit-profile", "create-exercise", "ejercicios", "form");
}
