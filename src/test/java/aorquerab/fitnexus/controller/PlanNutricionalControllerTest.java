package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.fixtures.TestFixtures;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.repository.ClienteRepository;
import aorquerab.fitnexus.repository.EntrenadorRepository;
import aorquerab.fitnexus.repository.PlanNutricionalRepository;
import aorquerab.fitnexus.service.PlanNutricionalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlanNutricionalControllerTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private EntrenadorRepository entrenadorRepository;

    @Mock
    private PlanNutricionalRepository planNutricionalRepository;

    @Mock
    private PlanNutricionalService planNutricionalService;

    @InjectMocks
    private PlanNutricionalController planNutricionalController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @ParameterizedTest
    @MethodSource(value = "provideClients")
    void checkNutriPlanWhenClientHaveExtraData(Cliente cliente) throws Exception {

        String email = cliente.getEmail();
        String expectedResponse = "Plan nutricional en porcentajes creada correctamente.";

        when(clienteRepository.findByEmail(email)).thenReturn(Optional.of(cliente));
        when(entrenadorRepository.findByFitNexusId(cliente.getEntrenador().getFitNexusId()))
                .thenReturn(Optional.of(cliente.getEntrenador()));

        when(planNutricionalService.calcularTasaMetabolismoBasal(
                cliente.getPeso(), cliente.getAltura(), cliente.getEdad(), cliente.getGenero()))
                .thenReturn(Double.valueOf(1755)); // Example TMB (kcal) = (10 x 75kg) + (6,25 × 180cm) - (5 × 25 años) + 5 = 1755 TMB
        when(planNutricionalService.obtenerKcalDiariasParaMantenimiento(
                cliente.getFrecuenciaEjercicioSemanal().getFactorActividad(), 1755.0))
                .thenReturn((int) 3027.375); // Example 1.725 factorDeActividad * 1755 tasaMetabolismoBasal = 3027.375kcal mantenimiento
        when(planNutricionalService.obtenerKcalDiariasPorObjetivo(cliente.getObjetivo(), (int) 3027.375))
                .thenReturn(3327); // Example 3027.375 kcalMantenimiento + 300kcal objetivo.getKcalExtra() = 3327 kcal para (ganar grasa)

        String jsonPayload = """
        {
            "email": "%s"
        }
        """.formatted(email);

        // Act
        ResponseEntity<String> response = planNutricionalController.crearPlanNutriEnPorcentajes(jsonPayload);

        assertEquals(201, response.getStatusCode().value());
        assertEquals(expectedResponse, response.getBody());

        verify(clienteRepository, times(1)).findByEmail(email);
        verify(entrenadorRepository, times(1)).findByFitNexusId(cliente.getEntrenador().getFitNexusId());
        verify(planNutricionalService, times(1)).calcularTasaMetabolismoBasal(
                cliente.getPeso(), cliente.getAltura(), cliente.getEdad(), cliente.getGenero());
        verify(planNutricionalService, times(1)).obtenerKcalDiariasParaMantenimiento(
                cliente.getFrecuenciaEjercicioSemanal().getFactorActividad(), 1755.0);
        verify(planNutricionalService, times(1)).obtenerKcalDiariasPorObjetivo(cliente.getObjetivo(), (int) 3027.375);
    }

    public static Stream<Arguments> provideClients() {
        return Stream.of(
                Arguments.of(TestFixtures.createClienteWithExtraData())
        );
    }

    @Test
    void checkNutriPlanWhenClientDoesNotExist() {
        // TODO: Implement test logic for when the client does not exist
    }

    @Test
    void checkNutriPlanWhenPlanIsNotCreatedYet() {
        // TODO: Implement test logic for when the plan is not created yet
    }

    @Test
    void checkNutriPlanWhenInvalidFitNexusIdProvided() {
        // TODO: Implement test logic for invalid fitNexusId
    }

    @Test
    void checkNutriPlanCreationWithValidData() {
        // TODO: Implement test logic for successful plan creation with valid data
    }

    @Test
    void checkNutriPlanCreationWithInvalidEmail() {
        // TODO: Implement test logic for plan creation with an invalid email
    }

    @Test
    void checkNutriPlanMacrosCalculation() {
        // TODO: Implement test logic for macros calculation
    }

    @Test
    void checkNutriPlanPercentageCalculation() {
        // TODO: Implement test logic for percentage calculation
    }

    @Test
    void checkNutriPlanKcalCalculation() {
        // TODO: Implement test logic for kcal calculation
    }
}