#!/usr/bin/env node
/**
 * 🔍 Project Status Checker
 * Valida el estado completo del proyecto para prueba técnica
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando estado del proyecto...\n');

// Colores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function runCommand(command, silent = false) {
  try {
    const output = execSync(command, { encoding: 'utf8' });
    if (!silent) console.log(output);
    return { success: true, output };
  } catch (error) {
    if (!silent) console.log(error.stdout || error.message);
    return { success: false, output: error.stdout || error.message };
  }
}

function checkTypeScript() {
  console.log(`${colors.blue}${colors.bold}📋 1. VERIFICANDO TYPESCRIPT${colors.reset}\n`);
  
  const result = runCommand('npx tsc --noEmit', true);
  
  if (result.success) {
    console.log(`${colors.green}✅ TypeScript: Sin errores${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}❌ TypeScript: ERRORES ENCONTRADOS${colors.reset}`);
    console.log(`${colors.yellow}${result.output}${colors.reset}`);
    
    // Contar errores
    const errorCount = (result.output.match(/error TS\d+:/g) || []).length;
    console.log(`\n📊 Total de errores: ${colors.red}${errorCount}${colors.reset}\n`);
    
    return false;
  }
}

function checkStructureTests() {
  console.log(`${colors.blue}${colors.bold}📋 2. VERIFICANDO TESTS DE ESTRUCTURA${colors.reset}\n`);
  
  const result = runCommand('npm run test:structure', true);
  
  if (result.success) {
    console.log(`${colors.green}✅ Tests de estructura: PASARON${colors.reset}`);
    
    // Extraer estadísticas
    const statsMatch = result.output.match(/(\d+) tests.*(\d+) passed/);
    if (statsMatch) {
      console.log(`📊 Tests ejecutados: ${statsMatch[1]}, Pasaron: ${colors.green}${statsMatch[2]}${colors.reset}`);
    }
    
    return true;
  } else {
    console.log(`${colors.red}❌ Tests de estructura: FALLARON${colors.reset}`);
    console.log(`${colors.yellow}${result.output}${colors.reset}`);
    return false;
  }
}

function checkModuleContent() {
  console.log(`${colors.blue}${colors.bold}📋 3. VERIFICANDO CONTENIDO DE MÓDULOS${colors.reset}\n`);
  
  const coreDir = path.join(process.cwd(), 'src/core');
  let totalModules = 0;
  let modulesWithContent = 0;
  
  try {
    const modules = fs.readdirSync(coreDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== 'shared')
      .map(dirent => dirent.name);
    
    modules.forEach(module => {
      const moduleDir = path.join(coreDir, module);
      const files = [];
      
      function findFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        entries.forEach(entry => {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            findFiles(fullPath);
          } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            files.push(fullPath);
          }
        });
      }
      
      findFiles(moduleDir);
      totalModules++;
      
      if (files.length > 0) {
        modulesWithContent++;
        console.log(`  ${colors.green}✅ ${module}${colors.reset}: ${files.length} archivos`);
      } else {
        console.log(`  ${colors.yellow}⚠️  ${module}${colors.reset}: vacío`);
      }
    });
    
    console.log(`\n📊 Módulos con contenido: ${colors.green}${modulesWithContent}${colors.reset}/${totalModules}`);
    
    return modulesWithContent > 0;
    
  } catch (error) {
    console.log(`${colors.red}❌ Error verificando módulos: ${error.message}${colors.reset}`);
    return false;
  }
}

function checkBuild() {
  console.log(`${colors.blue}${colors.bold}📋 4. VERIFICANDO BUILD DE PRODUCCIÓN${colors.reset}\n`);
  
  const result = runCommand('npm run build', true);
  
  if (result.success) {
    console.log(`${colors.green}✅ Build: EXITOSO${colors.reset}`);
    
    // Verificar que existe la carpeta build
    const buildExists = fs.existsSync(path.join(process.cwd(), 'build'));
    if (buildExists) {
      console.log(`📁 Carpeta build generada correctamente`);
    }
    
    return true;
  } else {
    console.log(`${colors.red}❌ Build: FALLÓ${colors.reset}`);
    console.log(`${colors.yellow}${result.output}${colors.reset}`);
    return false;
  }
}

function generateSummary(results) {
  console.log(`\n${colors.bold}📊 RESUMEN FINAL${colors.reset}`);
  console.log('='.repeat(50));
  
  const { typescript, structure, modules, build } = results;
  const passed = [typescript, structure, modules, build].filter(Boolean).length;
  const total = 4;
  
  console.log(`📋 TypeScript: ${typescript ? '✅' : '❌'}`);
  console.log(`📋 Estructura: ${structure ? '✅' : '❌'}`);  
  console.log(`📋 Módulos: ${modules ? '✅' : '❌'}`);
  console.log(`📋 Build: ${build ? '✅' : '❌'}`);
  
  console.log(`\n🎯 Resultado: ${colors.green}${passed}${colors.reset}/${total} validaciones pasaron`);
  
  if (passed === total) {
    console.log(`\n${colors.green}${colors.bold}🎉 ¡PROYECTO LISTO PARA PRODUCCIÓN!${colors.reset}`);
    console.log(`${colors.green}✅ Todos los checks pasaron - CI/CD funcionará correctamente${colors.reset}`);
  } else {
    console.log(`\n${colors.red}${colors.bold}❌ PROYECTO CON ERRORES${colors.reset}`);
    console.log(`${colors.red}⚠️  GitHub Actions fallará con estos errores${colors.reset}`);
    console.log(`${colors.yellow}💡 Revisa los errores arriba y corrígelos antes de hacer PR${colors.reset}`);
  }
  
  return passed === total;
}

// Ejecutar todas las verificaciones
async function main() {
  console.log(`${colors.bold}🚀 VERIFICACIÓN COMPLETA DE PROYECTO${colors.reset}`);
  console.log(`${colors.blue}Simulando validaciones de GitHub Actions...${colors.reset}\n`);
  
  const results = {
    typescript: checkTypeScript(),
    structure: checkStructureTests(),
    modules: checkModuleContent(),
    build: false // Skip build for now since TS errors prevent it
  };
  
  // Solo hacer build si TypeScript está OK
  if (results.typescript) {
    results.build = checkBuild();
  } else {
    console.log(`${colors.blue}${colors.bold}📋 4. BUILD SALTADO${colors.reset}\n`);
    console.log(`${colors.yellow}⏭️  Saltando build debido a errores de TypeScript${colors.reset}\n`);
  }
  
  const allPassed = generateSummary(results);
  
  process.exit(allPassed ? 0 : 1);
}

main();
