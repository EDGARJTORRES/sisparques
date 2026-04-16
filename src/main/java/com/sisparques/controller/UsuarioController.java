package com.sisparques.controller;

import com.sisparques.dto.UsuarioDto;
import com.sisparques.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // 🔹 LISTAR TODOS
    @GetMapping
    public ResponseEntity<List<UsuarioDto>> getAllUsers() {
        return ResponseEntity.ok(usuarioService.getAllUsers());
    }

    // 🔹 BUSCAR POR EMAIL
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            UsuarioDto user = usuarioService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
        }
    }

    // 🔹 BUSCAR POR ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        try {
            UsuarioDto user = usuarioService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
        }
    }

    // 🔹 CREAR USUARIO
    @PostMapping
    public ResponseEntity<UsuarioDto> createUser(@RequestBody UsuarioDto dto) {
        return ResponseEntity.ok(usuarioService.createUser(dto));
    }

    // 🔹 ACTUALIZAR USUARIO
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDto> updateUser(@PathVariable Integer id, @RequestBody UsuarioDto dto) {
        return ResponseEntity.ok(usuarioService.updateUser(id, dto));
    }

    // 🔹 CAMBIAR CONTRASEÑA
    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable Integer id, @RequestBody Map<String, String> request) {

        String passwordActual = request.get("passwordActual");
        String passwordNueva = request.get("passwordNueva");

        if (passwordActual == null || passwordNueva == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Datos incompletos"));
        }

        try {
            usuarioService.changePassword(id, passwordActual, passwordNueva);
            return ResponseEntity.ok(Map.of("message", "Contraseña actualizada correctamente"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // 🔹 ELIMINAR
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            usuarioService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "Usuario eliminado"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("message", "Usuario no encontrado"));
        }
    }
}