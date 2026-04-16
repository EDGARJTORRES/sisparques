"use client"

import Image from "next/image"
import { TreePine, Leaf, MapPin } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function LoginPage() {
  const { resolvedTheme } = useTheme()

  return (
    <div className="min-h-screen w-full flex">

      {/* LEFT SIDE - EFECTO MEJORADO */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

        {/* IMAGEN DE FONDO CON EFECTO ZOOM SUAVE */}
        <div className="absolute inset-0 scale-100">
          <Image
            src="/img/chiclayo.jpg"
            alt="Parques de Chiclayo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* OVERLAY PRINCIPAL (EFECTO OSCURO + DEGRADADO MODERNO) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-emerald-950/70 to-black/90" />

        {/* GLASS LAYER (EFECTO PROFUNDO) */}
        <div className="absolute inset-0  bg-black/10" />

        {/* CONTENIDO */}
        <div className="relative z-10 flex flex-col justify-between text-white p-12 w-full">

          {/* HEADER */}
          <div className="flex items-center gap-4">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
              <TreePine className="w-8 h-8 text-white" />
            </div>

            <div>
              <p className="text-xl font-bold tracking-wide">
                SISPARQUES
              </p>
              <p className="text-sm text-white/70 font-medium">
                Municipalidad Provincial de Chiclayo
              </p>
            </div>
          </div>

          {/* CENTER CONTENT */}
          <div className="space-y-10">

            <div>
              <h1 className="text-5xl font-bold leading-tight">
                Sistema Informático de
                <br />
                Gestión de Parques y Jardines v1.0
                <br />
              </h1>

              <p className="mt-4 text-lg text-white/70">
                Gestión de Mantenimiento de áreas verdes en tiempo real
              </p>
            </div>

            {/* FEATURES */}
            <div className="space-y-4 max-w-md">

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                  <Leaf className="w-5 h-5 text-emerald-300" />
                </div>
                <p className="text-white/80">
                  Control y monitoreo de áreas verdes
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                  <MapPin className="w-5 h-5 text-emerald-300" />
                </div>
                <p className="text-white/80">
                  Ubicación geográfica de parques
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl border border-white/10">
                  <TreePine className="w-5 h-5 text-emerald-300" />
                </div>
                <p className="text-white/80">
                  Registro de mantenimiento continuo
                </p>
              </div>

            </div>
          </div>

          {/* FOOTER */}
          <div className="text-white/50 text-sm">
            <p>Versión 1.0.0 | © 2026 Sistema Municipal</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 relative">
        <div className="w-full max-w-md space-y-0 relative z-10">

          {/* Theme toggle arriba a la derecha */}
          <div className="absolute top-0 right-0 p-2">
            <ThemeToggle />
          </div>

          <LoginForm />

        </div>
      </div>

    </div>
  )
}