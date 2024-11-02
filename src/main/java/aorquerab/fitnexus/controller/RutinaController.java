package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.model.componenteEntrenamiento.Rutina;
import aorquerab.fitnexus.model.dtos.componenteEntrenamientoDTO.RutinaDTO;
import aorquerab.fitnexus.repository.RutinaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@RestController
@RequestMapping({FITNEXUS_BASE_URI + "/rutinas"})
@Slf4j
public class RutinaController {
    private final RutinaRepository rutinaRepository;

    public RutinaController(RutinaRepository rutinaRepository) {
        this.rutinaRepository = rutinaRepository;
    }

    @GetMapping
    public ResponseEntity<List<Rutina>> obtenerRutinas () {
        log.info("Ejecutando obtenerRutinas...");
        try {
            List<Rutina> rutinasList = rutinaRepository.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(rutinasList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de rutinas", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    @GetMapping("/rutinas-dto")
    public ResponseEntity<List<RutinaDTO>> obtenerRutinasDTO() {
        log.info("Ejecutando obtenerRutinasDTO...");
        try {
            List<RutinaDTO> rutinaDTOList = rutinaRepository.findAll().stream()
                    .map(rutina -> RutinaDTO.builder()
                            .nombreRutina(rutina.getNombreRutina())
                            .ejercicios(rutina.getEjercicios().stream()
                                    .map(ejercicio -> RutinaDTO.EjercicioDTO.builder()
                                            .nombreEjercicio(ejercicio.getNombreEjercicio())
                                            .build())
                                    .collect(Collectors.toList()))
                            .build())
                        .collect(Collectors.toList());
            return ResponseEntity.status(HttpStatus.OK).body(rutinaDTOList);
        } catch (Exception e) {
            log.warn("Error al obtener lista de rutinasDTO", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }
}
