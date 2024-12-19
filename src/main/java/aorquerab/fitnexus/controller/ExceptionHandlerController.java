package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import aorquerab.fitnexus.model.exception.EntrenadorNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.exception.RutinaNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<String> handleInvalidRequestException (InvalidRequestException ex) {
        return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({EjercicioNotFoundException.class, RutinaNotFoundException.class})
    public ResponseEntity<String> handleComponenteEntrenamientoNotFoundException (RuntimeException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    //TODO: Refactor this, maybe we can handle the same exception not-found by using the same method
    @ExceptionHandler(EntrenadorNotFoundException.class)
    public ResponseEntity<String> handleEntrenadorNotFoundException (EntrenadorNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RutinaNotFoundException.class)
    public ResponseEntity<String> handleRutinaNotFoundException(RutinaNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        log.error("Error inesperado", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno del servidor");
    }

}
