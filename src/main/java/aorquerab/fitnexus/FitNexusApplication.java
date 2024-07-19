package aorquerab.fitnexus;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class FitNexusApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitNexusApplication.class, args);
		log.info("Algo ha cambiado durante la ejecucion...");
	}
}
