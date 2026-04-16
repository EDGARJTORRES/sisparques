package com.sisparques.dto;

public class UsuarioDto {
    private Integer idUsuario;
    private String dni;
    private String nombres;
    private String apelPat;
    private String apelMat;
    private String email;
    private String password;
    private String nmrCelular;
    private Boolean estado;
    private Boolean totpActivo;
    private Integer idRol;
    private String nombreRol;

    public UsuarioDto() {
    }

    public UsuarioDto(Integer idUsuario, String dni, String nombres, String apelPat, String apelMat, String email,
            String password, String nmrCelular, Boolean estado, Boolean totpActivo, Integer idRol,
            String nombreRol) {
        this.idUsuario = idUsuario;
        this.dni = dni;
        this.nombres = nombres;
        this.apelPat = apelPat;
        this.apelMat = apelMat;
        this.email = email;
        this.password = password;
        this.nmrCelular = nmrCelular;
        this.estado = estado;
        this.totpActivo = totpActivo;
        this.idRol = idRol;
        this.nombreRol = nombreRol;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNmrCelular() {
        return nmrCelular;
    }

    public void setNmrCelular(String nmrCelular) {
        this.nmrCelular = nmrCelular;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }

    public Boolean getTotpActivo() {
        return totpActivo;
    }

    public void setTotpActivo(Boolean totpActivo) {
        this.totpActivo = totpActivo;
    }

    public Integer getIdRol() {
        return idRol;
    }

    public void setIdRol(Integer idRol) {
        this.idRol = idRol;
    }

    public String getNombreRol() {
        return nombreRol;
    }

    public void setNombreRol(String nombreRol) {
        this.nombreRol = nombreRol;
    }

    @Override
    public String toString() {
        return "UsuarioDto [idUsuario=" + idUsuario + ", dni=" + dni + ", nombres=" + nombres + ", apelPat=" + apelPat
                + ", apelMat=" + apelMat + ", email=" + email + ", password=" + password + ", nmrCelular=" + nmrCelular
                + ", estado=" + estado + ", totpActivo=" + totpActivo + ", idRol=" + idRol + ", nombreRol="
                + nombreRol + "]";
    }

}
