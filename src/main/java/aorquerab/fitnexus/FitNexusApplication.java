package aorquerab.fitnexus;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
@EnableAutoConfiguration (exclude = { DataSourceAutoConfiguration.class , JpaRepositoriesAutoConfiguration.class})
@Slf4j
public class FitNexusApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitNexusApplication.class, args);
		log.info("Algo ha cambiado durante la ejecucion...");
	}
}
