package aorquerab.fitnexus.config;

import aorquerab.fitnexus.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static aorquerab.fitnexus.constants.Constants.FITNEXUS_BASE_URI;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomUserDetailsService customUserDetailsService;
    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(crsf->crsf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/adminpage","/index.html", "/notfound.html", "static/**").permitAll()
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/logout").permitAll()
                        .requestMatchers("/api/v1/login").permitAll()
                        .requestMatchers("/api/v1/signup").permitAll()
                        .requestMatchers("/api-docs").permitAll()

                        //ROLE ACCESS CONTROL Spring Controllers
                        //.requestMatchers(HttpMethod.GET,FITNEXUS_BASE_URI + "/ejercicios").hasAnyRole("ADMIN","USER")
                        //.requestMatchers(HttpMethod.POST,FITNEXUS_BASE_URI + "/ejercicios").hasRole("ADMIN") //OK from user

                        //TODO: START Change auth permissions (testing purpose for the moment) +
                        // change .anyRequest().permitAll() to .anyRequest().authenticated()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/plan-nutri/**").permitAll()
                        .requestMatchers(HttpMethod.POST, FITNEXUS_BASE_URI + "/plan-nutri/**").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/clientes").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/clientes/**").permitAll()
                        .requestMatchers(HttpMethod.POST, FITNEXUS_BASE_URI + "/clientes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/entrenadores").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/entrenadores/**").permitAll()
                        .requestMatchers(HttpMethod.POST, FITNEXUS_BASE_URI + "/entrenadores/**").permitAll()

                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/ejercicios").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/ejercicios/**").permitAll()
                        .requestMatchers(HttpMethod.POST, FITNEXUS_BASE_URI + "/ejercicios/**").permitAll()

                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/rutinas").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/rutinas/**").permitAll()
                        .requestMatchers(HttpMethod.POST, FITNEXUS_BASE_URI + "/rutinas/**").permitAll()

                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/planes").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/planes/**").permitAll()
                        .requestMatchers(HttpMethod.POST, FITNEXUS_BASE_URI + "/planes/**").permitAll()
                        .requestMatchers(HttpMethod.GET, FITNEXUS_BASE_URI + "/data/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, FITNEXUS_BASE_URI + "/data/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, FITNEXUS_BASE_URI + "/user/password/**").permitAll()

                        //TODO: END

                        //ROLE ACCESS CONTROL React pages
                        //.requestMatchers("/create-exercise").hasRole("ADMIN")

                        //.requestMatchers("/api/v1/ejercicios").permitAll() FUNSIONA
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form.loginPage("/").permitAll())

                //TODO 1: issue: can not get or Post from React-> return always a html page: index.html and no logs in spring from get
                // or post endpoints controllers
                //TODO 2: TEST LOgout
                // TEST 1. no hace logout, me deja volver al dashboard
                .logout(logout -> logout.logoutUrl("/logout").invalidateHttpSession(true).deleteCookies("JSESSIONID"))
                //TEST 2
                // .logout(logout -> logout.logoutSuccessUrl("/").permitAll())
                //.logout()

                //TODO 3: allow new components load also from 8080, for the moment all in 3000
                .userDetailsService(customUserDetailsService)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder () {
       return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder.userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
        return authenticationManagerBuilder.build();
    }
}
