package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanNutricional;
import aorquerab.fitnexus.model.dtos.PlanNutricionalDTO;
import aorquerab.fitnexus.model.enumerator.Objetivo;
import aorquerab.fitnexus.model.exception.ClienteNotFoundException;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.PlanNutricionalRepository;
import aorquerab.fitnexus.service.PlanNutricionalService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;
import static aorquerab.fitnexus.utils.PlanNutriDTOMapper.mapperFromPlanNutriDTO;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/plan-nutri"})
@Slf4j
public class PlanNutricionalController {
    private final PlanNutricionalRepository planNutricionalRepository;
    private final ClienteRepository clienteRepository;

    private final PlanNutricionalService planNutricionalService;

    public PlanNutricionalController(PlanNutricionalRepository planNutricionalRepository,
                                     ClienteRepository clienteRepository,
                                     PlanNutricionalService planNutricionalService) {
        this.planNutricionalRepository = planNutricionalRepository;
        this.clienteRepository = clienteRepository;
        this.planNutricionalService = planNutricionalService;
    }

    //TODO: cliente desde UI puede hacer OBTENER_PLAN_ENTRENAMIENTO
    // If (entrenador no ha creado plan aun) error 404, el plan no ha sido encontrado o 40X no ha sido creado aun
    // si el id existe pero no hay mas datos en BBDD sobre el plan asociado al cliente
    // 1. El cliente solicita un PLAN (SOLICITAR PLAN), un POST con: emailId y entrenadorId (sacados por get?)
    // que crea en BBDD el plan con su id_plan_nutri
    // si el cliente no ha rellenado clienteDTO no se podrá pedir la creación de un plan (en porcentajes o en macros)
    // Necesitamos para ello asociar el entrenador con el cliente QUIZÁS EN UN CAMPO de signupDTO
    // del form inicial

    //TODO: El entrenador observa en la lista de clientes una tarea pendiente en una columna
    // con el botón desplegable o algo asi de ver tareas pendientes.
    // hace un POST en un botón(CrearPlan) con los datos clienteDTO del cliente concreto y su Email
    // El resultado es un 201 plan creado (o por porcentajes o por macros)

    @GetMapping
    public List<PlanNutricional> obtenerPlanes(){
        log.info("Ejecutando obtenerPlanes...");
        return planNutricionalRepository.findAll();
    }

