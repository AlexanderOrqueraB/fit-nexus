package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.fixtures.TestFixtures;
import aorquerab.fitnexus.model.componenteEntrenamiento.PlanNutricional;
import aorquerab.fitnexus.model.enumerator.FrecuenciaEjercicioSemanal;
import aorquerab.fitnexus.model.enumerator.Genero;
import aorquerab.fitnexus.model.users.Cliente;
import aorquerab.fitnexus.
import aorquerab.fitnexus.service.PlanNutricionalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlanNutricionalControllerTest {

    @Mock
    private PlanNutricionalService planNutricionalService;

    @InjectMocks
    private PlanNutricionalController planNutricionalController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialize mocks
    }

    @Test //TODO: Make this test parametrized
    void checkNutriPlanWhenClientHaveExtraData() {
        // Arrange
        Cliente cliente = TestFixtures.createClienteWithExtraData();
        String expectedResponse = "Plan nutricional creado correctamente";

        // Mock the service behavior
        when(planNutricionalService.crearPlanNutriEnPorcentajes(cliente.getEmail()))
                .thenReturn(ResponseEntity.ok(expectedResponse));

        // Act
        ResponseEntity<String> response = planNutricionalController.crearPlanNutriEnPorcentajes(cliente.getEmail());

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(expectedResponse, response.getBody());

        // Verify that the service was called
        verify(planNutricionalService, times(1)).crearPlanNutriEnPorcentajes(cliente.getEmail());
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