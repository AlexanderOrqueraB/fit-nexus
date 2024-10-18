package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.DTOs.PautaNutricionalDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.model.enumeration.Genero;
import aorquerab.fitnexus.model.exception.PautaNutriNotFoundException;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.PautaNutricionalRepository;
import aorquerab.fitnexus.utils.PautaNutriDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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
    //TODO Definir atributo asociado al dia: diaEntreno diaDescanso
    // para el calculo de las kcal de ese dia

    //TODO Utilizar de alguna forma objetivo (superavit o deficit calorico)

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

       Input: objetivo + (peso,altura,edad,genero)
       + frecuenciaEjercicioSemanal

        output:
    {
        "diaEntreno" : [
            "kcal" : 1912,
            "proteina": 0,
            "hidratoDeCarbono": 0,
            "grasa": 0,
        ],
        "diaDescanso" : [
            "kcal" : 1912,
            "proteina": 0,
            "hidratoDeCarbono": 0,
            "grasa": 0,
        ]
    * */

    public ResponseEntity<List<PautaNutricionalDTO>> getPautaNutricional(String clientId) {
        try {
            log.info("Ejecutando getPautasNutri...");
            List<PautaNutricional> pautas = pautaNutricionalRepository.findAll();
            if (pautas.isEmpty()) {
                log.info("Pauta/s nutricional/es no encontrada/s en base de datos");
                throw new PautaNutriNotFoundException("Pauta nutricional no encontrada en BD");
            }
            List<PautaNutricionalDTO> pautaDTOs = PautaNutriDTOMapper.mapperFromList(pautas);
            return ResponseEntity.status(HttpStatus.OK).body(pautaDTOs);
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

    //TODO: Añadir a entidad, schema, json de cliente: frecuencia de ejercicio semanal
    //INPUT: frecuencia de ejercicio SEMANAL (poco o ningun, 1-3, 3-5, 6-7, 2 veces al día
    public double obtenerFactorDeActividad (int frecuenciaEjercicio) { //TODO: puede que sea int/boolean/?
        double factorActividad;
        switch (frecuenciaEjercicio) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                System.out.println("Factor incorrecto");

        }
        return factorActividad = 0.0;
    }
    /*Factor corrector de la actividad:
        Poco o ningún ejercicio(0-1 días a la semana): 1,2
        Ejercicio ligero (2 días a la semana): 1,375
        Ejercicio moderado (3-5 días a la semana): 1,55
        Ejercicio fuerte (6-7 días a la semana): 1,725
        Ejercicio muy fuerte (dos veces al día, entrenamientos muy duros): 1,9
    */


    //Ingesta diaria de calorías recomendada según el principio de Harris-Benedict


    //(dependiendo del ejercicio que realicemos semanalmente)
    public int obtenerKcaloriasDiariasNecesarias (double factorDeActividad, double tasaMetabolismoBasal) {
        int kCalDiariasNecesarias;
        //Con el metabolismo calculado sólo debemos multiplicar por el factor corrector de la actividad
        kCalDiariasNecesarias = (((int) factorDeActividad) * (int) tasaMetabolismoBasal);
        return kCalDiariasNecesarias;
    }

}
