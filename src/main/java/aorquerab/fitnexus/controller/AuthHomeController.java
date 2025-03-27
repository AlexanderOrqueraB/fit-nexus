package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.dtos.LoginDTO;
import aorquerab.fitnexus.model.dtos.SignupDTO;
import aorquerab.fitnexus.model.dtos.auth.ChangeLoginDTO;
import aorquerab.fitnexus.model.dtos.minimized.DatosUsuarioDTO;
import aorquerab.fitnexus.model.dtos.minimized.SignupDTOResponse;
import aorquerab.fitnexus.model.enumerator.Role;
import aorquerab.fitnexus.model.exception.ClienteNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.model.users.Entrenador;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.security.CustomUserDetails;
import aorquerab.fitnexus.security.CustomUserDetailsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@Controller
@Slf4j
public class AuthHomeController {

    /** Este método redirige todas las rutas que no son recursos estáticos a index.html
     * El controlador interceptará cualquier ruta que no contenga un punto (.) →Ej: /login
     * y redirigirá a index.html. Luego, React Router manejará el enrutamiento del lado del cliente.
     */

    private final EntrenadorRepository entrenadorRepository;
    private final ClienteRepository clienteRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthHomeController(EntrenadorRepository entrenadorRepository, ClienteRepository clienteRepository,
                              CustomUserDetailsService customUserDetailsService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.entrenadorRepository = entrenadorRepository;
        this.clienteRepository = clienteRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

//    @GetMapping("/{path:^(?!api|favicon.ico|static).*}")
//    //expresión que da por valida /endpointA/endpointB/... -> ("/**/{path:^(?!.*\\.).*$}")
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
    public ResponseEntity<SignupDTOResponse> registrarUsuario(
        @RequestBody SignupDTO signupDTO) {
        log.info("Ejecutando registro postSignUp con estos datos: {}", signupDTO);
        log.info("Rol recibido: {}", signupDTO.getRole());
        ResponseEntity<SignupDTOResponse> responseEntity = null;

        try {
            if ("USER".equalsIgnoreCase(String.valueOf(signupDTO.getRole()))) {
                UUID entrenadorFitNexusId = UUID.fromString(signupDTO.getEntrenador().getFitNexusId());
                log.info ("FitNexusId de entrenador: {}", entrenadorFitNexusId);
                Entrenador entrenador = entrenadorRepository.findByFitNexusId(entrenadorFitNexusId)
                        .orElseThrow(()-> {
                            log.warn("Entrenador no encontrado con el FitNexusId: {}", entrenadorFitNexusId);
                            return new InvalidRequestException("Entrenador no encontrado con el FitNexusId: " +
                                    entrenadorFitNexusId);
                        });
                UUID fitNexusId = generateFitNexusId();
                log.info ("FitNexusId de cliente: {}", fitNexusId);
                Cliente clienteActualizado = Cliente.builder()
                        .usuarioDesde(LocalDate.now())
                        .fitNexusId(fitNexusId)
                        .nombre(signupDTO.getNombre())
                        .apellido(signupDTO.getApellido())
                        .email(signupDTO.getEmail())
                        .role(signupDTO.getRole())
                        .entrenador(entrenador)
                        .build();
                clienteActualizado.setPassword(passwordEncoder.encode(signupDTO.getPassword()));

                log.info("Datos del cliente a guardar: {}", clienteActualizado);
                clienteRepository.save(clienteActualizado);
                log.info("postSignup Cliente ejecutado y registrado correctamente.");
                SignupDTOResponse responsePayload = SignupDTOResponse.builder()
                        .email(clienteActualizado.getEmail())
                        .fitNexusId(fitNexusId.toString())
                        .usuarioDesde(clienteActualizado.getUsuarioDesde())
                        .build();
                responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(responsePayload);
            } else if ("ADMIN".equalsIgnoreCase(String.valueOf(signupDTO.getRole()))) {
                UUID fitNexusId = generateFitNexusId();
                Entrenador entrenadorActualizado = Entrenador.builder()
                        .usuarioDesde(LocalDate.now())
                        .fitNexusId(fitNexusId)
                        .nombre(signupDTO.getNombre())
                        .apellido(signupDTO.getApellido())
                        .email(signupDTO.getEmail())
                        .role(signupDTO.getRole())
                        .build();
                entrenadorActualizado.setPassword(passwordEncoder.encode(signupDTO.getPassword()));

                log.info("Datos del entrenador a guardar: {}", entrenadorActualizado);
                entrenadorRepository.save(entrenadorActualizado);
                log.info("postSignup Entrenador ejecutado y registrado correctamente.");
                SignupDTOResponse responsePayload = SignupDTOResponse.builder()
                        .email(entrenadorActualizado.getEmail())
                        .fitNexusId(fitNexusId.toString())
                        .usuarioDesde(entrenadorActualizado.getUsuarioDesde())
                        .build();
                responseEntity = ResponseEntity.status(HttpStatus.CREATED).body(responsePayload);
            }
        } catch (Exception e) {
            log.info("Error al registrar al usuario: {}", e.getMessage());
            throw new InvalidRequestException("Usuario no registrado en base de datos");
        }
        return responseEntity;
    }

    private UUID generateFitNexusId() {
        return UUID.randomUUID();
    }

    @PostMapping("/api/v1/login")
    public ResponseEntity<Map<String, Object>> postLogin(
            @RequestBody LoginDTO loginDTO) {
        log.info("Ejecutando iniciar sesión con los datos: {}", loginDTO);

        if (loginDTO == null) {
            throw new InvalidRequestException("Peticion de inicio de sesión no valida");
        }

        Authentication authenticationAfter = null;
        try {
            UsernamePasswordAuthenticationToken authTokenBefore = new UsernamePasswordAuthenticationToken(
                    loginDTO.getEmail(), loginDTO.getPassword());
            log.info("AuthToken antes de la autenticación {}: ", authTokenBefore);

            authenticationAfter = authenticationManager.authenticate(authTokenBefore);
            log.info("AuthToken después de la autenticación {}: ", authenticationAfter);

            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(authenticationAfter);

            log.info("AuthToken en el Security Context: {}", sc.getAuthentication());

            log.info("Authentication role info: {} and isAuthenticated: {} ",
                    authenticationAfter.getAuthorities(), //[ROLE_ADMIN
                    authenticationAfter.isAuthenticated()); //true

            // Si la autenticación es exitosa, cargamos el usuario desde los datos de DB
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginDTO.getEmail());
            log.info("Datos tras cargar el usuario con el email {} ", loginDTO.getEmail());
            log.info("Contraseña del usuario en la petición: {}", loginDTO.getPassword());
            log.info("Contraseña codificada en DB: {}", userDetails.getPassword());
            if (!passwordEncoder.matches(loginDTO.getPassword(), userDetails.getPassword())) {
                throw new BadCredentialsException("Contraseña incorrecta");
            }

            String userEmail = loginDTO.getEmail();
            String userRole = null;
            UUID fitNexusId = null;
            if (userDetails instanceof CustomUserDetails) {
                Role role = ((CustomUserDetails) userDetails).getRole();
                fitNexusId = ((CustomUserDetails) userDetails).getFitNexusId();
                log.info("Obteniendo rol: {}", role);
                if (role != null) {
                    userRole = role.name();
                    log.info("Rol del usuario: {}", userRole);
                }
                if (fitNexusId != null) {
                    log.info("FitNexusId del usuario: {}", fitNexusId);
                }
            }
            Map<String, Object> response = new HashMap<>();

            if (userRole != null) {
                response.put("email", userEmail);
                response.put("role", userRole);
                response.put("fitNexusId", fitNexusId);
            }
            log.info("La respuesta tras el login es: {} ", response);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.info("Credenciales inválidas con el email {} y la contraseña {} ",
                    loginDTO.getEmail(), loginDTO.getPassword());
            log.info("Authentication info: {} ",
                    authenticationAfter.getDetails());
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Credenciales inválidas: " + e.getMessage()));
        }
    }

