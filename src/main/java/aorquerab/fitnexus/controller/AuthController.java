package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.LoginTemp;
import aorquerab.fitnexus.repository.AuthRepository;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        @RequestBody LoginTemp loginTemp
    )

    //TODO: Make cheat login post with hardcoded validation

}
