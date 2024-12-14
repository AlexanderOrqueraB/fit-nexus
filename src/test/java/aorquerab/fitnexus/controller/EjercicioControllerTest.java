package aorquerab.fitnexus.controller;

import aorquerab.fitnexus.TestDataUtil;
import aorquerab.fitnexus.model.componenteEntrenamiento.Ejercicio;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class EjercicioControllerTest {

    @Mock
    public EjercicioController underTest;

    @BeforeAll
    public static void setUp() {
        MockitoAnnotations.openMocks(EjercicioController.class);
    }

    @Test
    @Disabled
    void testThatObtenerEjerciciosReturnsHttp200() {
        final ResponseEntity<List<Ejercicio>> ejercicioListResult =
                ResponseEntity.status(HttpStatus.OK)
                        .body(List.of(TestDataUtil.crearEjercicio()));

        Mockito.when(underTest.obtenerEjercicios()).thenReturn(ejercicioListResult);

        Assertions.assertEquals(ejercicioListResult.getStatusCode(), HttpStatus.OK);
    }

//    @After
//    public void tearDown() {
//        Mockito.reset(myRepository);
//    }
}