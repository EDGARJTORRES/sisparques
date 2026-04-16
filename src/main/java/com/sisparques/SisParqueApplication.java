package com.sisparques;

import com.sisparques.entity.Rol;
import com.sisparques.repository.UsuarioRepository;
import com.sisparques.repository.RolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SisParqueApplication {

    public static void main(String[] args) {
        SpringApplication.run(SisParqueApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(UsuarioRepository usuarioRepository, RolRepository rolRepository, PasswordEncoder passwordEncoder) {
        return args -> {

            if (rolRepository.count() == 0) {

                Rol administrador = new Rol();
                administrador.setNombreRol("administrador");
                administrador.setDescripcion("Super administrador del sistema");

                Rol obrero = new Rol();
                obrero.setNombreRol("Obrero");
                obrero.setDescripcion("Persona encargada del mantenimiento de los parques");

                Rol ciudadano = new Rol();
                ciudadano.setNombreRol("ciudadano");
                ciudadano.setDescripcion("Ciudadano que reporta problemas en los parques");

                rolRepository.save(administrador);
                rolRepository.save(obrero);
                rolRepository.save(ciudadano);

                System.out.println(">>> Roles inicializados correctamente");
            }
        };
    }
}