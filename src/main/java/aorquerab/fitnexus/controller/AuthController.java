package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.LoginTemp;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.repository.AuthRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping(FITNEXUS_BASE_URI)
@Slf4j
public class AuthController {
    private final AuthRepository authRepository;

    public AuthController(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    @GetMapping ("/auth")
    public ResponseEntity<String> getAuthentication () {
        log.info("Ejecutando getAuth...");
        String authentication = "Testeando GET /auth endpoint";
        return ResponseEntity.status(HttpStatus.OK).body(authentication);
    }

    @PostMapping ("/login")
    public ResponseEntity<String> postLogin (
        @RequestBody LoginTemp loginTemp) {
        log.info("Ejecutando postLogin...");
        log.info("LoginTemp: {}", loginTemp);
        if(loginTemp == null) {
            throw new InvalidRequestException("Peticion de login no valida");
        }
        if (loginTemp.getEmail() == null || loginTemp.getPassword() == null) {
            throw new InvalidRequestException("Email o contraseña no pueden ser nulos.");
        } //TODO sustituir esto por un optional
        if ((loginTemp.getEmail().equals("admin")) && (loginTemp.getPassword().equals("admin"))) {
            return ResponseEntity.status(HttpStatus.OK).body("Eres el admin.");
        }
        else return ResponseEntity.status(HttpStatus.OK).body("No eres el admin");
    }

}
