package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanNutricional;
import aorquerab.fitnexus.model.dtos.PlanNutricionalDTO;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.enumerator.Objetivo;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.exception.PlanNutricionalNotFoundException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.PlanNutricionalRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;
import static aorquerab.fitnexus.utils.PlanNutriDTOMapper.mapperFromPlanNutriDTO;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/plan-nutri"})
@Slf4j
public class NutriController {
    private final PlanNutricionalRepository planNutricionalRepository;
    private final ClienteRepository clienteRepository;

    public NutriController(PlanNutricionalRepository planNutricionalRepository, ClienteRepository clienteRepository) {
        this.planNutricionalRepository = planNutricionalRepository;
        this.clienteRepository = clienteRepository;
    }

    //TODO: cliente desde UI puede hacer OBTENER_PLAN_ENTRENAMIENTO
    // If (entrenador no ha creado plan aun) error 404, el plan no ha sido encontrado o 40X no ha sido creado aun
    // si el id existe pero no hay mas datos en BBDD sobre el plan asociado al cliente
    // 1. El cliente solicita un PLAN (SOLICITAR PLAN), un POST con: emailId y entrenadorId (sacados por get?)
    // que crea en BBDD el plan con su id_plan_nutri
    // si el cliente no ha rellenado clienteDTO no se podrá pedir la creación de un plan (en porcentajes o en macros)
    // Necesitamos para ello asociar el entrenador con el cliente QUIZAS EN UN CAMPO de signupDTO
    // del form inicial

    //TODO: El entrenador observa en la lista de clientes una tarea pendiente en una columna
    // con el boton desplegable o algo asi de ver tareas pendientes.
    // hace un POST en un boton(CrearPlan) con los datos clienteDTO del cliente concreto y su Email
    // El resultado es un 201 plan creado (o por porcentajes o por macros)

    @GetMapping
    public List<PlanNutricional> obtenerPlanes(){
        log.info("Ejecutando obtenerPlanes...");
        return planNutricionalRepository.findAll();
    }


    //TODO: THINK if maybe it is better to use as pathvariable the userId INSTEAD of planNutriId
    //TODO/CHECK:
    // @GetMapping("/porcentajes/{planNutriId}") -> 30,30,40(defi) 50,30,20(volumen) from objetivoCliente
    // apiClient.get(`/api/v1/plan-nutri/porcentajes/${planData.id}`)

    //TODO/CHECK:
    // @GetMapping("/gramos/{planNutriId}") -> 120,150,70 (g)
    // apiClient.get(`/api/v1/plan-nutri/gramos/${planData.id}`)

    //TODO/CHECK:
    // @GetMapping("/kcal/{planNutriId}") -> 800,720,520 (kcal
    // apiClient.get(`/api/v1/plan-nutri/kcal/${planData.id}`)


    @GetMapping("/porcentajes/{planNutriId}")
    public ResponseEntity <PlanNutricionalDTO> obtenerPlanNutriEnPorcentajes (@PathVariable Long planNutriId) {
        PlanNutricionalDTO planNutricionalDTO;
        try {
            if (planNutriId == null) {
                throw new InvalidRequestException("Peticion de plan nutricional en porcentajes no valida");
            } else {
                Optional<PlanNutricional> planNutricional = planNutricionalRepository.findById(planNutriId);
                if (planNutricional.isEmpty()) throw new InvalidRequestException("El plan nutricional en porcentajes no ha sido creado aun");
                else {
                    log.info("Existe un plan nutricional creado con al menos un identificador");
                    if (planNutricional.get().getFechaInicio() == null) {
                        log.info("El plan nutricional en porcentajes no ha sido creado aun");
                        throw new InvalidRequestException("El plan nutricional en porcentajes no ha sido creado aun");
                    }
                    else {
                        planNutricionalDTO = PlanNutricionalDTO.builder()
                                .proteina(planNutricional.get().getProteina())
                                .hidratoDeCarbono(planNutricional.get().getHidratoDeCarbono())
                                .grasa(planNutricional.get().getGrasa())
                                .kcal(planNutricional.get().getKcal())
                                .fechaInicio(planNutricional.get().getFechaInicio())
                                .fechaFinal(planNutricional.get().getFechaFinal())
                                .build();
                        log.info("El plan nutricional en porcentajes existente en BD, porcentajesDTO creado");
                    }
                }
                return ResponseEntity.status(HttpStatus.OK).body(planNutricionalDTO);
            }
        } catch (Exception e) {
            log.warn("Excepcion obtenerPlanNutriEnPorcentajes: ", e);
            throw new PlanNutricionalNotFoundException("Plan nutricional en porcentajes no encontrada en BD");
        }
    }

