package aorquerab.fitnexus.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import static aorquerab.fitnexus.constants.Constants.VALID_ROUTES;

@Controller
@Slf4j
public class HomeController {

    /* Este método redirige todas las rutas que no son recursos estáticos a index.html
     * El controlador interceptará cualquier ruta que no contenga un punto (.) ->Ej: /login
     * y redirigirá a index.html. Luego, React Router manejará el enrutamiento del lado del cliente.
     */

    @GetMapping("/{path:[^\\.]*}")
    //expresion que da por valida /endpointA/endpointB/... -> ("/**/{path:^(?!.*\\.).*$}")
    public String redirectToReact(@PathVariable String path) {
        log.info("Redireccionando a React. React-Router enrutará a partir de aquí...");

        if (VALID_ROUTES.contains(path)) {
            return "forward:/index.html";
        }

        return "forward:/notfound.html";
        //@Controller returns a String and Spring understand that as a view page-> index.html
    }


}
