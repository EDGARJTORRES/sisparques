"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

type ViewMode = "login" | "totp" | "forgot" | "reset"

let pendingLogin = { email: "", password: "" }

export function LoginForm() {
  const { resolvedTheme } = useTheme()
  const { setUser } = useAuth()

  const [view, setView] = useState<ViewMode>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔐 LOGIN
  const handleLogin = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      // 🔥 SI REQUIERE 2FA
      if (data.token === "2FA_REQUIRED") {
        pendingLogin = { email, password }
        setView("totp")
        return
      }

      applyLogin(data)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔐 VALIDAR 2FA
  const handleTotp = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: pendingLogin.email,
          password: pendingLogin.password,
          totpCode
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      applyLogin(data)

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔐 APLICAR LOGIN
  const applyLogin = (data: any) => {
    const user = {
      id: data.idUsuario,
      nombre: data.nombre,
      email: data.email,
      rol: data.nombreRol,
      totpActivo: data.totpActivo
    }

    sessionStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", data.token)
    setUser(user)

    // 🔥 REDIRECCIÓN
    if (data.nombreRol?.toLowerCase() === "administrador") {
      window.location.href = "/admin"
    } else {
      window.location.href = "/"
    }
  }

  // 🔐 RECUPERAR PASSWORD
  const handleForgot = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`http://localhost:8081/api/auth/forgot-password?email=${email}`, {
        method: "POST"
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      alert("Código generado: " + data.token) // DEBUG
      setView("reset")

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // 🔐 RESET PASSWORD
  const handleReset = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("http://localhost:8081/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      alert("Contraseña actualizada")
      setView("login")

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ===========================
  // 🎯 VISTA TOTP
  // ===========================
  if (view === "totp") {
    return (
      <Card className="shadow-none border-none">
        <CardContent className="space-y-5">
          <h2 className="text-xl font-bold text-center">Código de Seguridad</h2>

          {error && <Alert variant="destructive"><AlertCircle /><AlertDescription>{error}</AlertDescription></Alert>}

          <form onSubmit={handleTotp}>
            <Input
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="text-center text-xl"
            />
            <Button className="w-full mt-4">{loading ? "Verificando..." : "Verificar"}</Button>
          </form>

          <button onClick={() => setView("login")} className="text-sm text-center w-full">
            ← Volver
          </button>
        </CardContent>
      </Card>
    )
  }

  // ===========================
  // 🎯 VISTA FORGOT
  // ===========================
  if (view === "forgot") {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleForgot}>
            <Input placeholder="Correo" className="pl-10 h-11 border border-gray-300 dark:border-gray-600" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button className="w-full mt-4 ">Enviar código</Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  // ===========================
  // 🎯 VISTA RESET
  // ===========================
  if (view === "reset") {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleReset}>
            <Input placeholder="Código" value={token} onChange={(e) => setToken(e.target.value)} />
            <Input placeholder="Nueva contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <Button className="w-full mt-4">Cambiar contraseña</Button>
          </form>
        </CardContent>
      </Card>
    )
  }

  // ===========================
  // 🎯 LOGIN NORMAL (TU DISEÑO)
  // ===========================
  return (
    <Card className="border-none shadow-none">
      <div className="flex justify-center">
        <Image src="/img/logomuni3.png" alt="Logo" width={80} height={80} />
      </div>

      <CardHeader className="pb-0">
        <div className="flex items-center gap-4">
          
          {/* LOGO */}
          <Image
            src="/img/sis_logo.png"
            alt="Logo Sistema"
            width={60}
            height={60}
            className="object-contain border border-gray-300 dark:border-gray-600 rounded-2xl"
            priority
          />

          {/* TEXTOS */}
          <div>
            <CardTitle className="text-3xl font-bold">
              Iniciar Sesión
            </CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </div>

        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">

          {error && <Alert variant="destructive"><AlertCircle /><AlertDescription>{error}</AlertDescription></Alert>}

          <div>
            <Label className="mb-3">Correo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4" />
              <Input className="pl-10 h-11 border border-gray-300 dark:border-gray-600" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com"/>
            </div>
          </div>

          <div>
            <Label className="mb-3">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4" />
              <Input
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-10 h-11 border border-gray-300 dark:border-gray-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-muted-foreground">Recordarme</span>
            </label>
            <button type="button" onClick={() => { setView("forgot"); setError(null) }}
              className="text-green-600 hover:text-primary/80 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button className=" h-12 font-semibold text-base w-full bg-green-600">
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="text-green-600 hover:text-primary/80 font-medium transition-colors">Contacta con administración</a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}