    @GetMapping("/gramos/{fitNexusId}")
    public ResponseEntity <PlanNutricionalDTO> obtenerPlanNutriMacrosEnGramos (@PathVariable String fitNexusId) {
        PlanNutricionalDTO planNutricionalDTO;

        log.info("Ejecutando obtenerPlanNutriMacrosEnGramos con este fitNexusId: {}", fitNexusId);

        try {
            if (fitNexusId == null) {
                throw new ClienteNotFoundException("Cliente no encontrado con el fitNexusId");
            } else {
                PlanNutricional planDeCliente = planNutricionalService.obtenerPlanDeClientePorSuFitNexusId(fitNexusId);

                if (planDeCliente.getFechaInicio() == null) {
                    log.info("El plan nutricional en macros no ha sido creado aun");
                    throw new InvalidRequestException("El plan nutricional no ha sido creado aun");
                }
                else {
                    planNutricionalDTO = planNutricionalService.calcularMacrosEnGramos(planDeCliente);
                    log.info("Plan nutricional en gramos tras el calculo: {}", planNutricionalDTO);
                    if (planNutricionalDTO == null) throw new InvalidRequestException("Peticion de plan nutricional en macros no valida");
                        else log.info("El plan nutricional en macros existente en BD, macrosDTO creado");
                }

                return ResponseEntity.status(HttpStatus.OK).body(planNutricionalDTO); //-> 120,150,70 (g)
            }
        } catch (Exception e) {
            log.warn("Excepción obtenerPlanNutriEnMacros: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(PlanNutricionalDTO.builder().build());
        }
    }

    @GetMapping("/porcentajes/{fitNexusId}")
    public ResponseEntity <PlanNutricionalDTO> obtenerPlanNutriEnPorcentajes (@PathVariable String fitNexusId) {
        
        PlanNutricionalDTO planNutricionalDTO;
        
        log.info("Ejecutando obtenerPlanNutriEnPorcentajes con este fitNexusId: {}", fitNexusId);
       
        try {
            if (fitNexusId == null) {
                throw new InvalidRequestException("Peticion de plan nutricional en porcentajes no valida");
            } else {
                Cliente cliente = planNutricionalService.obtenerClientePorFitNexusId(fitNexusId)
                        .orElseThrow(()-> {
                            log.warn("Cliente no encontrado en -obtenerPlanNutriEnPorcentajes- con el fitNexusId: {}", fitNexusId);
                            return new InvalidRequestException("Cliente no encontrado con el fitNexusId:" + fitNexusId);
                        });
                log.info("cliente: {} encontrado con el fitNexusId: {} ", cliente, fitNexusId);
                PlanNutricionalDTO planDeCliente = planNutricionalService.obtenerPlanDeClienteDTOPorSuFitNexusId(fitNexusId);

                if (planDeCliente.getFechaInicio() == null) {
                    log.info("El plan nutricional en porcentajes no ha sido creado aun");
                    throw new InvalidRequestException("El plan nutricional en porcentajes no ha sido creado aun");
                } else {
                    planNutricionalDTO = planNutricionalService.obtenerPorcentajeMacrosPorObjetivo(cliente);
                    log.info("El plan nutricional en porcentajes existente en BD, porcentajes DTO creado");
                }
                //→ 30,30,40(definición) 50,30,20(volumen)
                return ResponseEntity.status(HttpStatus.OK).body(planNutricionalDTO);
            }
        } catch (Exception e) {
            log.warn("Excepción obtenerPlanNutriEnPorcentajes: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(PlanNutricionalDTO.builder().build());
        }
    }

    @GetMapping ("/kcal/{fitNexusId}")
    public ResponseEntity <PlanNutricionalDTO> obtenerKcalDeCadaMacroParaClienteDesdePlanNutricional (
            @PathVariable String fitNexusId) {
        
        log.info("Ejecutando obtenerKcalDeCadaMacroParaClienteDesdePlanNutricional con este fitNexusId: {}", fitNexusId);

        PlanNutricionalDTO planDeCliente = planNutricionalService.obtenerPlanDeClienteDTOPorSuFitNexusId(fitNexusId);
        log.info ("El plan del cliente es: {}", planDeCliente);

        if (planDeCliente.getFechaInicio() == null) {
            log.info("Las kcal del plan nutricional no han sido calculadas aun");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(PlanNutricionalDTO.builder().build());
        }
        else {
            int proteinaKcal = planDeCliente.getKcal() * planDeCliente.getProteina() / 100;
            int hidratosKcal = planDeCliente.getKcal() * planDeCliente.getHidratoDeCarbono() / 100;
            int grasasKcal = planDeCliente.getKcal() * planDeCliente.getGrasa() / 100;
            log.info("Kcal de cada macro: (proteina/hc/grasas): {} kcal de proteina, {} kcal de hc {} y kcal de grasa"
                    , proteinaKcal, hidratosKcal, grasasKcal);

            PlanNutricionalDTO planNutricionalKcal = PlanNutricionalDTO.builder()
                    .proteina(proteinaKcal)
                    .grasa(grasasKcal)
                    .hidratoDeCarbono(hidratosKcal)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(planNutricionalKcal); //Ejemplo: -> 800,720,520 (kcal
        }
    }

    @PostMapping
    public ResponseEntity <String> crearPlanNutriEnPorcentajes(@RequestBody String clienteEmailId) {
        log.info("Ejecutando crearPlanNutriEnPorcentajes...");
        try {
            if(clienteEmailId == null)
                throw new InvalidRequestException("Peticion de creacion de plan nutricional en porcentajes no valida");
            else {
                log.info("Cliente email id enviado en JSON en la peticion: {}", clienteEmailId);

                ObjectMapper objectMapper = new ObjectMapper();
                Map <String,String> emailFromPayload = objectMapper.readValue(clienteEmailId, Map.class);
                String email = emailFromPayload.get("email");
                log.info("Email id enviado en la peticion: " + email);

                Cliente cliente = clienteRepository.findByEmail(email)
                        .orElseThrow(()-> {
                            log.warn("Cliente no encontrado con el email: {}", email);
                            return new InvalidRequestException("Cliente no encontrado con el email:" + email);
                        });
                log.info("cliente: {} encontrado con el email: {} ", cliente, email);

                PlanNutricionalDTO planNutricionalDTO;

                double tasaMetabolismoBasalCliente =
                        planNutricionalService.calcularTasaMetabolismoBasal(
                                cliente.getPeso(),cliente.getAltura(),cliente.getEdad(),cliente.getGenero());

                int kCalDiariasMantenimientoCliente =
                        planNutricionalService.obtenerKcalDiariasParaMantenimiento(
                                cliente.getFrecuenciaEjercicioSemanal().getFactorActividad(), tasaMetabolismoBasalCliente);

                int kcalDiariasPorObjetivo =
                        planNutricionalService.obtenerKcalDiariasPorObjetivo(cliente.getObjetivo(), kCalDiariasMantenimientoCliente);

                PlanNutricionalDTO.PlanNutricionalDTOBuilder planNutricionalDTOBuilder = PlanNutricionalDTO
                        .builder()
                        .kcal(kcalDiariasPorObjetivo);

                //Duracion del plan en función del objetivo
                if (cliente.getObjetivo().equals(Objetivo.GANAR_MUSCULO)) {
                    planNutricionalDTOBuilder.proteina(30).hidratoDeCarbono(50).grasa(20)
                            .fechaInicio(LocalDate.now()).fechaFinal(LocalDate.now().plusWeeks(6));
                } else if (cliente.getObjetivo().equals(Objetivo.PERDER_GRASA)) {
                    planNutricionalDTOBuilder.proteina(30).hidratoDeCarbono(30).grasa(40)
                            .fechaInicio(LocalDate.now()).fechaFinal(LocalDate.now().plusWeeks(4));
                } else if (cliente.getObjetivo().equals(Objetivo.MANTENER_FORMA)) {
                    planNutricionalDTOBuilder.proteina(30).hidratoDeCarbono(40).grasa(40)
                            .fechaInicio(LocalDate.now()).fechaFinal(LocalDate.now().plusWeeks(4));
                }
                planNutricionalDTO = planNutricionalDTOBuilder.build();
                log.info("Plan nutricional DTO creado usando patron builder: {}", planNutricionalDTO);
                PlanNutricional planNutricional = mapperFromPlanNutriDTO(planNutricionalDTO);
                log.info("Plan nutricional creada tras el mapeo: {}", planNutricional);
                planNutricionalRepository.save(planNutricional);
                log.info("Plan nutricional con porcentajes de macronutrientes creada en base de datos");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body("Plan nutricional en porcentajes creada correctamente.");
        } catch (Exception e) {
            log.info("Excepcion crearPlanNutriEnPorcentajes: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al crear el plan nutricional.");
        }
    }
}
