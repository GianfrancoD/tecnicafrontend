# Guía de Contribución

¡Gracias por tu interés en contribuir a **TecnicaFrontend**! Este documento te guiará a través del proceso de contribución a nuestro proyecto de prueba técnica.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Flujo de Trabajo](#flujo-de-trabajo)
- [Estándares de Código](#estándares-de-código)
- [Testing](#testing)
- [Commits y Pull Requests](#commits-y-pull-requests)
- [Reportar Issues](#reportar-issues)

## Código de Conducta

Este proyecto adhiere a nuestro [Código de Conducta](./CODE_OF_CONDUCT.md). Al participar, se espera que mantengas estos estándares.

## 🚀 Cómo Contribuir

### Tipos de Contribuciones Bienvenidas

- 🐛 **Bug fixes**: Corrección de errores
- ✨ **Features**: Nuevas características
- 📚 **Documentación**: Mejoras en documentación
- 🎨 **UI/UX**: Mejoras en interfaz y experiencia de usuario
- ⚡ **Performance**: Optimizaciones de rendimiento
- 🧪 **Tests**: Agregar o mejorar tests
- 🔧 **Refactoring**: Mejoras en la estructura del código

## 🛠️ Configuración del Entorno

### Prerequisitos

- **Node.js**: v18 o superior
- **npm**: v8 o superior
- **Git**: Última versión

### Instalación

1. **Fork del repositorio**
   ```bash
   # Clona tu fork
   git clone https://github.com/tu-usuario/tecnicafrontend.git
   cd tecnicafrontend
   ```

2. **Configura el repositorio upstream**
   ```bash
   git remote add upstream https://github.com/GianfrancoD/tecnicafrontend.git
   ```

3. **Instala dependencias**
   ```bash
   npm install
   ```

4. **Verifica la instalación**
   ```bash
   npm start
   ```

## 🔄 Flujo de Trabajo

### Flujo de Ramas

Seguimos **GitFlow** con validaciones estrictas:

```
main (producción)
  ↑ (solo desde developer)
developer (integración)
  ↑ (desde ramas de trabajo)
feature/* → developer ✅
feat/* → developer ✅  
bugfix/* → developer ✅
hotfix/* → developer ✅
```

### Proceso de Contribución

1. **Sincroniza con upstream**
   ```bash
   git checkout developer
   git fetch upstream
   git pull upstream developer
   ```

2. **Crea tu rama de trabajo**
   ```bash
   # Para nuevas características
   git checkout -b feature/nombre-descriptivo
   
   # Para corrección de bugs
   git checkout -b bugfix/descripcion-del-bug
   
   # Para mejoras rápidas
   git checkout -b feat/mejora-especifica
   ```

3. **Desarrolla tu contribución**
   - Escribe código limpio y bien documentado
   - Sigue nuestros estándares de código
   - Agrega tests si es necesario

4. **Valida tu código**
   ```bash
   # Ejecuta validaciones completas
   npm run validate:full
   
   # O validaciones individuales
   npm run validate          # TypeScript + tests estructura
   npx tsc --noEmit         # Solo TypeScript
   npm run test:structure   # Solo tests de estructura
   ```

## 📏 Estándares de Código

### TypeScript

- ✅ **Tipado estricto**: Evita `any`, usa tipos específicos
- ✅ **Interfaces claras**: Define interfaces para props y estados
- ✅ **Exportaciones nombradas**: Prefiere exports nombrados sobre default

```typescript
// ✅ Bueno
export interface UserProps {
  id: number;
  name: string;
  email: string;
}

export const UserComponent: React.FC<UserProps> = ({ id, name, email }) => {
  // ...
};

// ❌ Evitar
export default ({ id, name, email }: any) => {
  // ...
};
```

### React

- ✅ **Functional Components**: Usa siempre hooks
- ✅ **Custom Hooks**: Extrae lógica reutilizable
- ✅ **Props drilling**: Evita, usa Context cuando sea necesario

### Estructura de Archivos

Sigue la arquitectura modular existente:

```
src/
  core/
    [módulo]/
      components/
        common/         # Componentes reutilizables
        forms/         # Formularios específicos
        views/         # Páginas/vistas principales
      contexts/        # Context providers
      hooks/          # Custom hooks
      services/       # Servicios/API
      types/          # Definiciones de tipos
      utils/          # Utilidades del módulo
```

### Naming Conventions

- **Archivos**: `PascalCase.tsx` para componentes, `camelCase.ts` para utilidades
- **Componentes**: `PascalCase`
- **Variables/Funciones**: `camelCase`
- **Tipos/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`

## 🧪 Testing

### Tests de Estructura

```bash
# Ejecutar tests de estructura
npm run test:structure

# Modo watch para desarrollo
npm run test:structure:watch

# Con interfaz visual
npm run test:structure:ui
```

### Estándares de Testing

- ✅ **Cada módulo** debe tener estructura válida
- ✅ **Componentes principales** deben exportarse correctamente
- ✅ **Tipos** deben estar bien definidos

## 📝 Commits y Pull Requests

### Formato de Commits

Usamos **Conventional Commits**:

```bash
tipo(alcance): descripción breve

# Ejemplos:
feat(auth): add login validation
fix(products): resolve filter reset issue  
docs(readme): update installation steps
style(dashboard): improve responsive design
test(structure): add validation for new modules
```

### Tipos de Commit

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Solo documentación
- `style`: Cambios de formato/estilo
- `refactor`: Refactoring de código
- `test`: Agregar tests
- `chore`: Tareas de mantenimiento

### Pull Requests

1. **Título descriptivo**: Usa el formato de conventional commits
2. **Descripción clara**: Explica qué cambia y por qué
3. **Template PR**: Completa la plantilla proporcionada

```markdown
## 📋 Descripción
Breve descripción de los cambios

## 🔄 Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## ✅ Checklist
- [ ] Tests pasan (`npm run validate:full`)
- [ ] Código sigue estándares del proyecto
- [ ] Documentación actualizada si es necesario
- [ ] Commits siguen conventional format
```

## 🐛 Reportar Issues

### Template de Bug Report

```markdown
**Describe el bug**
Descripción clara y concisa del problema.

**Pasos para reproducir**
1. Ve a '...'
2. Haz click en '....'
3. Ve el error

**Comportamiento esperado**
Qué esperabas que pasara.

**Screenshots**
Si aplica, agrega screenshots.

**Información del entorno:**
- OS: [ej. iOS]
- Browser [ej. chrome, safari]
- Version [ej. 22]
```

### Template de Feature Request

```markdown
**¿Tu feature request está relacionado con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas que hayas considerado**
Otras soluciones o features que hayas considerado.

**Contexto adicional**
Cualquier otro contexto o screenshots.
```

## ❓ Preguntas Frecuentes

### ¿Puedo trabajar en un issue que ya tiene asignado a alguien?

No, por favor selecciona issues sin asignar o crea uno nuevo.

### ¿Mi PR debe ir a `main` o `developer`?

**Siempre a `developer`**. Solo la rama `developer` puede hacer merge a `main`.

### ¿Qué pasa si mi PR falla en CI/CD?

Revisa los logs, corrige los problemas, y haz push de los cambios. El PR se actualizará automáticamente.

### ¿Cómo mantengo mi fork actualizado?

```bash
git fetch upstream
git checkout developer  
git merge upstream/developer
git push origin developer
```

## 🎯 Recursos Útiles

- [Documentación de React](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitFlow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

---

**¡Gracias por contribuir a TecnicaFrontend!** 🚀

**Versión**: 1.0  
**Última actualización**: Enero 2025  
**Proyecto**: TecnicaFrontend - Prueba Técnica React/TypeScript