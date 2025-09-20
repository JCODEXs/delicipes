"use client";
import { useState } from "react";
import Link from "next/link";

export default function InstructionsContent() {
  const [activeSection, setActiveSection] = useState("inicio");

  const sections = [
    { id: "inicio", title: "Inicio", icon: "🏠" },
    { id: "despensa", title: "Despensa", icon: "🛒" },
    { id: "plan", title: "Planificación", icon: "📅" },
    { id: "diseno", title: "Diseño de Recetas", icon: "👨‍🍳" },
    { id: "recetario", title: "Recetario", icon: "📚" },
    { id: "consejos", title: "Consejos", icon: "💡" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">
            📖 Guía de Uso - Delicipeasy
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            Aprende a usar todas las funcionalidades de tu aplicación de planificación de comidas y gestión de recetas
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-white text-amber-700 hover:bg-amber-100"
              }`}
            >
              {section.icon} {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          {activeSection === "inicio" && <InicioSection />}
          {activeSection === "despensa" && <DespensaSection />}
          {activeSection === "plan" && <PlanSection />}
          {activeSection === "diseno" && <DisenoSection />}
          {activeSection === "recetario" && <RecetarioSection />}
          {activeSection === "consejos" && <ConsejosSection />}
        </div>
      </div>
    </div>
  );
}

function InicioSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">🏠 Bienvenido a Delicipeasy</h2>
      
      <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-400">
        <h3 className="text-xl font-semibold text-amber-800 mb-3">¿Qué es Delicipeasy?</h3>
        <p className="text-amber-700">
          Delicipeasy es tu asistente personal para la planificación de comidas y gestión de recetas. 
          Te ayuda a organizar tus comidas semanales, crear listas de compras automáticas, 
          diseñar tus propias recetas y mantener un recetario personalizado.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">🛒 Despensa</h3>
          <p className="text-blue-700 mb-4">
            Gestiona tu inventario y genera listas de compras automáticas basadas en tus planes de comida.
          </p>
          <Link href="/inventory" className="text-blue-600 hover:text-blue-800 font-medium">
            Ir a Despensa →
          </Link>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-3">📅 Planificación</h3>
          <p className="text-green-700 mb-4">
            Organiza tus comidas por días de la semana y calcula automáticamente los ingredientes necesarios.
          </p>
          <Link href="/plan" className="text-green-600 hover:text-green-800 font-medium">
            Ir a Planificación →
          </Link>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-purple-800 mb-3">👨‍🍳 Diseño</h3>
          <p className="text-purple-700 mb-4">
            Crea y edita tus propias recetas con ingredientes, cantidades y descripciones detalladas.
          </p>
          <Link href="/design" className="text-purple-600 hover:text-purple-800 font-medium">
            Ir a Diseño →
          </Link>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-orange-800 mb-3">📚 Recetario</h3>
          <p className="text-orange-700 mb-4">
            Explora y gestiona tu colección completa de recetas guardadas.
          </p>
          <Link href="/library" className="text-orange-600 hover:text-orange-800 font-medium">
            Ir a Recetario →
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">🚀 Primeros Pasos</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Comienza creando algunos ingredientes básicos</li>
          <li>Diseña tu primera receta con esos ingredientes</li>
          <li>Planifica tus comidas para la semana</li>
          <li>Genera tu lista de compras automáticamente</li>
          <li>¡Disfruta cocinando!</li>
        </ol>
      </div>
    </div>
  );
}

function DespensaSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">🛒 Gestión de Despensa</h2>

      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">¿Qué hace la Despensa?</h3>
        <p className="text-blue-700">
          La sección de Despensa te permite gestionar tu inventario de ingredientes y generar
          listas de compras automáticas basadas en tus planes de comida semanales.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-amber-800">📋 Funcionalidades Principales</h3>

        <div className="grid gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">✅ Lista de Compras Automática</h4>
            <p className="text-gray-600">
              Se genera automáticamente basada en las recetas que has planificado para la semana.
              Incluye cantidades exactas y precios estimados.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🔢 Control de Cantidades</h4>
            <p className="text-gray-600">
              Visualiza las cantidades exactas de cada ingrediente que necesitas comprar,
              calculadas automáticamente según las porciones de tus recetas.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">💰 Estimación de Precios</h4>
            <p className="text-gray-600">
              Cada ingrediente muestra un precio estimado y el total de tu compra,
              ayudándote a planificar tu presupuesto.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">✔️ Marcar como Comprado</h4>
            <p className="text-gray-600">
              Puedes marcar ingredientes como comprados usando las casillas de verificación
              para llevar control de tu lista mientras compras.
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-3">🎯 Cómo Usar la Despensa</h3>
          <ol className="list-decimal list-inside space-y-2 text-green-700">
            <li>Ve a la sección "Plan" y organiza tus comidas para la semana</li>
            <li>Regresa a "Despensa" para ver tu lista de compras generada automáticamente</li>
            <li>Revisa las cantidades y precios estimados</li>
            <li>Usa las casillas para marcar ingredientes como comprados</li>
            <li>Utiliza el botón "¿Qué puedo cocinar?" para ver qué recetas puedes hacer con los ingredientes marcados</li>
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Consejo</h4>
          <p className="text-yellow-700">
            La función "¿Qué puedo cocinar?" te muestra qué recetas de tu plan semanal
            puedes preparar con los ingredientes que ya has comprado.
          </p>
        </div>
      </div>
    </div>
  );
}

function PlanSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">📅 Planificación de Comidas</h2>

      <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
        <h3 className="text-xl font-semibold text-green-800 mb-3">¿Qué es la Planificación?</h3>
        <p className="text-green-700">
          La sección de Planificación te permite organizar tus comidas por días de la semana,
          calcular automáticamente los ingredientes necesarios y gestionar las porciones.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-amber-800">🗓️ Funcionalidades Principales</h3>

        <div className="grid gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📊 Matriz Semanal</h4>
            <p className="text-gray-600">
              Organiza tus comidas en una matriz visual por días de la semana.
              Puedes agregar múltiples recetas por día.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🍽️ Control de Porciones</h4>
            <p className="text-gray-600">
              Ajusta las porciones de cada receta individualmente o usa el control global
              para cambiar todas las porciones a la vez.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">💵 Cálculo de Costos</h4>
            <p className="text-gray-600">
              Ve el costo estimado por día y el total semanal basado en las recetas
              y porciones seleccionadas.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">💾 Guardar Programas</h4>
            <p className="text-gray-600">
              Guarda tus planificaciones semanales como "programas" para reutilizarlas
              en el futuro.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📄 Exportar PDF</h4>
            <p className="text-gray-600">
              Exporta tu planificación semanal como PDF para imprimirla o compartirla.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 Cómo Planificar tus Comidas</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Haz clic en el botón "+" de cualquier día para agregar una receta</li>
            <li>Selecciona una receta de tu recetario en el modal que aparece</li>
            <li>Ajusta las porciones usando los controles + y - en cada receta</li>
            <li>Usa el control "Porciones Globales" para cambiar todas las porciones a la vez</li>
            <li>Revisa los costos diarios y el total semanal</li>
            <li>Guarda tu planificación usando "Save Program"</li>
            <li>Exporta como PDF si necesitas una copia impresa</li>
          </ol>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Consejos para Planificar</h4>
          <ul className="list-disc list-inside space-y-1 text-yellow-700">
            <li>Planifica con anticipación para aprovechar ofertas en ingredientes</li>
            <li>Considera recetas que compartan ingredientes para optimizar compras</li>
            <li>Usa el control global de porciones si cocinas para más personas</li>
            <li>Guarda diferentes programas para diferentes semanas o ocasiones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DisenoSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">👨‍🍳 Diseño de Recetas</h2>

      <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
        <h3 className="text-xl font-semibold text-purple-800 mb-3">¿Qué es el Diseño de Recetas?</h3>
        <p className="text-purple-700">
          La sección de Diseño te permite crear y editar tus propias recetas, agregando ingredientes,
          cantidades, descripciones y fotos para construir tu recetario personalizado.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-amber-800">🔧 Funcionalidades Principales</h3>

        <div className="grid gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📝 Información Básica</h4>
            <p className="text-gray-600">
              Define el nombre de tu receta, número de porciones y agrega una descripción
              detallada con instrucciones de preparación.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🥕 Gestión de Ingredientes</h4>
            <p className="text-gray-600">
              Busca y agrega ingredientes de tu base de datos, especifica cantidades exactas
              y crea nuevos ingredientes si no existen.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📸 Subida de Imágenes</h4>
            <p className="text-gray-600">
              Agrega fotos atractivas a tus recetas para hacerlas más visuales y apetitosas.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">✏️ Edición de Recetas</h4>
            <p className="text-gray-600">
              Modifica recetas existentes, actualiza ingredientes, cantidades o descripciones
              según evolucionen tus recetas.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 Cómo Crear una Receta</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Completa el nombre de la receta y el número de porciones</li>
            <li>Busca ingredientes en el campo de búsqueda</li>
            <li>Haz clic en "+" para agregar cada ingrediente a tu receta</li>
            <li>Ajusta las cantidades usando los controles + y - de cada ingrediente</li>
            <li>Escribe una descripción detallada con las instrucciones de preparación</li>
            <li>Opcionalmente, sube una imagen de la receta</li>
            <li>Haz clic en "Agregar a Recetas" para guardar tu creación</li>
          </ol>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-green-800 mb-3">🔄 Gestión de Ingredientes</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-green-800">Agregar Ingredientes Existentes:</h4>
              <p className="text-green-700">Usa el buscador para encontrar ingredientes y haz clic en "+" para agregarlos.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Crear Nuevos Ingredientes:</h4>
              <p className="text-green-700">Si un ingrediente no existe, puedes crearlo usando el botón "Add" en el menú superior.</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-800">Ajustar Cantidades:</h4>
              <p className="text-green-700">Usa los botones + y - junto a cada ingrediente para ajustar las cantidades exactas.</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Consejos para Diseñar Recetas</h4>
          <ul className="list-disc list-inside space-y-1 text-yellow-700">
            <li>Sé específico con las cantidades para obtener cálculos precisos</li>
            <li>Incluye instrucciones detalladas en la descripción</li>
            <li>Agrega fotos atractivas para hacer tus recetas más apetitosas</li>
            <li>Considera el número de porciones realista para tu receta</li>
            <li>Prueba tus recetas antes de guardarlas definitivamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function RecetarioSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">📚 Recetario</h2>

      <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-400">
        <h3 className="text-xl font-semibold text-orange-800 mb-3">¿Qué es el Recetario?</h3>
        <p className="text-orange-700">
          El Recetario es tu biblioteca personal de recetas donde puedes explorar, buscar,
          filtrar y gestionar todas las recetas que has creado o guardado.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-amber-800">📖 Funcionalidades Principales</h3>

        <div className="grid gap-4">
          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🔍 Búsqueda y Filtros</h4>
            <p className="text-gray-600">
              Busca recetas por nombre o filtra por diferentes criterios para encontrar
              exactamente lo que necesitas.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">📋 Vista de Tarjetas</h4>
            <p className="text-gray-600">
              Visualiza tus recetas en un formato de tarjetas atractivo con imágenes,
              nombres y información básica.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">✏️ Edición Rápida</h4>
            <p className="text-gray-600">
              Edita cualquier receta directamente desde el recetario para hacer
              ajustes y mejoras.
            </p>
          </div>

          <div className="bg-white border border-gray-200 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">🗑️ Gestión de Recetas</h4>
            <p className="text-gray-600">
              Elimina recetas que ya no necesites para mantener tu recetario organizado.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">🎯 Cómo Usar el Recetario</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700">
            <li>Explora tus recetas en la vista de cuadrícula</li>
            <li>Usa la barra de búsqueda para encontrar recetas específicas</li>
            <li>Aplica filtros para refinar tu búsqueda</li>
            <li>Haz clic en cualquier receta para ver sus detalles completos</li>
            <li>Usa los botones de edición para modificar recetas existentes</li>
            <li>Elimina recetas que ya no necesites</li>
          </ol>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">🎨 Organización Visual</h4>
          <p className="text-green-700">
            El recetario muestra tus recetas con sus imágenes, haciendo fácil identificar
            visualmente lo que quieres cocinar. Las recetas se organizan de manera clara
            y accesible.
          </p>
        </div>
      </div>
    </div>
  );
}

function ConsejosSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">💡 Consejos y Mejores Prácticas</h2>

      <div className="grid gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">🚀 Empezando con Delicipeasy</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• <strong>Comienza simple:</strong> Crea 3-5 recetas básicas que cocines frecuentemente</li>
            <li>• <strong>Agrega ingredientes gradualmente:</strong> No necesitas crear todos los ingredientes de una vez</li>
            <li>• <strong>Usa fotos:</strong> Las imágenes hacen que tus recetas sean más atractivas y fáciles de identificar</li>
            <li>• <strong>Sé consistente:</strong> Usa las mismas unidades de medida para ingredientes similares</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400">
          <h3 className="text-xl font-semibold text-green-800 mb-4">📅 Planificación Eficiente</h3>
          <ul className="space-y-2 text-green-700">
            <li>• <strong>Planifica con anticipación:</strong> Dedica 15 minutos cada semana a planificar tus comidas</li>
            <li>• <strong>Reutiliza ingredientes:</strong> Elige recetas que compartan ingredientes para optimizar compras</li>
            <li>• <strong>Considera la temporada:</strong> Planifica con ingredientes de temporada para ahorrar dinero</li>
            <li>• <strong>Guarda programas exitosos:</strong> Si una semana funciona bien, guárdala para repetir</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-400">
          <h3 className="text-xl font-semibold text-purple-800 mb-4">🛒 Compras Inteligentes</h3>
          <ul className="space-y-2 text-purple-700">
            <li>• <strong>Revisa tu despensa:</strong> Verifica qué tienes antes de ir de compras</li>
            <li>• <strong>Usa la lista generada:</strong> La app calcula exactamente lo que necesitas</li>
            <li>• <strong>Marca mientras compras:</strong> Usa las casillas para no olvidar nada</li>
            <li>• <strong>Compra en orden:</strong> Organiza tu lista según el layout de tu supermercado</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">👨‍🍳 Creación de Recetas</h3>
          <ul className="space-y-2 text-yellow-700">
            <li>• <strong>Sé específico:</strong> Cantidades exactas dan mejores resultados en la planificación</li>
            <li>• <strong>Incluye instrucciones:</strong> Escribe pasos claros en la descripción</li>
            <li>• <strong>Prueba antes de guardar:</strong> Asegúrate de que la receta funciona</li>
            <li>• <strong>Actualiza regularmente:</strong> Mejora tus recetas basándote en la experiencia</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-400">
          <h3 className="text-xl font-semibold text-red-800 mb-4">⚠️ Problemas Comunes y Soluciones</h3>
          <div className="space-y-3 text-red-700">
            <div>
              <strong>Problema:</strong> Los precios no son exactos
              <br />
              <strong>Solución:</strong> Los precios son estimados. Úsalos como referencia y ajusta según tu experiencia local.
            </div>
            <div>
              <strong>Problema:</strong> No encuentro un ingrediente
              <br />
              <strong>Solución:</strong> Crea nuevos ingredientes usando el menú "Add" → "Ingredient".
            </div>
            <div>
              <strong>Problema:</strong> Las cantidades no coinciden
              <br />
              <strong>Solución:</strong> Verifica las porciones de tus recetas y ajusta según necesites.
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 Flujo de Trabajo Recomendado</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Crea ingredientes básicos que uses frecuentemente</li>
            <li>Diseña 5-10 recetas que cocines regularmente</li>
            <li>Planifica tu primera semana de comidas</li>
            <li>Genera y usa tu primera lista de compras</li>
            <li>Ajusta y mejora basándote en tu experiencia</li>
            <li>Expande gradualmente tu recetario</li>
            <li>Experimenta con diferentes combinaciones semanales</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
