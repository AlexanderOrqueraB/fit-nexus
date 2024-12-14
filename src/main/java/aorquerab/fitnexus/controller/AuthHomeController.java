package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.dtos.LoginDTO;
import aorquerab.fitnexus.model.dtos.SignupDTO;
import aorquerab.fitnexus.model.dtos.auth.ChangeLoginDTO;
import aorquerab.fitnexus.model.dtos.minimized.SignupDTOResponse;
import aorquerab.fitnexus.model.enumerator.Role;
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
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@Slf4j
public class AuthHomeController {

    /** Este método redirige todas las rutas que no son recursos estáticos a index.html
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
    public ResponseEntity<SignupDTOResponse> postSignup(
        @RequestBody SignupDTO signupDTO) {
        log.info("Ejecutando postSignup con estos datos: {}", signupDTO);
        log.info("Rol recibido: {}", signupDTO.getRole());
        ResponseEntity<SignupDTOResponse> responseEntity = null;

        try {
            if ("USER".equalsIgnoreCase(String.valueOf(signupDTO.getRole()))) {
                UUID entrenadorFitNexusId = signupDTO.getEntrenador().getFitNexusId();
                Entrenador entrenador = entrenadorRepository.findByFitNexusId(entrenadorFitNexusId)
                        .orElseThrow(()-> {
                            log.warn("Entrenador no encontrado con el FitNexusId: {}", entrenadorFitNexusId);
                            return new InvalidRequestException("Entrenador no encontrado con el FitNexusId: " +
                                    entrenadorFitNexusId.toString());
                        });
                Cliente clienteActualizado = UsuarioAuthDTOMapper.clienteMapperFromSignupDTO(signupDTO, entrenador);
                log.info("Datos del cliente a guardar: {}", clienteActualizado);
                clienteRepository.save(clienteActualizado);
                log.info("postSignup Cliente ejecutado y registrado correctamente.");
                SignupDTOResponse responsePayload = SignupDTOResponse.builder()
                        .email(clienteActualizado.getEmail())
                        .clienteDesde(clienteActualizado.getClienteDesde())
                        .build();
                responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(responsePayload);
            } else if ("ADMIN".equalsIgnoreCase(String.valueOf(signupDTO.getRole()))) {
                String fitNexusId = generateFitNexusId();
                Entrenador entrenadorActualizado = UsuarioAuthDTOMapper.entrenadorMapperFromSignupDTO(signupDTO, fitNexusId);
                log.info("Datos del entrenador a guardar: {}", entrenadorActualizado);
                entrenadorRepository.save(entrenadorActualizado);
                log.info("postSignup Entrenador ejecutado y registrado correctamente.");
                SignupDTOResponse responsePayload = SignupDTOResponse.builder()
                        .email(entrenadorActualizado.getEmail())
                        .fitNexusId(fitNexusId)
                        .clienteDesde(entrenadorActualizado.getClienteDesde())
                        .build();
                responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(responsePayload);
            }
        } catch (Exception e) {
            log.info("Error al registrar al usuario: {}", e.getMessage());
            throw new InvalidRequestException("Usuario no registrado en base de datos");
        }
        return responseEntity;
    }

    private String generateFitNexusId() {
        UUID fitNexusId = UUID.randomUUID();
        return fitNexusId.toString();
    }

    @GetMapping("/api/v1/roles/{userEmailId}")
    @ResponseBody
    public Optional<Role> obtenerRolePorEmailId (@PathVariable String userEmailId){
        log.info("Ejecutando obtenerRolePorEmailId con este emailId: {} ", userEmailId);
        Optional<Cliente> clienteByEmailId = clienteRepository.findByEmail(userEmailId);
        if(clienteByEmailId.isPresent()) {
            return Optional.of(clienteByEmailId.get().getRole());
        }

        Optional<Entrenador> entrenadorByEmailId = entrenadorRepository.findByEmail(userEmailId);
        if (entrenadorByEmailId.isPresent()) {
            return Optional.of(entrenadorByEmailId.get().getRole());
        }
        log.info("Email no encontrado en base de datos");
        return Optional.empty();
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<Map<String, Object>> postLogin(
            @RequestBody LoginDTO loginDTO) {
        log.info("Ejecutando postLogin con los datos: {}", loginDTO);

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
                log.info("Obteniendo rol: {}", ((CustomUserDetails) userDetails).getRole());
                Role role = ((CustomUserDetails) userDetails).getRole();
                log.info("userRole= {}", role.name());
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

    //TODO: How to do a put using Spring Security, do I need to use CustomUserDetails and so on?
    @PutMapping("/api/v1/login/{userId}")
    public ResponseEntity<Object> actualizarLogin (@PathVariable Long id, @RequestBody ChangeLoginDTO changeLoginDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(new Object());
    }
}
