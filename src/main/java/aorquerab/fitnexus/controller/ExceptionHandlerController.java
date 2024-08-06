package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.exception.EjercicioNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(EjercicioNotFoundException.class)
    public ResponseEntity<String> handleEjercicioNotFoundException (EjercicioNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
