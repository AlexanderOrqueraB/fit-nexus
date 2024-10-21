package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.DTOs.ClienteDTO;
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

    public ResponseEntity <PautaNutricionalDTO> getPautaNutricional(ClienteDTO clienteDTO) {
        try {
            log.info("Ejecutando getPautasNutri...");
            Optional<Cliente> cliente = clienteRepository.findByEmail(clienteDTO.getEmail());
            int obtenerKcalDiariasPorObjetivo = 0;
            if (cliente.isPresent()) {
                double tasaMetabolismoBasalCliente =
                        calcularTasaMetabolismoBasal(clienteDTO.getPeso(), clienteDTO.getAltura(), clienteDTO.getEdad(), clienteDTO.getGenero());

                int kCalDiariasMantenimientoCliente =
                        obtenerKcalDiariasParaMantenimiento(clienteDTO.getFrecuenciaEjercicioSemanal().getFactorActividad(), tasaMetabolismoBasalCliente);

                obtenerKcalDiariasPorObjetivo = obtenerKcalDiariasPorObjetivo(clienteDTO.getObjetivo(), kCalDiariasMantenimientoCliente);
            }
            //TODO: generar en base a las kcal finales: PROTEINA, HC, GRASA=> no, habrá distribuciones segun PERDER GRASA (30,30,40) o
            // GANAR MUSCULO (30,20,50), o fijamos esto en el json siempre? tipo: ganar grasa SIEMPRE 30,40,30 Y MANDAMOS EL JSON CON ESO Y LAS KCAL
            PautaNutricional pautaNutricional = new PautaNutricional();
            pautaNutricionalRepository.save(pautaNutricional);
            //pautaNutricionalRepository.save(PautaNutricionalDTO.builder().kcal(obtenerKcalDiariasPorObjetivo));
            PautaNutricionalDTO pautaNutricionalDTO = new PautaNutricionalDTO();

            log.info("Pauta nutricional creada en base de datos");


            return ResponseEntity.status(HttpStatus.OK).body(pautaNutricionalDTO);
        } catch (Exception e) {
            log.info("Excepcion getPlanesNutri: ", e.getMessage());
            throw new PautaNutriNotFoundException("Pauta nutricional no encontrada en BD");
    }
    }

    //Fórmula de Harris-Benedict revisada por Mifflin y St Jeor en 1990 (utilizadas en la actualidad)
    //INPUT: EDAD, ALTURA, PESO Y GENERO
    public double calcularTasaMetabolismoBasal(int peso, int altura, int edad, Genero genero) {
        double tasaMetabolismoBasal;

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
        int kCalDiariasMantenimiento;
        //Con el metabolismo calculado sólo debemos multiplicar por el factor corrector de la actividad
        kCalDiariasMantenimiento = (((int) factorDeActividad) * (int) tasaMetabolismoBasal);
        return kCalDiariasMantenimiento;
    }

    public int obtenerKcalDiariasPorObjetivo(Objetivo objetivo, int kcalMantenimiento) {
        int obtenerKcalDiariasPorObjetivo;
        if (objetivo.equals((Objetivo.GANAR_MUSCULO))) {
            obtenerKcalDiariasPorObjetivo = kcalMantenimiento + objetivo.getKcalExtra();
        }
        else obtenerKcalDiariasPorObjetivo = kcalMantenimiento - objetivo.getKcalExtra();
        return  obtenerKcalDiariasPorObjetivo;
    }

}
