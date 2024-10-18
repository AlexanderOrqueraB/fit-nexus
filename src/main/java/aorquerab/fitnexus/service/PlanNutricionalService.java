package aorquerab.fitnexus.service;

import aorquerab.fitnexus.model.DTOs.PautaNutricionalDTO;
import aorquerab.fitnexus.model.componenteEntrenamiento.PautaNutricional;
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

    //TODO Create Diet harrisBenedict Service + getkcalymacros from UserData
    public ResponseEntity<List<PautaNutricionalDTO>> algo() {
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
}