    @GetMapping("/api/v1/data/{fitNexusId}")
    public ResponseEntity<DatosUsuarioDTO> obtenerMisDatosPorFitNexusId (@PathVariable String fitNexusId){
        log.info("Ejecutando obtenerMisDatosPorFitNexusId con este fitNexusId: {}", fitNexusId);
        try {
            Optional<Cliente> clienteOptional = clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            if (clienteOptional.isEmpty() && entrenadorOptional.isEmpty()) {
                log.warn("Usuario no encontrado con el fitNexusId: {}", fitNexusId);
                throw new ClienteNotFoundException("Usuario no encontrado en BD: " + fitNexusId);
            }
            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                DatosUsuarioDTO datosExtraUsuario = DatosUsuarioDTO.builder()
                    .nombre(cliente.getNombre())
                    .apellido(cliente.getApellido())
                    .email(cliente.getEmail())
                    .fitNexusId(cliente.getFitNexusId().toString())
                    .build();
                log.info("Datos de cliente: {} ", datosExtraUsuario);
                return ResponseEntity.status(HttpStatus.OK).body(datosExtraUsuario);
            } else {
                Entrenador entrenador = entrenadorOptional.get();
                DatosUsuarioDTO datosExtraUsuario = DatosUsuarioDTO.builder()
                    .nombre(entrenador.getNombre())
                    .apellido(entrenador.getApellido())
                    .email(entrenador.getEmail())
                    .fitNexusId(entrenador.getFitNexusId().toString())
                    .build();
                log.info("Datos de entrenador: {} ", datosExtraUsuario);
                return ResponseEntity.status(HttpStatus.OK).body(datosExtraUsuario);
            }

        } catch (Exception e) {
            log.warn("Error al obtener cliente por emailId", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(DatosUsuarioDTO.builder().build());
        }
    }

