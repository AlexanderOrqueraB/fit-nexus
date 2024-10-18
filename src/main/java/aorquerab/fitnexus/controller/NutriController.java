package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.DTOs.PautaNutricionalDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
import aorquerab.fitnexus.model.exception.InvalidRequestException;
import aorquerab.fitnexus.model.exception.PautaNutriNotFoundException;
import aorquerab.fitnexus.repository.PautaNutricionalRepository;
import aorquerab.fitnexus.service.PlanNutricionalService;
import aorquerab.fitnexus.utils.PautaNutriDTOMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/nutri-pautas"})
@Slf4j
public class NutriController {
    private final PautaNutricionalRepository pautaNutricionalRepository;
    private final PlanNutricionalService planNutricionalService;

    public NutriController(PautaNutricionalRepository pautaNutricionalRepository, PlanNutricionalService planNutricionalService) {
        this.pautaNutricionalRepository = pautaNutricionalRepository;
        this.planNutricionalService = planNutricionalService;
    }

    @GetMapping
    public ResponseEntity<List<PautaNutricionalDTO>> getPautasNutri() {
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

    @PostMapping
    public ResponseEntity <String> postPautasNutri(@RequestBody PautaNutricionalDTO pautaNutricionalDTO) {
        log.info("Ejecutando postPautasNutri...");
        if(pautaNutricionalDTO == null) {
            throw new InvalidRequestException("Peticion de plan nutricional no valido");
        }
        PautaNutricional pautaNutricional = PautaNutriDTOMapper.mapperFromPautaNutriDTO (pautaNutricionalDTO);
        pautaNutricionalRepository.save(pautaNutricional);
        log.info("postPautasNutri ejecutado.");

        return ResponseEntity.status(HttpStatus.CREATED).body("Pauta nutricional creado correctamente.");
    }

    //TODO Create Diet harrisBenedict Service + getkcalymacros from UserData
    @GetMapping
    public ResponseEntity<List<PautaNutricionalDTO>> getPautaNutricionalfromUserData(
            @PathVariable String clientId
    ) {
        log.info("Ejecutando getPautafromUserData...");
        return planNutricionalService.getPautaNutricional(clientId);

    }
}
