package aorquerab.fitnexus.model.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class EjercicioNotFoundException extends ResponseStatusException {

    public EjercicioNotFoundException(HttpStatusCode status, String message) {
        super(status, message);
    }
}
