package aorquerab.fitnexus.model.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class EntidadNotFoundException extends ResponseStatusException {

    public EntidadNotFoundException(HttpStatusCode status, String message) {
        super(status, message);
    }
}
