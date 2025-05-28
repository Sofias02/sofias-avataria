import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Lightbulb, Brain, Heart, Bot, ChevronDown, ArrowRight, ArrowLeft } from "lucide-react";

export default function SofiasLLC() {
  return (
    <div
      className="min-h-screen w-full text-gray-900 relative"
      style={{
        backgroundImage: 'url("/images/oficinas.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0"></div>
      <div className="relative z-10">
        <Link
          to="/recepcion"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white rounded-xl shadow-md text-purple-800 font-semibold transition z-20"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Recepción
        </Link>

        <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <motion.img
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            src="/images/logo-sofias.png"
            alt="Logo Sofía’s LLC"
            className="w-36 h-36 rounded-full shadow-2xl mb-6 border-4 border-white object-contain bg-white"
          />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3">Así es Sofía’s LLC</h1>
          <p className="text-xl md:text-2xl mb-6 font-light max-w-2xl mx-auto">
            Más que una agencia, somos un legado vivo.
          </p>
          <Button size="lg" className="px-8 py-4 text-lg rounded-2xl shadow-xl mt-2 animate-bounce flex gap-2 items-center">
            Descubre nuestra esencia <ChevronDown className="ml-2" />
          </Button>
        </section>

        <section className="py-14 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-left">Nuestra Esencia</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 flex items-center gap-4 bg-white/90 shadow-lg">
              <Heart className="text-rose-400 w-8 h-8" />
              <span>Empatía real: tecnología para acercar, no separar.</span>
            </Card>
            <Card className="p-6 flex items-center gap-4 bg-white/90 shadow-lg">
              <Lightbulb className="text-yellow-400 w-8 h-8" />
              <span>Innovación como respuesta a la adversidad.</span>
            </Card>
            <Card className="p-6 flex items-center gap-4 bg-white/90 shadow-lg">
              <Brain className="text-purple-500 w-8 h-8" />
              <span>Fortaleza nacida del dolor y la reinvención.</span>
            </Card>
            <Card className="p-6 flex items-center gap-4 bg-white/90 shadow-lg">
              <Users className="text-blue-400 w-8 h-8" />
              <span>Visión de comunidad y legado para el futuro.</span>
            </Card>
          </div>
        </section>

        <section className="py-12 px-4 bg-purple-50 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto rounded-2xl mt-8 shadow-xl">
          <img
            src="/sofia1.png"
            alt="Avatar Sofía"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0 object-cover"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2">¿Quién es Sofía?</h3>
            <p className="mb-1 text-base md:text-lg">
              Soy Sofía, la CEO y cara visible de este proyecto. Detrás de mí hay una historia que nunca te contaré entera, pero que da sentido a cada reto y cada logro. Sofía’s LLC es la prueba de que, incluso cuando la vida te arrebata todo, puedes reinventarte y construir algo nuevo y grande, paso a paso, día a día.
            </p>
            <span className="italic text-purple-500">— Sofía, CEO</span>
          </div>
        </section>

        <section className="py-14 px-4 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">¿Qué hacemos?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img
              src="/images/reunion.png"
              alt="Reunión Sofía’s LLC"
              className="rounded-xl shadow-lg object-cover"
            />
            <ul className="space-y-5 text-lg">
              <li>Creamos avatares de inteligencia artificial con alma, memoria y rostro.</li>
              <li>Te damos el poder de hacer las cosas por ti mismo, con autonomía y confianza.</li>
              <li>Avatares personalizados, elegidos y validados por la comunidad.</li>
              <li>Desde abogados, profesores, chefs o entrenadores personalizados… ¡lo que necesites!</li>
            </ul>
          </div>
        </section>

        <section className="py-16 px-4 bg-gradient-to-r from-purple-200 to-pink-100 max-w-full">
          <h2 className="text-3xl font-bold mb-4 text-center">¿Qué es AvatarIA?</h2>
          <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">
            <img
              src="/images/home.png"
              alt="AvatarIA App"
              className="w-48 h-48 rounded-xl shadow-xl object-cover"
            />
            <div className="flex-1 space-y-4 text-lg">
              <p>
                AvatarIA es tu navaja suiza tecnológica: una app viva y comunitaria que evoluciona contigo. No es solo una app: es el aliado que te acompaña y te impulsa a resolver por ti mismo, sin depender de nadie.
              </p>
              <p>
                Cada semana, la comunidad elige el próximo avatar a crear: abogado, profesor, chef, entrenador… lo que pidas, lo creamos, le damos alma, rostro y memoria, y tú eliges cómo interactuar: chat, voz, o llamada directa.
              </p>
              <p>
                Disfruta la libertad y la confianza de resolver, aprender y crecer con autonomía. Aquí, la tecnología tiene propósito y humanidad.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-2 flex gap-2 items-center"
              >
                <a
                  href="https://wa.me/41766192297?text=Hola,%20quiero%20crear%20mi%20avatar%20personalizado%20con%20Sofía's%20LLC"

                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sugiere un avatar <ArrowRight />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 bg-gray-100 mt-10 rounded-2xl shadow-inner max-w-4xl mx-auto">
          <div className="text-center">
            <Bot className="mx-auto w-10 h-10 text-purple-400 mb-4" />
            <p className="text-xl italic mb-2 font-medium">
              Debemos ser conscientes de que trabajamos mano a mano con la inteligencia artificial.
              Si los propios humanos nos equivocamos, ¿por qué exigirle a la IA un nivel de perfección que ni nosotros mismos podemos ofrecer?
              Si a veces necesitamos una segunda opinión cuando tratamos con personas, ¿por qué deberíamos actuar diferente con la IA?
            </p>
          </div>
        </section>

        <footer className="py-10 px-4 bg-gradient-to-t from-purple-200 to-white text-center mt-14">
          <h3 className="text-2xl font-bold mb-2">Forma parte de Sofía’s LLC</h3>
          <p className="mb-6">Súmate a la comunidad que está cambiando el mundo digital con alma, carácter y fortaleza.</p>
          <Button size="lg" className="px-8 py-4 text-lg rounded-2xl shadow-xl">
            Unirme ahora
          </Button>
          <div className="mt-6 flex justify-center gap-6">
            <a href="#" className="hover:text-purple-500">Instagram</a>
            <a href="#" className="hover:text-purple-500">X (Twitter)</a>
            <a href="#" className="hover:text-purple-500">LinkedIn</a>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Sofía’s LLC. Todos los derechos reservados.
          </div>
        </footer>
      </div>
    </div>
  );
}
