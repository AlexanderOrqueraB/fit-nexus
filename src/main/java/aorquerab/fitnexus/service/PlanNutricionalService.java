package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.DTOs.PautaNutricionalDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.enumerator.Objetivo;
import aorquerab.fitnexus.model.exception.PautaNutriNotFoundException;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.PautaNutricionalRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static aorquerab.fitnexus.utils.PautaNutriDTOMapper.mapperFromPautaNutriDTO;

@Service
@Slf4j
public class PlanNutricionalService {
    private PautaNutricionalRepository pautaNutricionalRepository;
    private ClienteRepository clienteRepository;

    public PlanNutricionalService (PautaNutricionalRepository pautaNutricionalRepository,
                                   ClienteRepository clienteRepository) {
        this.pautaNutricionalRepository = pautaNutricionalRepository;
        this.clienteRepository = clienteRepository;
    }

    //TODO Create Diet harrisBenedict Service + getkcalymacros from UserData
    /* Input: Datos del cliente: {
        "nombre": "Luke",
        "apellido": "Skywalker",
        "email": "luke@skywalker.com",
        "objetivo": "PERDER GRASA",
        "genero": "HOMBRE",
        "edad": 25,
        "peso": 80,
        "altura": 175,
        "clienteDesde": "2023-07-12"
        }
        output:
    {
      "proteina": 0,
      "hidratoDeCarbono": 0,
      "grasa": 0,
      "kcal": 0,
      "fechaInicio": "2024-10-13",
      "fechaFinal": "2024-10-13"
    }
    * */

    public ResponseEntity <PautaNutricionalDTO> getPautaNutricionalPercentage(String emailId) {
        try {
            log.info("Ejecutando getPautasNutri...");
            Optional<Cliente> cliente = clienteRepository.findByEmail(emailId);
            log.info("cliente:" + cliente.get());
            int kcalDiariasPorObjetivo = 0;
            PautaNutricionalDTO pautaNutricionalDTO = new PautaNutricionalDTO(); //TODO: quizas no necesitamos fechaInicio y fechaFinal xd
//TODO: creas el DTO y da igual lo que le mandes como email, no te hace el if cn todo el builder y te devuelve un DTO con 0s

            //TODO: TESTEAR CON DATOS REALES
            if (cliente.isPresent()) {
                log.info("Cliente encontrado buscando por email...");
                double tasaMetabolismoBasalCliente =
                        calcularTasaMetabolismoBasal(
                                cliente.get().getPeso(),
                                cliente.get().getAltura(),
                                cliente.get().getEdad(),
                                cliente.get().getGenero());

                int kCalDiariasMantenimientoCliente =
                        obtenerKcalDiariasParaMantenimiento(
                                cliente.get().getFrecuenciaEjercicioSemanal().getFactorActividad(), tasaMetabolismoBasalCliente);

                kcalDiariasPorObjetivo = obtenerKcalDiariasPorObjetivo(cliente.get().getObjetivo(), kCalDiariasMantenimientoCliente);

                PautaNutricionalDTO.PautaNutricionalDTOBuilder pautaNutricionalDTOBuilder = PautaNutricionalDTO
                        .builder()
                        .kcal(kcalDiariasPorObjetivo);

                if (cliente.get().getObjetivo().equals(Objetivo.GANAR_MUSCULO)) {
                    pautaNutricionalDTOBuilder.proteina(30).hidratoDeCarbono(50).grasa(20);
                } else if (cliente.get().getObjetivo().equals(Objetivo.PERDER_GRASA)) {
                    pautaNutricionalDTOBuilder.proteina(30).hidratoDeCarbono(30).grasa(40);
                }
                pautaNutricionalDTO = pautaNutricionalDTOBuilder.build();
                log.info("Pauta nutricional DTO creado usando patron builder: " + pautaNutricionalDTO);
                PautaNutricional pautaNutricional = mapperFromPautaNutriDTO(pautaNutricionalDTO);
                log.info("Pauta nutricional creada tras el mapeo: " + pautaNutricional);
                pautaNutricionalRepository.save(pautaNutricional);
                log.info("Pauta nutricional con porcentajes de macronutrientes creada en base de datos");
            }
            else {
                log.info("Cliente NO encontrado buscando por email...");
                throw new PautaNutriNotFoundException("Pauta nutricional no encontrada en BD");
            }

            return ResponseEntity.status(HttpStatus.OK).body(pautaNutricionalDTO);
        } catch (Exception e) {
            log.info("Excepcion getPlanesNutri: ", e.getMessage());
            throw new PautaNutriNotFoundException("Pauta nutricional no encontrada en BD");
        }
    }

//    public ResponseEntity <PautaNutricionalDTO> getPautaNutricionalGrams(ClienteDTO clienteDTO) {
//
//    }

    //Fórmula de Harris-Benedict revisada por Mifflin y St Jeor en 1990 (utilizadas en la actualidad)
    //INPUT: EDAD, ALTURA, PESO Y GENERO
    public double calcularTasaMetabolismoBasal(int peso, int altura, int edad, Genero genero) {
        double tasaMetabolismoBasal;
        log.info("Ejecutando calculo de tasa de metabolismo basal.");
        if (genero.equals(Genero.MUJER)) {
            tasaMetabolismoBasal = (10 * peso) + (6.25 * altura) - (5 * edad) - 161;
            //TMB (kcal) = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161
        }
        else {
            tasaMetabolismoBasal = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
            //TMB (kcal) = (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
        }
        return tasaMetabolismoBasal;
    }

    //Ingesta diaria de calorías recomendada según el principio de Harris-Benedict
    //(dependiendo del ejercicio que realicemos semanalmente)
    public int obtenerKcalDiariasParaMantenimiento(double factorDeActividad, double tasaMetabolismoBasal) {
        log.info("Ejecutando calculo de kcal diarias para mantenimiento.");
        int kCalDiariasMantenimiento;
        //Con el metabolismo calculado sólo debemos multiplicar por el factor corrector de la actividad
        kCalDiariasMantenimiento = (((int) factorDeActividad) * (int) tasaMetabolismoBasal);
        return kCalDiariasMantenimiento;
    }

    public int obtenerKcalDiariasPorObjetivo(Objetivo objetivo, int kcalMantenimiento) {
        int obtenerKcalDiariasPorObjetivo;
        log.info("Obteniendo kcal diarias en base al objetivo");
        if (objetivo.equals((Objetivo.GANAR_MUSCULO))) {
            obtenerKcalDiariasPorObjetivo = kcalMantenimiento + objetivo.getKcalExtra();
        }
        else obtenerKcalDiariasPorObjetivo = kcalMantenimiento - objetivo.getKcalExtra();
        return  obtenerKcalDiariasPorObjetivo;
    }


}