    @PutMapping("api/v1/data/{fitNexusId}")
    public ResponseEntity<DatosUsuarioDTO> actualizarMisDatosPorFitNexusId (
                                                                @PathVariable String fitNexusId,
                                                                @RequestBody DatosUsuarioDTO datosUsuarioDTO) {
        log.info("Ejecutando actualizarMisDatosPorFitNexusId con este fitNexusId: {}", fitNexusId);
        log.info("Datos recibidos: {}", datosUsuarioDTO);
        try {
            DatosUsuarioDTO datosUsuarioActualizado;
            Optional<Cliente> clienteOptional = clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));

            if (clienteOptional.isEmpty() && entrenadorOptional.isEmpty()) {
                log.warn("Usuario no encontrado con el fitNexusId: {}", fitNexusId);
                throw new ClienteNotFoundException("Usuario no encontrado en BD: " + fitNexusId);
            }

            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                //Actualizas solo los campos enviados (distintos de null)
                if(datosUsuarioDTO.getNombre() != null)
                    cliente.setNombre(datosUsuarioDTO.getNombre());

                if(datosUsuarioDTO.getApellido() != null)
                    cliente.setApellido(datosUsuarioDTO.getApellido());

                if(datosUsuarioDTO.getEmail() != null)
                    cliente.setEmail(datosUsuarioDTO.getEmail());

