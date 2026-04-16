"use client"

import { useState } from "react"
import { 
  Search, HelpCircle, PlayCircle, FileText, PhoneCall, 
  MessageSquare, Mail, ChevronRight, ExternalLink,
  BookOpen, Settings, ShieldCheck, Zap
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function AyudaPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      title: "Preguntas Frecuentes",
      description: "Respuestas rápidas a las dudas más comunes del sistema.",
      icon: HelpCircle,
      color: "bg-blue-500",
      link: "#faqs"
    },
    {
      title: "Video Tutoriales",
      description: "Guías visuales paso a paso para dominar la plataforma.",
      icon: PlayCircle,
      color: "bg-purple-500",
      link: "#tutorials"
    },
    {
      title: "Guías de Usuario",
      description: "Documentación detallada sobre cada módulo del panel.",
      icon: FileText,
      color: "bg-emerald-500",
      link: "#guides"
    },
    {
      title: "Soporte Técnico",
      description: "Contacta con nuestro equipo para asistencia personalizada.",
      icon: PhoneCall,
      color: "bg-rose-500",
      link: "#support"
    }
  ]

  const faqs = [
    {
      question: "¿Cómo registro un nuevo parque en el sistema?",
      answer:
        "Para registrar un parque, dirígete al módulo 'Parques' en el menú lateral, selecciona la opción 'Nuevo Registro', completa los datos como nombre del parque, ubicación, distrito, área y estado, luego haz clic en 'Guardar'."
    },
    {
      question: "¿Cómo asigno un mantenimiento a un parque?",
      answer:
        "En el módulo 'Programación de Mantenimiento', selecciona el parque deseado, define la fecha, tipo de mantenimiento (poda, limpieza, riego, etc.) y asigna la brigada responsable. Finalmente guarda la programación."
    },
    {
      question: "¿Puedo ver el historial de mantenimientos realizados?",
      answer:
        "Sí, en el módulo 'Control de Monitoreo' puedes visualizar el historial completo de mantenimientos por parque, incluyendo fechas, responsables y estado de ejecución."
    },
    {
      question: "¿Qué significan los estados de un parque (Activo, En mantenimiento, Inactivo)?",
      answer:
        "Activo indica que el parque está operativo y accesible. En mantenimiento significa que se están realizando trabajos en el área. Inactivo indica que el parque está temporalmente cerrado o fuera de servicio."
    }
  ]

  return (
    <div className="space-y-10 pb-20">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-[40px] bg-card p-12 text-white shadow-2xl ring-1 ring-primary/20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          <Badge className="bg-white/20 text-primary hover:bg-white/30 border-none px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            Centro de Ayuda SISPARQUES
          </Badge>
          <h1 className="text-4xl md:text-5xl text-green-600 tracking-tight">
            ¿Cómo podemos ayudarte hoy?
          </h1>
          <p className="text-lg text-primary font-medium">
            Encuentra tutoriales, guías y respuestas a todas tus dudas sobre el panel administrativo.
          </p>
        </div>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {categories.map((cat, idx) => (
          <Card key={idx} className="group cursor-pointer border-none shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-[32px] overflow-hidden bg-card ring-1 ring-slate-100">
            <CardHeader className="pb-4">
              <div className={`${cat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-inherit transition-transform group-hover:scale-110`}>
                <cat.icon className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl font-bold">{cat.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {cat.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="p-0 h-auto font-bold text-primary group-hover:gap-3 transition-all">
                Explorar <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* FAQs SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <MessageSquare className="h-6 w-6 text-primary" />
              Preguntas Frecuentes
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem 
                key={idx} 
                value={`item-${idx}`} 
                className="border-none bg-card rounded-3xl px-6 shadow-sm ring-1 ring-slate-100 data-[state=open]:ring-primary/20 transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-5 font-bold text-left text-dark data-[state=open]:text-primary " >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-slate-500 leading-relaxed font-medium">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="bg-slate-50 rounded-[32px] p-8 border border-dashed border-slate-200">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <ShieldCheck className="h-8 w-8 text-emerald-500" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-bold text-lg ">¿Necesitas ayuda con la seguridad?</h4>
                <p className="text-sm text-slate-500">Aprende cómo configurar roles y permisos avanzados para tu equipo administrativo.</p>dark:text-card
              </div>
              <Button className="md:ml-auto rounded-xl font-bold px-6 dark:text-white dark:bg-card">Ver Documentación</Button>
            </div>
          </div>
        </div>

        {/* POPULAR ARTICLES */}
        <div className="rounded-[32px] shadow-sm ring-1 ring-slate-100 overflow-hidden bg-white">
          
          {/* HEADER */}
          <div className="bg-slate-50/50 border-b px-6 py-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-black dark:text-card" >
              Guías del Sistema de Parques
            </h3>
          </div>

          {/* CONTENT */}
          <div className="px-6 py-6 space-y-6">
            {[
              { title: "Registro y mantenimiento de parques", icon: Settings },
              { title: "Gestión de brigadas de mantenimiento", icon: BookOpen },
              { title: "Programación de inspecciones de áreas verdes", icon: Zap },
              { title: "Control de incidencias y reportes de parques", icon: ShieldCheck },
            ].map((article, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                  <article.icon className="h-5 w-5 text-slate-400 group-hover:text-primary" />
                </div>

                <span className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors flex-1">
                  {article.title}
                </span>

                <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
