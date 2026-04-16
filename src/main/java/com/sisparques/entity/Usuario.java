package com.sisparques.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_usuarios", schema = "sc_parques")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_rol", nullable = false)
    private Rol rol;

    @Column(name = "dni", nullable = false, unique = true)
    private String dni;

    @Column(name = "nombres", nullable = false)
    private String nombres;

    @Column(name = "apel_pat", nullable = false)
    private String apelPat;

    @Column(name = "apel_mat", nullable = false)
    private String apelMat;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "estado", nullable = false)
    private Boolean estado;

    @Column(name = "nmr_celular")
    private String nmrCelular;

    @Column(name = "totp_secret")
    private String totpSecret;

    @Column(name = "totp_activo", nullable = false)
    private Boolean totpActivo = false;

    // GETTERS Y SETTERS

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public Rol getRol() {
        return rol;
    }

    public void setRol(Rol rol) {
        this.rol = rol;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApelPat() {
        return apelPat;
    }

    public void setApelPat(String apelPat) {
        this.apelPat = apelPat;
    }

    public String getApelMat() {
        return apelMat;
    }

    public void setApelMat(String apelMat) {
        this.apelMat = apelMat;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public String getNmrCelular() {
        return nmrCelular;
    }

    public void setNmrCelular(String nmrCelular) {
        this.nmrCelular = nmrCelular;
    }

    public String getTotpSecret() {
        return totpSecret;
    }

    public void setTotpSecret(String totpSecret) {
        this.totpSecret = totpSecret;
    }

    public Boolean getTotpActivo() {
        return totpActivo;
    }

    public void setTotpActivo(Boolean totpActivo) {
        this.totpActivo = totpActivo;
    }
}