    @GetMapping("/macros/{planNutriId}")
    public ResponseEntity <PlanNutricionalDTO> obtenerPlanNutriEnMacros (@PathVariable Long planNutriId) {
        PlanNutricionalDTO PlanNutricionalDTO;
        try {
            if (planNutriId == null) {
                throw new InvalidRequestException("Peticion de plan nutricional en macros no valida");
            } else {
                Optional<PlanNutricional> planNutricional = planNutricionalRepository.findById(planNutriId);
                if (planNutricional.isEmpty()) throw new InvalidRequestException("El plan no ha sido creado aun");
                else {
                    log.info("Existe un plan nutricional creado con al menos un identificador y es: {}", planNutricional.get());
                    if (planNutricional.get().getFechaInicio() == null) {
                        log.info("El plan nutricional en macros no ha sido creado aun");
                        throw new InvalidRequestException("El plan nutricional no ha sido creado aun");
                    }
                    else {
                        PlanNutricionalDTO = calcularMacrosEnGramos(planNutricional.get());
                        log.info("Plan nutricional en macros tras el calculo: {}", PlanNutricionalDTO);
                        if (PlanNutricionalDTO == null) throw new InvalidRequestException("Peticion de plan nutricional en macros no valida");
                            else log.info("El plan nutricional en macros existente en BD, macrosDTO creado");
                    }
                }
                return ResponseEntity.status(HttpStatus.OK).body(PlanNutricionalDTO);
            }
        } catch (Exception e) {
            log.warn("Excepcion obtenerPlanNutriEnMacros: ", e);
            throw new PlanNutricionalNotFoundException("Plan nutricional en macros no encontrada en BD");
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
                        calcularTasaMetabolismoBasal(
                                cliente.getPeso(),
                                cliente.getAltura(),
                                cliente.getEdad(),
                                cliente.getGenero());

                int kCalDiariasMantenimientoCliente =
                        obtenerKcalDiariasParaMantenimiento(
                                cliente.getFrecuenciaEjercicioSemanal().getFactorActividad(), tasaMetabolismoBasalCliente);

                int kcalDiariasPorObjetivo = obtenerKcalDiariasPorObjetivo(cliente.getObjetivo(), kCalDiariasMantenimientoCliente);

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
            throw new PlanNutricionalNotFoundException("Plan nutricional no encontrado en BD");
        }
    }

