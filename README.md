# Evaluación Técnica Frontend - React + TypeScript

> **Prueba técnica para desarrolladores frontend**

## 📋 Descripción

Esta es una **evaluación técnica** diseñada para medir habilidades de debugging, arquitectura y desarrollo en React + TypeScript. La aplicación incluye autenticación, dashboard y gestión de productos con **errores intencionalmente insertados** que debes identificar y resolver.

**Competencias evaluadas:**
- 🔍 **Debugging** - Identificación y resolución de errores TypeScript
- 🏗️ **Arquitectura** - Comprensión de estructura modular escalable
- ⚛️ **React** - Manejo del ecosistema y mejores prácticas
- 🛠️ **TypeScript** - Sistema de tipos y interfaces
- 🎯 **Problem Solving** - Metodología de resolución de problemas

## ⚠️ RESTRICCIONES IMPORTANTES

### 🚫 **NO MODIFICAR:**
```bash
.github/workflows/          # CI/CD workflows
tests/structure/            # Sistema de testing
package.json               # Configuración de dependencias
tsconfig.json              # Configuración TypeScript
```
**Estos archivos son parte del sistema de evaluación**

## 🎯 Objetivos

### **Debugging y Errores** (40%)
- Identificar y corregir errores de compilación TypeScript
- Resolver problemas de imports y estructura
- Eliminar warnings y errores en consola

### **Arquitectura y Estructura** (35%)
- Completar la estructura de carpetas modular
- Implementar componentes faltantes
- Seguir convenciones establecidas

### **Funcionalidad** (25%)
- Aplicación funcionando end-to-end
- Sistema de autenticación operativo
- Módulo de productos completamente funcional

---

## 🚀 Setup Inicial

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]
cd tecnicafrontend

# Instalar dependencias
npm install

# Intentar ejecutar la aplicación (fallará con errores)
npm start
```

## 🔍 Cómo Abordar la Evaluación

### **1. Diagnóstico Inicial**
```bash
# Ejecutar para identificar errores
npm run validate    # Errores de tipos
npm run test:structure        # Errores de estructura
npm start                      # Ver errores en consola
```

### **2. Tipos de Errores a Resolver**
- **TypeScript**: Tipos incorrectos, métodos faltantes, inconsistencias de interfaces
- **Estructura**: Carpetas faltantes en módulos, imports rotos
- **Funcionalidad**: Componentes no implementados, lógica incompleta

### **3. Flujo de Resolución**
1. **Crear estructura faltante** → Resolver imports rotos
2. **Corregir errores TypeScript** → Usar mensajes de error como guía
3. **Validar progreso** → `npm run validate` después de cada corrección
4. **Probar funcionalidad** → Login y navegación completa

### **4. Indicadores de Éxito**
- ✅ `npm run build` - Build exitoso
- ✅ `npm run test:structure` - Todos los tests pasan
- ✅ `npm start` - Aplicación inicia sin errores
- ✅ Login funcional: `admin@test.com` / `password`
- ✅ Navegación Dashboard → Productos operativa

---

## 📚 Scripts Disponibles

```bash
# 🚀 Desarrollo
npm start                    # Ejecutar en modo desarrollo  
npm run build               # Build de producción

# 🧪 Testing  
npm run test:structure      # Tests de estructura
npm run test:structure:watch # Tests en modo watch
npm run test:structure:ui   # Interfaz visual de tests
npm run test:ci            # Tests para CI (JSON output)

# 🔍 Otros
npm run test               # Tests unitarios (React)
```

---

## 🏆 Criterios de Evaluación

### Excelente (90-100 pts)
- ✅ Todos los errores corregidos sin ayuda
- ✅ Tests pasando al 100%
- ✅ Funcionalidad completa probada
- ✅ Comprensión clara del CI/CD
- ✅ Mejoras o funcionalidades adicionales

### Bueno (70-89 pts)  
- ✅ Mayoría de errores corregidos
- ✅ Tests mayormente pasando
- ✅ Funcionalidad básica funcionando
- ✅ Entendimiento general del proyecto

### Aceptable (50-69 pts)
- ✅ Varios errores corregidos  
- ✅ Algunos tests pasando
- ✅ App ejecutándose básicamente
- ⚠️ Necesita ayuda para CI/CD

### Insuficiente (<50 pts)
- ❌ Errores sin corregir
- ❌ Tests fallando
- ❌ App no funciona correctamente

---

## 🤝 Preguntas de la Entrevista

Prepárate para explicar:

1. **🏗️ Arquitectura**: ¿Por qué esta estructura de carpetas es escalable?

2. **🧪 Testing**: ¿Cómo funciona el sistema dinámico de detección de módulos?

3. **🐛 Debugging**: ¿Qué proceso seguiste para encontrar los errores?

4. **⚛️ React**: ¿Cómo organizaste el estado y la lógica en el módulo de productos?

5. **🚀 DevOps**: ¿Cuál es la ventaja del flujo CI/CD implementado?

6. **🔄 Escalabilidad**: ¿Cómo agregarías un nuevo módulo (ej: "orders")?

---

## 🔧 Tecnologías Utilizadas

- **⚛️ React 19** - Frontend framework
- **🎨 TailwindCSS** - Styling y diseño
- **🧪 Vitest** - Testing framework
- **🚀 GitHub Actions** - CI/CD
- **📡 React Router** - Navegación SPA
- **🎣 Custom Hooks** - Lógica reutilizable
- **📦 Context API** - Estado global
- **🔷 TypeScript interfaces** - Tipado fuerte

---

## 💡 Tips para el Éxito

- 🔍 **Lee los errores** en consola cuidadosamente
- 🧪 **Ejecuta tests** frecuentemente durante el desarrollo  
- 🎯 **Usa las herramientas** de desarrollo de React
- 📖 **Revisa la estructura** antes de hacer cambios
- 🚀 **Prueba la navegación** completa de la app
- 💬 **Haz preguntas** si algo no está claro

---

## 🎉 ¡Buena Suerte!

Esta prueba técnica está diseñada para evaluar tus habilidades reales de desarrollo frontend. **Tómate tu tiempo**, **lee cuidadosamente** y **demuestra tu capacidad** para trabajar con código existente, resolver problemas y entender arquitecturas complejas.

**¡Esperamos ver tu solución!** 🚀

---

*Creado con ❤️ para evaluar desarrolladores frontend*
