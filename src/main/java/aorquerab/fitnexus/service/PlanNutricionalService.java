package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.componenteEntrenamiento.PlanNutricional;
import aorquerab.fitnexus.model.dtos.PlanNutricionalDTO;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.enumerator.Objetivo;
import aorquerab.fitnexus.model.exception.PlanNutricionalNotFoundException;
import aorquerab.fitnexus.model.users.Cliente;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.service.spi.ServiceException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Optional;

@Service
@Slf4j
public class PlanNutricionalService {

    private final ClienteService clientService;

    public PlanNutricionalService (ClienteService clientService) {
        this.clientService = clientService;
    }

    public Optional<PlanNutricionalDTO> obtenerPlanMasRecientePorClienteEmail(String email) {
        return clientService.findByEmail(email)
                .map(Cliente::getPlanNutricional)
                .flatMap(planNutricionalList -> planNutricionalList.stream().max(Comparator.comparing(PlanNutricional::getFechaInicio)))
                .map(this::convertToDTO);
    }

    public PlanNutricionalDTO convertToDTO (PlanNutricional planNutricional) {
        return PlanNutricionalDTO.builder()
                .proteina(planNutricional.getProteina())
                .hidratoDeCarbono(planNutricional.getHidratoDeCarbono())
                .grasa(planNutricional.getGrasa())
                .kcal(planNutricional.getKcal())
                .fechaInicio(planNutricional.getFechaFinal())
                .fechaFinal(planNutricional.getFechaFinal())
                .build();
    }

    public Optional<Cliente> obtenerClientePorEmail (String email) {
        return clientService.findByEmail(email);
    }

    public PlanNutricionalDTO obtenerPlanDeClientePorSuEmail (String clienteEmail) {
        log.info("Obteniendo el plan asociado al cliente con email: {} ", clienteEmail);
        try {
            PlanNutricionalDTO planDeCliente =
                    obtenerPlanMasRecientePorClienteEmail(clienteEmail).orElseThrow(() -> {
                        log.warn("Plan nutricional no encontrado con el email: {}", clienteEmail);
                        return new PlanNutricionalNotFoundException("Plan no encontrado en BD: " + clienteEmail);
                    });
            log.info("Existe un plan nutricional creado con al menos un identificador para el cliente {}", clienteEmail);
            return planDeCliente;
        } catch (PlanNutricionalNotFoundException e) {
            log.error("Error al obtener el plan {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error al obtener el plan asociado al cliente {}", clienteEmail);
            throw new ServiceException("Error inesperado al obtener el plan nutricional", e);
        }
    }

    //Cálculos plan nutricional
    public PlanNutricionalDTO calcularMacrosEnGramos (PlanNutricional planNutricional) {
        if (planNutricional != null) {
            int kcal = planNutricional.getKcal();
            log.info("kcal recibidas desde planNutricional en calcularMacrosEnGramos: {} kcal", kcal);

            // Calcular el porcentaje de cada macronutriente en kcal
            int proteinaKcal = kcal * planNutricional.getProteina() / 100;
            int hidratosKcal = kcal * planNutricional.getHidratoDeCarbono() / 100;
            int grasasKcal = kcal * planNutricional.getGrasa() / 100;
            log.info("Kcal de cada macro: (proteina/hc/grasas): {} kcal de proteina, {} kcal de hc {} y kcal de grasa"
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

    public PlanNutricionalDTO obtenerPorcentajeMacrosPorObjetivo (Cliente cliente) {
        PlanNutricionalDTO planNutricionalDTO = null;
        if (cliente.getObjetivo().equals(Objetivo.GANAR_MUSCULO)) {
            planNutricionalDTO = PlanNutricionalDTO.builder()
                    .proteina(30).hidratoDeCarbono(50).grasa(20)
                    .build();
        } else if (cliente.getObjetivo().equals(Objetivo.PERDER_GRASA)) {
            planNutricionalDTO = PlanNutricionalDTO.builder()
                    .proteina(30).hidratoDeCarbono(30).grasa(40)
                    .build();
        }
        return planNutricionalDTO;
    }
}
