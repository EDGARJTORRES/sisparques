package com.sisparques.service;

import com.sisparques.dto.UsuarioDto;
import com.sisparques.entity.Rol;
import com.sisparques.entity.Usuario;
import com.sisparques.repository.RolRepository;
import com.sisparques.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
                          RolRepository rolRepository,
                          PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UsuarioDto> getAllUsers() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public UsuarioDto getUserById(Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return convertToDTO(usuario);
    }

    public UsuarioDto getUserByEmail(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return convertToDTO(usuario);
    }

    public UsuarioDto createUser(UsuarioDto dto) {
        Usuario usuario = new Usuario();
        mapDtoToEntity(dto, usuario);

        // 🔐 Password
        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        } else {
            throw new RuntimeException("La contraseña es obligatoria");
        }

        // Estado por defecto
        usuario.setEstado(true);

        Usuario savedUser = usuarioRepository.save(usuario);
        return convertToDTO(savedUser);
    }

    public UsuarioDto updateUser(Integer id, UsuarioDto dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        mapDtoToEntity(dto, usuario);

        if (dto.getPassword() != null && !dto.getPassword().isEmpty()) {
            usuario.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        Usuario updatedUser = usuarioRepository.save(usuario);
        return convertToDTO(updatedUser);
    }

    public void deleteUser(Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 🔴 Eliminación lógica
        usuario.setEstado(false);
        usuarioRepository.save(usuario);
    }

    public void changePassword(Integer id, String passwordActual, String passwordNueva) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(passwordActual, usuario.getPasswordHash())) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }

        usuario.setPasswordHash(passwordEncoder.encode(passwordNueva));
        usuarioRepository.save(usuario);
    }

    private UsuarioDto convertToDTO(Usuario usuario) {
        UsuarioDto dto = new UsuarioDto();

        dto.setIdUsuario(usuario.getIdUsuario());
        dto.setDni(usuario.getDni());
        dto.setNombres(usuario.getNombres());
        dto.setApelPat(usuario.getApelPat());
        dto.setApelMat(usuario.getApelMat());
        dto.setEmail(usuario.getEmail());
        dto.setEstado(usuario.getEstado());
        dto.setNmrCelular(usuario.getNmrCelular());
        dto.setTotpActivo(usuario.getTotpActivo());

        if (usuario.getRol() != null) {
            dto.setIdRol(usuario.getRol().getIdRol());
            dto.setNombreRol(usuario.getRol().getNombreRol());
        }

        return dto;
    }

    private void mapDtoToEntity(UsuarioDto dto, Usuario usuario) {
        usuario.setDni(dto.getDni());
        usuario.setNombres(dto.getNombres());
        usuario.setApelPat(dto.getApelPat());
        usuario.setApelMat(dto.getApelMat());
        usuario.setEmail(dto.getEmail());
        usuario.setEstado(dto.getEstado());
        usuario.setNmrCelular(dto.getNmrCelular());

        if (dto.getIdRol() != null) {
            Rol rol = rolRepository.findById(dto.getIdRol())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
            usuario.setRol(rol);
        }
    }

    public List<UsuarioDto> getUsersByRol(String nombreRol) {
        return usuarioRepository.findAll()
                .stream()
                .filter(u -> u.getRol() != null &&
                        u.getRol().getNombreRol().equalsIgnoreCase(nombreRol) &&
                        Boolean.TRUE.equals(u.getEstado()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}