    public PlanNutricionalDTO calcularMacrosEnGramos (PlanNutricional planNutricional) {
        if (planNutricional != null) {
            int kcal = planNutricional.getKcal();
            log.info("kcal recibidas desde planNutricional en calcularMacrosEnGramos: {} kcal", kcal);

            // Calcular el porcentaje de cada macronutriente en kcal
            int proteinaKcal = kcal * planNutricional.getProteina() / 100;
            int hidratosKcal = kcal * planNutricional.getHidratoDeCarbono() / 100;
            int grasasKcal = kcal * planNutricional.getGrasa() / 100;
            log.info("macros en kcal: (proteina/hc/grasas): {} kcal de proteina, {} kcal de hc {} y kcal de grasa"
                    , proteinaKcal, hidratosKcal, grasasKcal);

            // Convertir cada kcal de macronutriente en gramos
            int proteinaGramos = proteinaKcal / 4;   // 4 kcal por gramo de proteína
            int hidratosGramos = hidratosKcal / 4;   // 4 kcal por gramo de carbohidratos
            int grasasGramos = grasasKcal / 9;       // 9 kcal por gramo de grasas

            log.info("macros en gramos: (proteina/hc/grasas): {} gramos de proteina, {} gramos de hc {} y gramos de grasa"
                    , proteinaGramos, hidratosGramos, grasasGramos);

            return PlanNutricionalDTO.builder()
                    .proteina(proteinaGramos)
                    .hidratoDeCarbono(hidratosGramos)
                    .grasa(grasasGramos)
                    .kcal(planNutricional.getKcal())
                    .fechaInicio(planNutricional.getFechaInicio())
                    .fechaFinal(planNutricional.getFechaFinal())
                    .build();
        }
        else return null;
    }

    //Fórmula de Harris-Benedict revisada por Mifflin y St Jeor en 1990 (utilizadas en la actualidad)
    //INPUT: EDAD, ALTURA, PESO Y GENERO
    public double calcularTasaMetabolismoBasal(int peso, int altura, int edad, Genero genero) {
        double tasaMetabolismoBasal;
        log.info("Ejecutando calculo de tasa de metabolismo basal.");
        if (genero.equals(Genero.MUJER)) {
            tasaMetabolismoBasal = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
            log.info("Tasa de metabolismo basal para mujer en base a input: {}", tasaMetabolismoBasal);
            //TMB (kcal) = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        }
        else {
            tasaMetabolismoBasal = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
            log.info("Tasa de metabolismo basal para hombre en base a input: {}", tasaMetabolismoBasal);
            //TMB (kcal) = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        }
        return tasaMetabolismoBasal;
    }

    //Ingesta diaria de calorías recomendada según el principio de Harris-Benedict
    //(dependiendo del ejercicio que realicemos semanalmente)
    public int obtenerKcalDiariasParaMantenimiento(double factorDeActividad, double tasaMetabolismoBasal) {
        log.info("Ejecutando calculo de kcal diarias para mantenimiento con {} de factorActividad y {} de TMB"
                , factorDeActividad,tasaMetabolismoBasal);
        int kCalDiariasMantenimiento;
        //Con el metabolismo calculado sólo debemos multiplicar por el factor corrector de la actividad
        kCalDiariasMantenimiento = ((int) (factorDeActividad * tasaMetabolismoBasal));
        log.info("kCalDiariasMantenimiento = factor de actividad: {} * tasa de metabolismo basal: {} = {} kcalDiariasMantenimiento"
                , factorDeActividad, tasaMetabolismoBasal, kCalDiariasMantenimiento);
        return kCalDiariasMantenimiento;
    }

    public int obtenerKcalDiariasPorObjetivo(Objetivo objetivo, int kcalMantenimiento) {
        int obtenerKcalDiariasPorObjetivo;
        log.info("Obteniendo kcal diarias en base al objetivo");
        if (objetivo.equals((Objetivo.GANAR_MUSCULO))) {
            obtenerKcalDiariasPorObjetivo = kcalMantenimiento + objetivo.getKcalExtra();
            log.info("Kcal diarias por objetivo = kcalMantenimiento: {} + kcalExtra para ganar musculo: {}"
                    ,kcalMantenimiento, obtenerKcalDiariasPorObjetivo);
        }
        else obtenerKcalDiariasPorObjetivo = kcalMantenimiento - objetivo.getKcalExtra();
        log.info("Kcal diarias por objetivo = kcalMantenimiento: {} + kcalExtra para ganar musculo: {}"
                ,kcalMantenimiento, obtenerKcalDiariasPorObjetivo);
        return  obtenerKcalDiariasPorObjetivo;
    }

}
