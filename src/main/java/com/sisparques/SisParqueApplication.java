package com.sisparques;

import com.sisparques.entity.Usuario;
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
            // Inicializar Roles (solo si no existen)
            if (rolRepository.count() == 0) {
                rolRepository.save(new Rol(1, "admin", "Super administrador del sistema"));
                rolRepository.save(new Rol(2, "Obrero", "Persona encargada del mantenimiento de los parques"));
                rolRepository.save(new Rol(3, "ciudadano", "Ciudadano que reporta problemas en los parques"));
                System.out.println(">>> Roles inicializados correctamente");
            }
        };
    }
}