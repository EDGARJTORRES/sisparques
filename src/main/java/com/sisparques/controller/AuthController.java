package com.sisparques.controller;

import com.sisparques.dto.LoginRequest;
import com.sisparques.dto.LoginResponse;
import com.sisparques.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // 🔐 LOGIN CON EMAIL (tb_usuarios.email)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // 📩 RECUPERACIÓN DE CONTRASEÑA
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        try {
            String token = authService.requestPasswordReset(email);
            return ResponseEntity.ok(Map.of(
                    "message", "Se ha enviado un código de recuperación al correo",
                    "token", token // ⚠️ en producción NO devolver esto
            ));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // 🔑 RESET PASSWORD (usa password_hash)
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");

            if (token == null || newPassword == null) {
                return ResponseEntity
                        .badRequest()
                        .body(Map.of("message", "Datos incompletos"));
            }

            authService.resetPassword(token, newPassword);

            return ResponseEntity.ok(
                    Map.of("message", "Contraseña actualizada correctamente")
            );

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    // 🔐 DESACTIVAR 2FA (totp_activo = false)
    @PostMapping("/disable-2fa")
    public ResponseEntity<?> disable2FA(@RequestParam Integer userId) {
        try {
            authService.disableTotp(userId);
            return ResponseEntity.ok(
                    Map.of("message", "2FA desactivado correctamente")
            );
        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}