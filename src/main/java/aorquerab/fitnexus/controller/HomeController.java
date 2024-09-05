package aorquerab.fitnexus.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class HomeController {

    @GetMapping("/{path:[^\\.]*}")
    public String redirect() {
        log.info("Ejecutando home redirect GET ENDPOINT...");
        return "forward:/index.html";
    }
    //TODO check if this is useful or useless

}
