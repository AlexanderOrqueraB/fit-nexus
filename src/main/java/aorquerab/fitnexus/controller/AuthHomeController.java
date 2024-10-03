package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.LoginDTO;
import aorquerab.fitnexus.model.DTOs.SignupDTO;
import aorquerab.fitnexus.model.enumeration.Role;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.security.CustomUserDetails;
import aorquerab.fitnexus.security.CustomUserDetailsService;
import aorquerab.fitnexus.utils.UsuarioAuthDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
public class AuthHomeController {

    /* Este método redirige todas las rutas que no son recursos estáticos a index.html
     * El controlador interceptará cualquier ruta que no contenga un punto (.) ->Ej: /login
     * y redirigirá a index.html. Luego, React Router manejará el enrutamiento del lado del cliente.
     */

    private final EntrenadorRepository entrenadorRepository;
    private final ClienteRepository clienteRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;

    public AuthHomeController(EntrenadorRepository entrenadorRepository, ClienteRepository clienteRepository,
                              CustomUserDetailsService customUserDetailsService, AuthenticationManager authenticationManager) {
        this.entrenadorRepository = entrenadorRepository;
        this.clienteRepository = clienteRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.authenticationManager = authenticationManager;
    }

//    @GetMapping("/{path:^(?!api|favicon.ico|static).*}")
//    //expresion que da por valida /endpointA/endpointB/... -> ("/**/{path:^(?!.*\\.).*$}")
//    public String redirectToReact(@PathVariable String path) {
//        log.info("Redireccionando a React. React-Router enrutará a partir de aquí...");
//
//        if (VALID_ROUTES.contains(path)) {
//            return "forward:/index.html";
//        }
//
//        return "forward:/notfound.html";
//        //@Controller returns a String and Spring understand that as a view page-> index.html
//    }

//    @GetMapping("/{path:^(?!api|favicon.ico|static).*}")
//    public String redirectToReact(@PathVariable String path) {
//        log.info("Redireccionando a React. React-Router enrutará a partir de aquí...");
//
//        // Aquí asegúrate de que las rutas que comienzan con /api/v1/ no se redirijan al frontend
//        if (!path.startsWith("api")) {
//            return "forward:/index.html";
//        }
//
//        // Opcionalmente, puedes devolver un error si una ruta API no existe
//        return "forward:/notfound.html";
//    }

    @PostMapping("/api/v1/signup")
    public ResponseEntity<String> postSignup(
        @RequestBody SignupDTO signupDTO) {
        log.info("Ejecutando postSignup...");
        log.info("Signup data: {}", signupDTO);

        if(signupDTO == null) {
            throw new InvalidRequestException("Peticion de registro no válida");
        }
        log.info("Rol recibido: {}", signupDTO.getRole());
        try {
            if("USER".equalsIgnoreCase(String.valueOf(signupDTO.getRole()))) {
                Cliente clienteActualizado = UsuarioAuthDTOMapper.clienteMapperFromSignupDTO(signupDTO);
                log.info("Datos del cliente a guardar: {}", clienteActualizado);
                clienteRepository.save(clienteActualizado);
                log.info("postSignup Cliente ejecutado.");
                return ResponseEntity.status(HttpStatus.CREATED).body("Cliente registrado correctamente.");
            } else if ("ADMIN".equalsIgnoreCase(String.valueOf(signupDTO.getRole()))) {
                Entrenador entrenadorActualizado = UsuarioAuthDTOMapper.entrenadorMapperFromSignupDTO(signupDTO);
                entrenadorRepository.save(entrenadorActualizado);
                log.info("postSignup Entrenador ejecutado.");
                return ResponseEntity.status(HttpStatus.CREATED).body("Entrenador registrado correctamente.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tipo de usuario no válido");
            }

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error al registrar el usuario: " + e.getMessage());
        }
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<Map<String, Object>> postLogin(
            @RequestBody LoginDTO loginDTO) {
        log.info("Ejecutando postLogin...");
        log.info("Login data: {}", loginDTO);

        if(loginDTO == null) {
            throw new InvalidRequestException("Peticion de inicio de sesión no valida");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
            // Si la autenticación es exitosa, cargamos el usuario
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDTO.getEmail());

            String userRole = "";
            if (userDetails instanceof CustomUserDetails) {
                Role role = ((CustomUserDetails) userDetails).getRole();
                userRole = role.name();
            }
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login exitoso. Bienvenidx: " + userDetails.getUsername());
            response.put("role", userRole);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Credenciales inválidas: " + e.getMessage()));
        }
    }
}
