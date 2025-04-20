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

    public Optional<PlanNutricionalDTO> obtenerPlanDTOMasRecientePorFitNexusId(String fitNexusId) {
        return clientService.findByFitNexusId(fitNexusId)
                .map(Cliente::getPlanNutricional)
                .flatMap(planNutricionalList -> planNutricionalList.stream().max(Comparator.comparing(PlanNutricional::getFechaInicio)))
                .map(this::convertToDTO);
    }

    public Optional<PlanNutricional> obtenerPlanMasRecientePorFitNexusId(String fitNexusId) {
        return clientService.findByFitNexusId(fitNexusId)
                .map(Cliente::getPlanNutricional)
                .flatMap(planNutricionalList -> planNutricionalList.stream().max(Comparator.comparing(PlanNutricional::getFechaInicio)));
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

    public Optional<Cliente> obtenerClientePorFitNexusId (String fitNexusId) {
        log.info("Ejecutando obtenerClientePorFitNexusId con el fitNexusId: {}", fitNexusId);
        return clientService.findByFitNexusId(fitNexusId);
    }

    public PlanNutricionalDTO obtenerPlanDeClienteDTOPorSuFitNexusId(String fitNexusId) {
        log.info("Obteniendo el plan asociado al cliente con fitNexusId: {} ", fitNexusId);
        try {
            PlanNutricionalDTO planDeCliente =
                    obtenerPlanDTOMasRecientePorFitNexusId(fitNexusId).orElseThrow(() -> {
                        log.warn("Plan nutricional no encontrado en -obtenerPlanDeClienteDTOPorSuFitNexusId- con el fitNexusId: {}", fitNexusId);
                        return new PlanNutricionalNotFoundException("Plan no encontrado en BD: " + fitNexusId);
                    });
            log.info("Existe un plan nutricional creado con al menos un identificador para el cliente con el fitNexusId: {}", fitNexusId);
            return planDeCliente;
        } catch (PlanNutricionalNotFoundException e) {
            log.error("Error al obtener el plan {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error al obtener el plan asociado al cliente con el fitNexusId: {}", fitNexusId);
            throw new ServiceException("Error inesperado al obtener el plan nutricional", e);
        }
    }

    public PlanNutricional obtenerPlanDeClientePorSuFitNexusId(String fitNexusId) {
        log.info("Obteniendo el plan asociado al cliente con fitNexusId: {} ", fitNexusId);
        try {
            PlanNutricional planDeCliente =
                    obtenerPlanMasRecientePorFitNexusId(fitNexusId).orElseThrow(() -> {
                        log.warn("Plan nutricional no encontrado en -obtenerPlanDeClientePorSuFitNexusId- con el fitNexusId: {}", fitNexusId);
                        return new PlanNutricionalNotFoundException("Plan no encontrado en BD: " + fitNexusId);
                    });
            log.info("Existe un plan nutricional creado con al menos un identificador para el cliente con el fitNexusId: {}", fitNexusId);
            return planDeCliente;
        } catch (PlanNutricionalNotFoundException e) {
            log.error("Error al obtener el plan {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error al obtener el plan asociado al cliente con el fitNexusId: {}", fitNexusId);
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

            log.info("macros en gramos: (proteina/hc/grasas): {} gramos de proteina, {} gramos de hc y {} gramos de grasa"
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
    //INPUT: EDAD, ALTURA, PESO Y GÉNERO
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
        //Con el metabolismo calculado solo debemos multiplicar por el factor corrector de la actividad
        kCalDiariasMantenimiento = ((int) (factorDeActividad * tasaMetabolismoBasal));
        log.info("kCalDiariasMantenimiento = factor de actividad: {} * tasa de metabolismo basal: {} = {} kcalDiariasMantenimiento"
                , factorDeActividad, tasaMetabolismoBasal, kCalDiariasMantenimiento);
        return kCalDiariasMantenimiento;
    }

    public int obtenerKcalDiariasPorObjetivo(Objetivo objetivo, int kcalMantenimiento) {
        int obtenerKcalDiariasPorObjetivo = 0;
        log.info("Obteniendo kcal diarias en base al objetivo");
        if (objetivo.equals((Objetivo.GANAR_MUSCULO))) {
            obtenerKcalDiariasPorObjetivo = kcalMantenimiento + objetivo.getKcalExtra();
            log.info("Kcal diarias por objetivo = kcalMantenimiento: {} + kcalExtra para ganar músculo: {}"
                    ,kcalMantenimiento, obtenerKcalDiariasPorObjetivo);
        }
        else if (objetivo.equals((Objetivo.PERDER_GRASA))){
            obtenerKcalDiariasPorObjetivo = kcalMantenimiento - objetivo.getKcalExtra();
            log.info("Kcal diarias por objetivo = kcalMantenimiento: {} - kcalExtra para perder grasa: {}"
                ,kcalMantenimiento, obtenerKcalDiariasPorObjetivo);
        }
        else if (objetivo.equals((Objetivo.MANTENER_FORMA))){
            obtenerKcalDiariasPorObjetivo = kcalMantenimiento - objetivo.getKcalExtra();
            log.info("Kcal diarias por objetivo = kcalMantenimiento: {} - 0 kcal para mantener forma: {}"
                    ,kcalMantenimiento, obtenerKcalDiariasPorObjetivo);
        }
        return  obtenerKcalDiariasPorObjetivo;
    }

    public PlanNutricionalDTO obtenerPorcentajeMacrosPorObjetivo (Cliente cliente) {
        log.info("Ejecutando obtenerPorcentajeMacrosPorObjetivo");
        PlanNutricionalDTO planNutricionalDTO = null;
        if (cliente.getObjetivo().equals(Objetivo.GANAR_MUSCULO)) {
            planNutricionalDTO = PlanNutricionalDTO.builder()
                    .proteina(30).hidratoDeCarbono(50).grasa(20)
                    .build();
        } else if (cliente.getObjetivo().equals(Objetivo.PERDER_GRASA)) {
            planNutricionalDTO = PlanNutricionalDTO.builder()
                    .proteina(30).hidratoDeCarbono(30).grasa(40)
                    .build();
        } else if (cliente.getObjetivo().equals(Objetivo.MANTENER_FORMA)) {
            planNutricionalDTO = PlanNutricionalDTO.builder()
                    .proteina(30).hidratoDeCarbono(40).grasa(30)
                    .build();
        }
        return planNutricionalDTO;
    }
}
