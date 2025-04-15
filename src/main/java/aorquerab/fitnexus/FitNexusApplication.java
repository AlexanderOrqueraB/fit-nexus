package aorquerab.fitnexus;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class FitNexusApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitNexusApplication.class, args);
		log.info("FITNEXUS INICIADO...");
		log.info ("""
				  \s
				  \s
				  ______ _____ _______ _   _ ________   ___    _  _____\s
				 |  ____|_   _|__   __| \\ | |  ____\\ \\ / / |  | |/ ____|
				 | |__    | |    | |  |  \\| | |__   \\ V /| |  | | (___ \s
				 |  __|   | |    | |  | . ` |  __|   > < | |  | |\\___ \\\s
				 | |     _| |_   | |  | |\\  | |____ / . \\| |__| |____) |
				 |_|    |_____|  |_|  |_| \\_|______/_/ \\_\\\\____/|_____/\s
				                                                       \s
				                                                       \s
				""");
	}
}