                clienteRepository.save(cliente);
                datosUsuarioActualizado = DatosUsuarioDTO.builder()
                    .nombre(cliente.getNombre())
                    .apellido(cliente.getApellido())
                    .email(cliente.getEmail())
                    .build();
            } else {
                Entrenador entrenador = entrenadorOptional.get();
                //Actualizas solo los campos enviados (distintos de null)
                if(datosUsuarioDTO.getNombre() != null)
                    entrenador.setNombre(datosUsuarioDTO.getNombre());

                if(datosUsuarioDTO.getApellido() != null)
                    entrenador.setApellido(datosUsuarioDTO.getApellido());

                if(datosUsuarioDTO.getEmail() != null)
                    entrenador.setEmail(datosUsuarioDTO.getEmail());

                entrenadorRepository.save(entrenador);
                datosUsuarioActualizado = DatosUsuarioDTO.builder()
                    .nombre(entrenador.getNombre())
                    .apellido(entrenador.getApellido())
                    .email(entrenador.getEmail())
                    .build();
            }
            return ResponseEntity.status(HttpStatus.OK).body(datosUsuarioActualizado);

        } catch (Exception e) {
            log.warn("Error al actualizar cliente por emailId", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(DatosUsuarioDTO.builder().build());
        }
    }

    @PutMapping("/api/v1/user/password/{fitNexusId}")
    public ResponseEntity<String> cambiarPassword (
        @PathVariable String fitNexusId, @RequestBody ChangeLoginDTO changeLoginDTO) {
        log.info("Ejecutando cambiarPassword con este fitNexusId: {}", fitNexusId);

        try {
            Optional<Cliente> clienteOptional = clienteRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            Optional<Entrenador> entrenadorOptional = entrenadorRepository.findByFitNexusId(UUID.fromString(fitNexusId));
            
            if(clienteOptional.isPresent()) {
                Cliente cliente = clienteOptional.get();
                String emailCliente = cliente.getEmail();
                log.info("Se va a proceder a cambiar la contraseña de cliente con email {}",emailCliente);

                UserDetails userDetails = customUserDetailsService.loadUserByUsername(emailCliente);
                log.info("Los datos cargados del cliente con el email: {} ", emailCliente);
                if (userDetails == null || !passwordEncoder.matches(changeLoginDTO.getPasswordVieja(), userDetails.getPassword())) {
                    log.info("Contraseña actual incorrecta");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña actual incorrecta");
                } else if (userDetails instanceof CustomUserDetails) {
                    CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
                    if (customUserDetails.getRole().equals(Role.USER)) {
                        cliente.setPassword(passwordEncoder.encode(changeLoginDTO.getPasswordNueva()));
                        clienteRepository.save(cliente);
                        log.info("Se ha guardado correctamente la nueva contraseña");
                        return ResponseEntity.status(HttpStatus.OK).body("Contraseña cambiada correctamente");
                    }
                }
        } else if (entrenadorOptional.isPresent()) {
            Entrenador entrenador = entrenadorOptional.get();
            String emailEntrenador = entrenador.getEmail();
            log.info("Se va a proceder a cambiar la contraseña de entrenador con email {}",emailEntrenador);

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(emailEntrenador);
            log.info("Los datos cargados del entrenador con el email: {}", emailEntrenador);
                if (userDetails == null ||
                        !passwordEncoder.matches(changeLoginDTO.getPasswordVieja(), userDetails.getPassword())) {
                    log.info("Contraseña actual incorrecta");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña actual incorrecta");
                } else if (userDetails instanceof CustomUserDetails) {
                    CustomUserDetails customUserDetails = (CustomUserDetails) userDetails;
                    if (customUserDetails.getRole().equals(Role.ADMIN)) {
                        entrenador.setPassword(passwordEncoder.encode(changeLoginDTO.getPasswordNueva()));
                        entrenadorRepository.save(entrenador);
                        log.info("Se ha guardado correctamente la nueva contraseña");
                        return ResponseEntity.status(HttpStatus.OK).body("Contraseña cambiada correctamente");
                    }
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }
        }
        catch (Exception e) {
            log.error("Error al cambiar la contraseña", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cambiar la contraseña");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Solicitud incorrecta");
    }
}
