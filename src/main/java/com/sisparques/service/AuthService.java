package com.sisparques.service;

import com.sisparques.dto.LoginRequest;
import com.sisparques.dto.LoginResponse;
import com.sisparques.entity.PasswordResetToken;
import com.sisparques.entity.Usuario;
import com.sisparques.repository.PasswordResetTokenRepository;
import com.sisparques.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final TotpService totpService;

    public AuthService(UsuarioRepository usuarioRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       PasswordResetTokenRepository passwordResetTokenRepository,
                       TotpService totpService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.totpService = totpService;
    }

    // 🔐 LOGIN
    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        // 🔑 Validar contraseña
        if (!passwordEncoder.matches(request.getPassword(), usuario.getPasswordHash())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        // 🔴 CAMBIO IMPORTANTE: activo → estado
        if (!Boolean.TRUE.equals(usuario.getEstado())) {
            throw new RuntimeException("Usuario inactivo");
        }

        // 🔐 2FA (TOTP)
        if (Boolean.TRUE.equals(usuario.getTotpActivo())) {

            // Si no envía código → pedirlo
            if (request.getTotpCode() == null || request.getTotpCode().isBlank()) {
                return new LoginResponse(
                        "2FA_REQUIRED",
                        usuario.getIdUsuario(),
                        usuario.getNombres(),
                        usuario.getEmail(),
                        usuario.getRol().getIdRol(),
                        usuario.getRol().getNombreRol()
                );
            }

            // Validar código
            if (!totpService.verifyCode(usuario.getTotpSecret(), request.getTotpCode())) {
                throw new RuntimeException("Código de autenticación inválido");
            }
        }

        // 🎟️ Generar JWT
        String token = jwtService.generateToken(
                usuario.getEmail(),
                usuario.getRol().getNombreRol()
        );

        return new LoginResponse(
                token,
                usuario.getIdUsuario(),
                usuario.getNombres(),
                usuario.getEmail(),
                usuario.getRol().getIdRol(),
                usuario.getRol().getNombreRol()
        );
    }

    // 📩 SOLICITAR RECUPERACIÓN
    @Transactional
    public String requestPasswordReset(String email) {

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("No existe un usuario con ese correo"));

        // 🔢 Código de 6 dígitos
        String token = String.format("%06d", new Random().nextInt(999999));

        PasswordResetToken resetToken = passwordResetTokenRepository.findByUsuario(usuario)
                .map(existing -> {
                    existing.setToken(token);
                    existing.setExpiryDate(LocalDateTime.now().plusHours(1));
                    return existing;
                })
                .orElse(new PasswordResetToken(token, usuario));

        passwordResetTokenRepository.save(resetToken);

        // ⚠️ SOLO PARA PRUEBAS
        System.out.println(">>> Código recuperación para " + email + ": " + token);

        return token;
    }

    // 🔑 RESET PASSWORD
    @Transactional
    public void resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Código inválido o expirado"));

        if (resetToken.isExpired()) {
            passwordResetTokenRepository.delete(resetToken);
            throw new RuntimeException("El código ha expirado");
        }

        Usuario usuario = resetToken.getUsuario();

        usuario.setPasswordHash(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);

        // eliminar token usado
        passwordResetTokenRepository.delete(resetToken);
    }

    // 🔐 DESACTIVAR 2FA
    @Transactional
    public void disableTotp(Integer userId) {

        Usuario usuario = usuarioRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setTotpActivo(false);
        usuario.setTotpSecret(null);

        usuarioRepository.save(usuario);
    }
}