"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"

export function LoginForm() {
  const { resolvedTheme } = useTheme()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      console.log("Login:", { username, password })
      setIsLoading(false)
    }, 1500)
  }

  return (
    
    <Card className="border-none shadow-none outline-none">
       <div className="flex justify-center lg:justify-center">
          <Image
            src={
              resolvedTheme === "dark"
                ? "/img/logomuni3.png"
                : "/img/logomuni3.png"
            }
            alt="Logo Brusben"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>
      <CardHeader className="space-y-2 pb-2 text-center">
        <CardTitle className="text-3xl">
          Iniciar Sesión
        </CardTitle>
        <CardDescription>
          Ingrese sus credenciales para acceder al sistema
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Usuario */}
          <div className="space-y-2">
            <Label>Usuario</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                className="pl-10 h-11 border border-gray-300 dark:border-gray-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ingrese usuario"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                className="pl-10 pr-10 h-11 border border-gray-300 dark:border-gray-600"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-muted-foreground">Recordarme</span>
            </label>
            <button type="button"
              className="text-green-600 hover:text-primary/80 font-medium transition-colors">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-11 bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
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